import { useState, useEffect } from 'react';

export default function Gallery() {
  const governorates = [
    { id: 1, name: 'Reception', images: ['/res (1).png', '/res (2).png', '/res (3).png', '/res (4).png', '/res (5).png'] }, 
    { id: 2, name: 'Theater', images: ['/the (1).jpeg', '/the (2).jpeg', '/the (3).jpeg', '/the (4).jpeg'] },
    { id: 3, name: 'Cairo', images: ['/Cairoo.jpg', '/caior (2).jpeg', '/caior (3).jpeg', '/caior (4).jpeg', '/caior (5).jpeg', '/Cairo.jpg'] },
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
    setCurrentIdx((prev) => (prev + 1) % activeGov.images.length);
  };

  const prevImage = () => {
    setCurrentIdx((prev) => (prev === 0 ? activeGov.images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 3000);
    return () => clearInterval(timer);
  }, [currentIdx, activeGov.id]);

  return (
    <section id="gallery" className="py-12 md:py-24 bg-[#050508]">
      <style>
        {`
          @keyframes fade {
            from { opacity: 0.3; }
            to { opacity: 1; }
          }
          .animate-fade {
            animation: fade 0.6s ease-in-out;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-serif text-white mb-8 md:mb-16 text-center">Exhibition Spaces</h2>
        
        <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-12">
          
          <div className="md:col-span-3 flex overflow-x-auto md:flex-col gap-3 pb-2 md:pb-0 scrollbar-hide snap-x">
            {governorates.map((gov) => (
              <button
                key={gov.id}
                onClick={() => handleGovChange(gov)}
                className={`snap-start shrink-0 text-left px-5 py-3 md:px-6 md:py-4 transition-all duration-300 rounded-lg md:rounded-none md:border-l-2 md:border-b-0 ${
                  activeGov.id === gov.id 
                    ? 'bg-primary/20 md:bg-white/5 border-primary text-white font-bold' 
                    : 'border-transparent bg-white/5 md:bg-transparent text-white/50 hover:text-white'
                }`}
              >
                {gov.name}
              </button>
            ))}
          </div>

          <div className="md:col-span-9 bg-black/30 border border-white/10 rounded-2xl p-4 md:p-8 flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
            <h3 className="text-xl md:text-3xl text-white font-serif mb-4 md:mb-6">{activeGov.name} Wing</h3>
            
            <div className="w-full flex flex-col items-center">
              <img 
                key={currentIdx}
                src={activeGov.images[currentIdx]} 
                alt={activeGov.name}
                className="w-full h-[250px] md:h-[450px] object-cover rounded-lg shadow-2xl mb-6 animate-fade"
              />
              
              <div className="flex gap-3 md:gap-4 items-center justify-between w-full md:w-auto md:justify-center">
                <button 
                  onClick={prevImage}
                  className="px-5 py-2 md:px-6 md:py-2 bg-white/10 text-white text-sm md:text-base hover:bg-white/20 transition-all rounded"
                >
                  Prev
                </button>
                
                <span className="text-white/50 text-xs md:text-sm font-mono mx-2">
                  {currentIdx + 1} / {activeGov.images.length}
                </span>
                
                <button 
                  onClick={nextImage}
                  className="px-5 py-2 md:px-6 md:py-2 bg-primary text-black font-bold text-sm md:text-base hover:bg-white transition-all rounded"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
