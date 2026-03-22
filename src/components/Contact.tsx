"use client";

export default function Contact() {
  return (
    <section className="py-32 px-4 bg-[#121212] text-white border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-100 tracking-wide mb-6">Inquiries</h2>
          <p className="font-sans text-stone-400 text-lg">For bespoke consultations or general inquiries, we remain at your absolute service.</p>
        </div>
        
        <form className="space-y-8 text-left max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <input 
                type="text" 
                id="name"
                className="peer w-full bg-transparent border-b border-stone-700 pb-3 pt-4 focus:outline-none focus:border-stone-300 transition-colors font-sans text-stone-200 placeholder-transparent"
                placeholder="Name"
              />
              <label htmlFor="name" className="absolute left-0 top-0 text-stone-500 font-sans text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-stone-300 pointer-events-none">Your Name</label>
            </div>
            <div className="relative">
              <input 
                type="email" 
                id="email"
                className="peer w-full bg-transparent border-b border-stone-700 pb-3 pt-4 focus:outline-none focus:border-stone-300 transition-colors font-sans text-stone-200 placeholder-transparent"
                placeholder="Email"
              />
              <label htmlFor="email" className="absolute left-0 top-0 text-stone-500 font-sans text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-stone-300 pointer-events-none">Email Address</label>
            </div>
          </div>
          <div className="relative mt-8">
            <textarea 
              id="message"
              rows={4}
              className="peer w-full bg-transparent border-b border-stone-700 pb-3 pt-4 focus:outline-none focus:border-stone-300 transition-colors font-sans text-stone-200 placeholder-transparent resize-none"
              placeholder="Message"
            ></textarea>
            <label htmlFor="message" className="absolute left-0 top-0 text-stone-500 font-sans text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-stone-300 pointer-events-none">Your Message</label>
          </div>
          
          <div className="pt-8 flex justify-center">
            <button className="px-12 py-4 bg-white text-black hover:bg-stone-200 transition-colors uppercase tracking-widest text-sm font-bold w-full md:w-auto shadow-lg hover:shadow-xl">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
