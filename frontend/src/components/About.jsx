export default function About() {
  return (
    <section id="about" className="py-32 relative bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              The River is the <span className="text-primary italic">Artery</span>
            </h2>
            
            <div className="space-y-6 text-foreground/70 font-light text-lg leading-relaxed">
              <p>For millennia, the Nile has not merely sustained Egypt — it has defined it. It is the spine of our history, the ink of our stories, and the binding force of our diverse governorates.</p>
              <p>Mesrat translates this ancient reality into a spatial experience. Here, the river becomes the main circulation path, a flowing artery guiding visitors through the rich, varied tapestries of Egypt's 27 regions.</p>
              <p>From the Mediterranean breeze of Alexandria to the warm, carved stone of Upper Egypt, every step is a revelation of architecture, material, and identity.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="border-l border-primary/30 pl-4">
                <div className="text-3xl md:text-4xl font-serif text-primary mb-1">27</div>
                <div className="text-sm tracking-widest uppercase text-foreground/50">Governorates</div>
              </div>
              <div className="border-l border-primary/30 pl-4">
                <div className="text-3xl md:text-4xl font-serif text-primary mb-1">1</div>
                <div className="text-sm tracking-widest uppercase text-foreground/50">Journey</div>
              </div>
              <div className="border-l border-primary/30 pl-4">
                <div className="text-3xl md:text-4xl font-serif text-primary mb-1">∞</div>
                <div className="text-sm tracking-widest uppercase text-foreground/50">Stories</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-transparent z-10 mix-blend-overlay"></div>
              <img 
                alt="Masarat Exterior" 
                className="w-full h-full object-cover rounded-sm shadow-2xl" 
                src="/Extrior.png" 
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-primary/30 rounded-full z-0"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 border border-primary/20 rounded-full z-0"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}