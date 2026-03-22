"use client";
import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ progress }: { progress: MotionValue<number> }) {
  // Section 1: 0% to 15%
  const opacity1 = useTransform(progress, [0, 0.1, 0.15], [1, 1, 0], { clamp: true });
  const y1 = useTransform(progress, [0, 0.15], [0, -50], { clamp: true });

  // Section 2: 15% to 55%
  const opacity2 = useTransform(progress, [0.15, 0.2, 0.5, 0.55], [0, 1, 1, 0], { clamp: true });
  const y2 = useTransform(progress, [0.15, 0.2, 0.5, 0.55], [50, 0, 0, -50], { clamp: true });

  // Section 3: 55% to 90%
  const opacity3 = useTransform(progress, [0.55, 0.6, 0.85, 0.9], [0, 1, 1, 0], { clamp: true });
  const y3 = useTransform(progress, [0.55, 0.6, 0.85, 0.9], [50, 0, 0, -50], { clamp: true });

  // Section 4: 90% to 100%
  const opacity4 = useTransform(progress, [0.9, 0.95, 1], [0, 1, 1], { clamp: true });
  const y4 = useTransform(progress, [0.9, 1], [50, 0], { clamp: true });

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Section 1 */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl mb-4 tracking-widest text-white drop-shadow-lg">LOOMANCE</h1>
        <p className="font-sans text-lg md:text-2xl font-light text-gray-200 uppercase tracking-widest drop-shadow-md">Redefining Modern Elegance</p>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-[40vh]"
      >
        <h2 className="font-serif text-3xl md:text-5xl max-w-2xl leading-tight text-stone-200 drop-shadow-lg">
          Crafted with precision.<br/>
          <span className="text-amber-100/80 italic font-light tracking-wide">Designed for presence.</span>
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-[40vh]"
      >
        <h2 className="font-serif text-3xl md:text-5xl max-w-2xl leading-tight text-stone-200 drop-shadow-lg">
          Every thread <br/>
          <span className="text-amber-100/80 italic font-light tracking-wide">tells a story.</span>
        </h2>
      </motion.div>

      {/* Section 4 - Final Appearance */}
      <motion.div 
        style={{ opacity: opacity4, y: y4 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl mb-4 tracking-widest text-white drop-shadow-lg">LOOMANCE</h1>
      </motion.div>
    </div>
  );
}
