export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 z-10"></div>
        <img
          alt="Egypt Landscape"
          className="w-full h-full object-cover object-center"
          src="/hero-bg.png"
        />
      </div>

      <div className="container relative z-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center mt-16">
        <div className="mb-6 flex flex-col items-center gap-4">
          <span
            className="text-2xl md:text-4xl font-serif text-primary tracking-widest"
            dir="rtl"
          >
            مِصْرَات — رحلة عبر هوية مصر
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif tracking-tighter leading-none text-white drop-shadow-2xl">
            MESRAT
          </h1>
        </div>

        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto font-light mb-12">
          Explore Egypt's governorates — their cultures, heritage, and identity
          — in one immersive destination.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="#booking"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors border border-primary bg-primary hover:bg-primary/90 text-background rounded-none px-8 py-6 text-lg tracking-wide"
          >
            Book Your Visit
          </a>
          <a
            href="#map"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors border border-primary/50 text-primary hover:bg-primary/10 rounded-none px-8 py-6 text-lg tracking-wide bg-transparent"
          >
            Explore the Map
          </a>
        </div>

        <a
          href="#about"
          className="mt-16 flex flex-col items-center gap-2 cursor-pointer transition-colors hover:text-primary"
        >
          <span className="text-xs tracking-widest text-primary/70 uppercase">
            Scroll
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary/70 w-5 h-5 animate-bounce"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
