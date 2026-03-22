export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-white border-t border-zinc-900 py-12 px-8">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div>
          <h2 className="font-serif text-3xl tracking-widest mb-2">LOOMANCE</h2>
          <p className="text-gray-500 font-sans text-sm">© 2026 Loomance Studios.</p>
        </div>
        
        <div className="flex gap-12 font-sans text-sm tracking-wide text-gray-400">
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:text-white transition-colors">Collection</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
