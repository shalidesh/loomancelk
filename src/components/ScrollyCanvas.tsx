"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 114;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameStr = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${frameStr}_delay-0.052s.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const renderFrame = (index: number) => {
    if (images.length === 0 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;
    
    const dpr = window.devicePixelRatio || 1;
    const targetWidth = rect.width * dpr;
    const targetHeight = rect.height * dpr;

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const img = images[index];
    if (!img) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let renderWidth = canvas.width;
    let renderHeight = canvas.height;
    let x = 0;
    let y = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider proportionally, fit width
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgRatio;
      y = (canvas.height - renderHeight) / 2;
    } else {
      // Canvas is taller proportionally, fit height
      renderHeight = canvas.height;
      renderWidth = canvas.height * imgRatio;
      x = (canvas.width - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Darken integration: drawing it against a dark background is implicit if context has no bg. 
    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  };

  useEffect(() => {
    if (images.length > 0) {
      // Force initial render once loaded
      renderFrame(Math.round(frameIndex.get()));
    }
    
    const handleResize = () => {
       renderFrame(Math.round(frameIndex.get()));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => {
      renderFrame(Math.round(latest));
    });
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#0b0b0b]">
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />
        <Overlay progress={scrollYProgress} />
      </div>
    </div>
  );
}
