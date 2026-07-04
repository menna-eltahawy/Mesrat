import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#050508]/95 backdrop-blur-sm border-b border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl tracking-widest text-primary">MASARAT</span>
          <span className="text-primary/60 text-sm" dir="rtl">مِصْرَات</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
          <a href="#about" className="text-white hover:text-primary transition-colors">About</a>
          <a href="#map" className="text-white hover:text-primary transition-colors">Map</a>
          <a href="#experience" className="text-white hover:text-primary transition-colors">Experience</a>
          <a href="#gallery" className="text-white hover:text-primary transition-colors">Gallery</a>
          <a href="#booking" className="bg-primary text-black px-6 py-2 hover:bg-white transition-colors">Book Tickets</a>
        </div>

        <button 
          className="md:hidden text-primary focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#050508] border-b border-white/10 px-6 py-4 flex flex-col gap-4 text-center animate-in slide-in-from-top-2 absolute w-full left-0 top-full">
          <a href="#about" onClick={() => setIsOpen(false)} className="text-white hover:text-primary uppercase tracking-widest text-sm py-2">About</a>
          <a href="#map" onClick={() => setIsOpen(false)} className="text-white hover:text-primary uppercase tracking-widest text-sm py-2">Map</a>
          <a href="#experience" onClick={() => setIsOpen(false)} className="text-white hover:text-primary uppercase tracking-widest text-sm py-2">Experience</a>
          <a href="#gallery" onClick={() => setIsOpen(false)} className="text-white hover:text-primary uppercase tracking-widest text-sm py-2">Gallery</a>
          <a href="#booking" onClick={() => setIsOpen(false)} className="bg-primary text-black px-6 py-3 mt-2 uppercase tracking-widest text-sm font-bold">Book Tickets</a>
        </div>
      )}
    </nav>
  );
}