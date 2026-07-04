import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MapSection from './components/MapSection';
import Experience from './components/Experience';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot/Chatbot'; // استدعاء الشات بوت

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <MapSection />
      <Experience />
      <Gallery />
      <Booking />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;