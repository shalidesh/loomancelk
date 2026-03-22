"use client";
import { motion } from "framer-motion";

export default function BrandStatement() {
  return (
    <section className="py-32 px-4 bg-[#0b0b0b] text-white flex items-center justify-center min-h-[50vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-150px" }}
        className="text-center max-w-4xl"
      >
        <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl leading-relaxed text-gray-100">
          &quot;Loomance is not just clothing.<br/>
          It is identity, presence, and quiet confidence.&quot;
        </h2>
      </motion.div>
    </section>
  );
}
