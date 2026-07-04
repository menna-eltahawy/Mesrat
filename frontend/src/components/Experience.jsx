export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-[#0a0a0f] relative">
      {/* الـ Pattern الخلفية */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM30 30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h3 className="text-primary tracking-[0.2em] uppercase text-sm mb-4">The Technology</h3>
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">Where Design Meets <span className="italic text-primary">Intelligence</span></h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg font-light">
            Mesrat merges the ancient art of spatial storytelling with the precision of modern technology — creating an exhibition that is simultaneously a museum, a map, and a living cultural AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* كارت 1: AI Navigation */}
          <div className="group">
            <div className="mb-6 text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
            <h4 className="text-xs tracking-widest text-white/50 uppercase mb-2">Smart Wayfinding</h4>
            <h3 className="text-2xl font-serif text-white mb-4">AI Navigation</h3>
            <p className="text-white/60 leading-relaxed font-light text-sm">A smart wristband connected to the exhibition's AI layer guides visitors through each cultural zone. Real-time directional prompts, cultural narration, and personalized route suggestions based on your interests.</p>
          </div>

          {/* كارت 2: GIS Cultural Mapping */}
          <div className="group">
            <div className="mb-6 text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <h4 className="text-xs tracking-widest text-white/50 uppercase mb-2">Geographic Intelligence</h4>
            <h3 className="text-2xl font-serif text-white mb-4">GIS Cultural Mapping</h3>
            <p className="text-white/60 leading-relaxed font-light text-sm">Each governorate's cultural zone is precisely mapped to its geographic position along the Nile. GIS data layers reveal migration routes, architectural influences, material traditions, and the invisible connections between regions.</p>
          </div>

          {/* كارت 3: Sensory Architecture */}
          <div className="group">
            <div className="mb-6 text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h4 className="text-xs tracking-widest text-white/50 uppercase mb-2">Light · Sound · Material</h4>
            <h3 className="text-2xl font-serif text-white mb-4">Sensory Architecture</h3>
            <p className="text-white/60 leading-relaxed font-light text-sm">Architecture is not seen — it is felt. Each zone deploys region-specific materials, acoustic environments, temperature gradients, and lighting temperatures calibrated to the latitude and spirit of each governorate.</p>
          </div>
        </div>
      </div>
    </section>
  );
}