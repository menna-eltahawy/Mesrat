export default function Footer() {
  return (
    <footer className="bg-[#030305] text-white/40 py-12 border-t border-white/5 text-sm">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-widest text-primary">MESRAT</span>
          <span className="text-primary/60" dir="rtl">مِصْرَات</span>
        </div>
        <p className="font-light tracking-wide text-center md:text-left">
          &copy; 2026 Mesrat Exhibition. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#map" className="hover:text-primary transition-colors">Map</a>
          <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
          <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
        </div>
      </div>
    </footer>
  );
}