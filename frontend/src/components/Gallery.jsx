import { useState } from 'react';

export default function Gallery() {
  const governorates = [
    { id: 1, name: 'Reception', images: ['/res (1).png', '/res (2).png', '/res (3).png', '/res (4).png', '/res (5).png'] }, 
    { id: 2, name: 'Theater', images: ['/the (1).jpeg', '/the (2).jpeg', '/the (3).jpeg', '/the (4).jpeg'] },
    { id: 3, name: 'Cairo', images: ['/caior (1).jpeg', '/caior (2).jpeg', '/caior (3).jpeg', '/caior (4).jpeg', '/caior (5).jpeg', '/caior (6).jpeg'] },
    { id: 4, name: 'Alexandria', images: ['/Alex.jpeg', '/Alex (1).jpeg', '/Alex (2).jpeg', '/Alex (3).jpeg', '/Alex (4).jpeg', '/Alex (5).jpeg', '/Alex (6).jpeg'] },
    { id: 5, name: 'Aswan', images: ['/Aswan (1).png', '/Aswan (2).png', '/Aswan (3).png', '/Aswan (4).png', '/Aswan (5).png', '/Aswan (6).png', '/Aswan (7).png', '/Aswan (8).png', '/Aswan (9).png'] },
    { id: 6, name: 'Luxor', images: ['/Luxor (1).png', '/Luxor (2).png', '/Luxor (3).png', '/Luxor (4).png', '/Luxor (5).png', '/Luxor (6).png'] },
    { id: 7, name: 'Giza', images: ['/Giza (1).jpeg', '/Giza (2).jpeg', '/Giza (3).jpeg'] },
    { id: 8, name: 'Port Said', images: ['/port-said (1).jpeg', '/port-said (2).jpeg', '/port-said (3).jpeg', '/port-said (4).jpeg'] },
    { id: 9, name: 'Siwa', images: ['/Siwa1.png', '/Siwa2.png', '/Siwa3.png', '/Siwa4.png', '/Siwa5.png'] },
    { id: 10, name: 'Red Sea', images: ['/RedSea (1).jpeg', '/RedSea (2).jpeg', '/RedSea (3).jpeg', '/RedSea (4).jpeg', '/RedSea (5).jpeg'] },
    { id: 11, name: 'Sinai', images: ['/Sinai (1).jpeg', '/Sinai (2).jpeg', '/Sinai (3).jpeg', '/Sinai (4).jpeg', '/Sinai (5).jpeg'] },
  ];

  const [activeGov, setActiveGov] = useState(governorates[0]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleGovChange = (gov) => {
    setActiveGov(gov);
    setCurrentIdx(0); 
  };

  const nextImage = () => {
    if (activeGov.images.length > 0) {
      setCurrentIdx((prev) => (prev + 1) % activeGov.images.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#050508]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 md:mb-16 text-center">Exhibition Spaces</h2>
        
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          
          <div className="md:col-span-3 flex overflow-x-auto md:flex-col space-x-2 md:space-x-0 md:space-y-2 pb-4 md:pb-0 scrollbar-hide">
            {governorates.map((gov) => (
              <button
                key={gov.id}
                onClick={() => handleGovChange(gov)}
                className={`whitespace-nowrap text-left px-6 py-4 transition-all duration-300 md:border-l-2 border-b-2 md:border-b-0 ${
                  activeGov.id === gov.id 
                    ? 'bg-white/5 border-primary text-white' 
                    : 'border-transparent text-white/40 hover:text-white hover:border-white/20'
                }`}
              >
                {gov.name}
              </button>
            ))}
          </div>

          <div className="md:col-span-9 bg-black/30 border border-white/10 rounded-2xl p-4 md:p-8 flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
            <h3 className="text-2xl md:text-3xl text-white font-serif mb-6">{activeGov.name} Wing</h3>
            
            {activeGov.images.length > 0 ? (
              <div className="w-full flex flex-col items-center">
                <img 
                  src={activeGov.images[currentIdx]} 
                  alt={`${activeGov.name} ${currentIdx + 1}`}
                  className="w-full max-h-[300px] md:max-h-[400px] object-cover rounded-lg shadow-2xl mb-6 transition-opacity duration-500"
                />
                <button 
                  onClick={nextImage}
                  className="w-full md:w-auto px-8 py-3 bg-primary text-black font-bold hover:bg-white transition-colors"
                >
                  Next Image ({currentIdx + 1} / {activeGov.images.length})
                </button>
              </div>
            ) : (
              <div className="w-full h-64 md:h-80 bg-white/5 rounded-lg flex items-center justify-center border border-dashed border-white/20">
                <span className="text-white/30 italic text-center px-4">Images coming soon for {activeGov.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}