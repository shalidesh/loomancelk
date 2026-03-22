import Image from "next/image";

export default function About() {
  return (
    <section className="py-32 px-4 md:px-12 lg:px-24 bg-[#0b0b0b] text-white">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        <div className="flex-1 space-y-8 order-2 md:order-1">
          <h2 className="font-serif text-4xl md:text-6xl text-stone-100 tracking-wide">The Essence of Loomance</h2>
          <div className="w-16 h-[1px] bg-stone-500"></div>
          <p className="font-sans text-stone-400 text-lg leading-relaxed">
            Born from a desire to redefine modern elegance, Loomance is a sanctuary for those who appreciate the quiet power of precision tailoring and timeless presence.
          </p>
          <p className="font-sans text-stone-400 text-lg leading-relaxed">
            Every collection is a narrative of craftsmanship, blending avant-garde silhouettes with uncompromising quality to elevate the daily ritual of dressing. We do not just create clothes; we curate identity.
          </p>
          <button className="mt-8 px-8 py-3 border border-stone-600 hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-xs font-semibold">
            Discover Our Story
          </button>
        </div>
        <div className="flex-1 relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[2.5rem] overflow-hidden order-1 md:order-2" style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
          <Image src="/styles/IMG_0196.webp" alt="About Loomance" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>
    </section>
  );
}
