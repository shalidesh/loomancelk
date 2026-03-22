"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap, AnimatePresence, MotionValue } from "framer-motion";
import Image from "next/image";

const baseItems = [
  { img: "IMG_0078_jpg.webp", title: "CYBER" },
  { img: "IMG_0136.webp", title: "ICONIC" },
  { img: "IMG_0163.webp", title: "FUTURISM" },
  { img: "IMG_0177.webp", title: "METALLIC" },
  { img: "IMG_0196.webp", title: "ELEGANCE" },
  { img: "IMG_0204.webp", title: "NOIR" },
  { img: "IMG_0229.webp", title: "RADIANCE" },
  { img: "IMG_0240.webp", title: "AURA" },
  { img: "IMG_0755.webp", title: "VANGUARD" },
  { img: "IMG_0759.webp", title: "LUMINOUS" },
  { img: "IMG_0776.webp", title: "ECLIPSE" },
];

const items = [...baseItems, ...baseItems];

type CollectionItem = typeof baseItems[0];
type Metrics = { itemWidth: number; trackWidth: number; containerWidth: number; };

function ParallaxCard({ 
  item, 
  index, 
  wrappedX, 
  metrics,
  onClick
}: { 
  item: CollectionItem, 
  index: number, 
  wrappedX: MotionValue<number>, 
  metrics: Metrics,
  onClick: (index: number, item: CollectionItem) => void
}) {
  const parallaxX = useTransform(wrappedX, (currentX: number) => {
    if (metrics.itemWidth === 0) return "0%";
    const pos = currentX + index * metrics.itemWidth;
    
    const startPos = metrics.containerWidth;
    const endPos = -metrics.itemWidth;
    
    const progress = (pos - startPos) / (endPos - startPos); 
    const p = (progress * 40) - 20; 
    return `${p}%`;
  });

  return (
    <motion.div 
      layoutId={`card-container-${index}`}
      onClick={() => onClick(index, item)}
      className="parallax-card relative w-[280px] h-[400px] md:w-[380px] md:h-[550px] flex-shrink-0 overflow-hidden rounded-[2.5rem] bg-zinc-900 group cursor-pointer"
      style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <motion.div style={{ x: parallaxX, width: "140%", left: "-20%" }} className="absolute top-0 bottom-0 h-full pointer-events-none">
        <motion.div layoutId={`image-container-${index}`} className="absolute inset-0 w-full h-full">
          <Image 
            src={`/styles/${item.img}`} 
            alt={item.title} 
            fill 
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            draggable={false} 
          />
        </motion.div>
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/70 transition-colors duration-500 group-hover:bg-black/50 pointer-events-none" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center z-10 pointer-events-none">
        <a 
          href="https://linktr.ee/loomanceLK" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 opacity-90 group-hover:opacity-100 transition-opacity pointer-events-auto"
          onClick={(e) => {
            // Stop the parent card container onClick from triggering so it doesn't zoom when clicking Shop Now
            e.stopPropagation();
          }}
        >
          <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase font-semibold text-white drop-shadow-md">Shop Now</span>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </a>
      </div>
    </motion.div>
  );
}

export default function Collection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [metrics, setMetrics] = useState({ itemWidth: 0, trackWidth: 0, containerWidth: 0 });
  const [selectedImage, setSelectedImage] = useState<{item: CollectionItem, index: number} | null>(null);

  const targetX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragTargetX = useRef(0);
  const dragDistance = useRef(0);

  const wrappedX = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      if (!trackRef.current || !containerRef.current) return;
      const cards = trackRef.current.querySelectorAll('.parallax-card');
      if (cards.length >= 2) {
        const c1 = cards[0] as HTMLElement;
        const c2 = cards[1] as HTMLElement;
        const gap = c2.offsetLeft - c1.offsetLeft;
        setMetrics({
          itemWidth: gap,
          trackWidth: gap * baseItems.length,
          containerWidth: containerRef.current.offsetWidth
        });
      }
    };
    setTimeout(update, 100);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useAnimationFrame((t, delta) => {
    if (metrics.trackWidth === 0) return;

    // Advanced Lerp implementation: Buttery-smooth motion
    // We pause auto-scroll if dragging or if a modal image is selected
    if (!isDragging.current && !selectedImage) {
      targetX.current -= 0.8 * (delta / 16); 
    }

    currentX.current += (targetX.current - currentX.current) * 0.08;

    const wrapped = wrap(-metrics.trackWidth, 0, currentX.current);
    wrappedX.set(wrapped);

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${wrapped}px)`;
    }
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    dragTargetX.current = targetX.current;
    dragDistance.current = 0; // Reset drag distance to differentiate click from drag
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const walk = (e.pageX - startX.current) * 2; 
    dragDistance.current += Math.abs(e.movementX);
    targetX.current = dragTargetX.current + walk;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      targetX.current -= e.deltaX * 1.5;
    }
  };

  const handleCardClick = (index: number, item: CollectionItem) => {
    if (dragDistance.current > 10) return; // Prevent zooming if the user was actively dragging
    setSelectedImage({ index, item });
  };

  return (
    <section className="py-32 bg-[#0b0b0b] text-white">
      <div className="mb-20 text-center px-4">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide text-stone-100">New Collection</h2>
        <p className="font-sans text-stone-400 tracking-widest uppercase text-sm md:text-base">Spring / Summer 2026</p>
      </div>

      <div 
        className="max-w-[1600px] w-[95vw] md:w-[90vw] mx-auto overflow-hidden rounded-[2.5rem] bg-[#121212] border border-white/5 relative"
      >
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#121212] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#121212] to-transparent z-20 pointer-events-none" />
        
        <div 
          ref={containerRef}
          className="w-full flex py-12 px-8 touch-none pointer-events-auto"
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div 
            ref={trackRef}
            className="flex gap-6 md:gap-8 cursor-grab"
            style={{ width: "fit-content" }}
          >
            {items.map((item, index) => (
              <ParallaxCard key={index} item={item} index={index} wrappedX={wrappedX} metrics={metrics} onClick={handleCardClick} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              layoutId={`card-container-${selectedImage.index}`}
              className="relative w-full max-w-5xl aspect-[3/4] md:aspect-[4/3] lg:aspect-video lg:max-h-[85vh] overflow-hidden rounded-[2rem] bg-zinc-900 cursor-default shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inner modal
            >
              <motion.div layoutId={`image-container-${selectedImage.index}`} className="absolute inset-0 w-full h-full flex items-center justify-center">
                <Image 
                  src={`/styles/${selectedImage.item.img}`} 
                  alt={selectedImage.item.title} 
                  fill 
                  className="object-contain" 
                  draggable={false} 
                  priority
                />
              </motion.div>

              <button 
                className="absolute top-6 right-6 w-12 h-12 bg-black/40 hover:bg-white hover:text-black backdrop-blur-md rounded-full text-white flex items-center justify-center transition-colors z-50"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
