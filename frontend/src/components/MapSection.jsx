import { useState } from 'react';
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createPulseIcon = (color) => {
  return L.divIcon({
    className: 'pulse-icon',
    html: `
      <div class="pulse-icon-ring" style="border-color: ${color}"></div>
      <div class="pulse-icon-inner" style="background-color: ${color}; box-shadow: 0 0 10px ${color}"></div>
    `,
    iconSize: [35, 35],
    iconAnchor: [17.5, 17.5]
  });
};

const governoratesData = [
  { id: 1, nameEn: 'Cairo', nameAr: 'القاهرة', coords: [30.0700, 31.2500], color: '#C9A96E', desc: 'The bustling capital of Egypt, a city that never sleeps, blending ancient history with modern life.', crafts: 'Copperware, Tentmaking (Khayamiya)', arch: 'Islamic architecture, Modern urban', trad: 'Ramadan lanterns, Cafe culture' },
  { id: 2, nameEn: 'Alexandria', nameAr: 'الإسكندرية', coords: [31.1990, 29.9000], color: '#4A9EBF', desc: 'The Pearl of the Mediterranean, founded by Alexander the Great, known for its coastal vibe and Greco-Roman history.', crafts: 'Seashell crafts, Boat building', arch: 'Greco-Roman, Mediterranean colonial', trad: 'Seafood feasts, Coastal promenades' },
  { id: 3, nameEn: 'Port Said', nameAr: 'بورسعيد', coords: [31.2600, 32.2900], color: '#3a82a1', desc: 'The city built at the mouth of the Suez Canal — a crossroads of global trade and a symbol of Egyptian resistance.', crafts: 'Maritime crafts, Fishing nets', arch: 'Ottoman-influenced, Colonial architecture', trad: 'Resistance heritage, Maritime culture' },
  { id: 4, nameEn: 'Aswan', nameAr: 'أسوان', coords: [24.0900, 32.8900], color: '#C9703A', desc: 'Egypt’s sunny southern city and ancient frontier town, located on the most beautiful part of the Nile.', crafts: 'Nubian baskets, Pottery, Beadwork', arch: 'Nubian domed houses, Pharaonic temples', trad: 'Nubian music, Folkloric dances' },
  { id: 5, nameEn: 'Luxor', nameAr: 'الأقصر', coords: [25.6900, 32.6400], color: '#9a5a2a', desc: 'The world’s greatest open-air museum, home to the Valley of the Kings and magnificent ancient temples.', crafts: 'Alabaster carving, Papyrus making', arch: 'Monumental Pharaonic architecture', trad: 'Tahtib (Stick dance), Upper Egypt heritage' },
  { id: 6, nameEn: 'Giza', nameAr: 'الجيزة', coords: [29.9800, 31.1000], color: '#b39256', desc: 'Home to the iconic Pyramids and the Sphinx, representing the architectural prowess of the Old Kingdom.', crafts: 'Carpet weaving, Perfume making', arch: 'Ancient Egyptian, Modern residential', trad: 'Desert safaris, Horse riding' },
  { id: 7, nameEn: 'Matrouh (Siwa)', nameAr: 'مطروح - سيوة', coords: [29.2000, 25.5000], color: '#7B9EBF', desc: 'A stunning desert oasis and pristine Mediterranean beaches, with a unique Amazigh cultural heritage.', crafts: 'Salt lamps, Silver jewelry, Embroidery', arch: 'Shali (Mud-brick) architecture', trad: 'Amazigh festivals, Date harvesting' },
  { id: 8, nameEn: 'Red Sea', nameAr: 'البحر الأحمر', coords: [27.2500, 33.8000], color: '#8a6d4b', desc: 'A stunning coastline known for its crystal-clear waters, vibrant coral reefs, and rugged mountain backdrops.', crafts: 'Bedouin textiles, Leatherwork', arch: 'Resort architecture, Bedouin tents', trad: 'Diving culture, Bedouin hospitality' },
  { id: 9, nameEn: 'Sinai', nameAr: 'سيناء', coords: [29.5000, 33.8000], color: '#5DAF83', desc: 'The land of turquoise, bridging Africa and Asia, known for its majestic mountains, sacred history, and stunning Red Sea coast.', crafts: 'Bedouin embroidery, Traditional weaving, Turquoise jewelry', arch: 'Bedouin camps, Coastal resorts, Monastery architecture', trad: 'Bedouin hospitality, Desert trekking, Pilgrimage traditions' }
];

const MapController = ({ searchedCoords }) => {
  const map = useMap();
  
  if (searchedCoords) {
    map.flyTo(searchedCoords, 10, { animate: true, duration: 1.5 });
  }

  return (
    <button 
      onClick={() => {
        map.locate().on("locationfound", function (e) {
          map.flyTo(e.latlng, 12);
        });
      }}
      className="absolute bottom-6 right-6 z-[1000] bg-primary text-background p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
      </svg>
    </button>
  );
};

export default function MapSection() {
  const [selectedGov, setSelectedGov] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedCoords, setSearchedCoords] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const result = governoratesData.find(g => 
      g.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
      g.nameAr.includes(searchQuery)
    );
    if (result) {
      setSearchedCoords(result.coords);
      setSelectedGov(result);
    }
  };

  return (
    <section id="map" className="relative w-full h-screen bg-background">
      
      <div className="absolute top-24 left-6 z-[1000] w-72">
        <form onSubmit={handleSearch} className="flex bg-black/60 backdrop-blur-md border border-white/10 rounded-none overflow-hidden">
          <input 
            type="text" 
            placeholder="Search governorates..." 
            className="bg-transparent text-white px-4 py-2 w-full outline-none text-sm placeholder:text-white/40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-primary text-background px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          </button>
        </form>
      </div>

      <MapContainer 
        center={[26.8206, 30.8025]} 
        zoom={6} 
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Dark Matter (CartoDB)">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Satellite (Esri)">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Street Map (OSM)">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Masarat Governorates Layer">
            <WMSTileLayer
              url="http://localhost:8080/geoserver/OsProject/wms"
              layers="OsProject:Egypt_Province"
              format="image/png"
              transparent={true}
            />
          </LayersControl.Overlay>
        </LayersControl>

        {governoratesData.map((gov) => (
          <Marker 
            key={gov.id} 
            position={gov.coords} 
            icon={createPulseIcon(gov.color)}
            eventHandlers={{
              click: () => setSelectedGov(gov),
            }}
          />
        ))}

        <MapController searchedCoords={searchedCoords} />
      </MapContainer>

      {selectedGov && (
        <div className="absolute top-24 right-6 z-[1000] w-80 bg-black/80 backdrop-blur-md border border-white/10 text-white p-6 shadow-2xl transition-all">
          <button 
            onClick={() => setSelectedGov(null)}
            className="absolute top-4 right-4 text-white/50 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
          
          <h3 className="text-right text-primary text-xl font-serif mb-1">{selectedGov.nameAr}</h3>
          <h2 className="text-2xl font-serif mb-4 border-b border-white/10 pb-4">{selectedGov.nameEn}</h2>
          
          <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
            {selectedGov.desc}
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs tracking-widest text-primary/70 uppercase mb-1">Crafts & Materials</h4>
              <p className="text-sm text-white/80">{selectedGov.crafts}</p>
            </div>
            <div>
              <h4 className="text-xs tracking-widest text-primary/70 uppercase mb-1">Architecture</h4>
              <p className="text-sm text-white/80">{selectedGov.arch}</p>
            </div>
            <div>
              <h4 className="text-xs tracking-widest text-primary/70 uppercase mb-1">Traditions</h4>
              <p className="text-sm text-white/80">{selectedGov.trad}</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] md:hidden">
        <a 
          href="#experience" 
          className="bg-[#050508]/90 backdrop-blur border border-primary text-primary px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 animate-bounce shadow-2xl"
        >
          <span>Skip Map</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </a>
      </div>

    </section>
  );
}