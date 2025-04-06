import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slide from '../components/slide';
import Banner from '../components/banner';

const slides = [
  {
    id: 1,
    title: "Dream",
    subtitle: "Forward",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
  },
  {
    id: 2,
    title: "See",
    subtitle: "Clearly",
    image: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=1920&h=1080&fit=crop",
  },
  {
    id: 3,
    title: "Stay",
    subtitle: "Inspired",
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1920&h=1080&fit=crop",
  },
  {
    id: 4,
    title: "Feel",
    subtitle: "Motivated",
    image: "https://images.unsplash.com/photo-1494122353634-c310f45a6d3c?w=1920&h=1080&fit=crop",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black font-sans">
      <AnimatePresence mode="wait">
        <Slide key={currentIndex} slide={slides[currentIndex]} />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/27 z-10 pointer-events-none" />

      <button
        onClick={handlePrevious}
        className="absolute left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="vignette z-20" />
      <div className="vignette-sides z-20" />
      <div className="vignette-top z-20" />

      <Banner />
    </div>
  );
}
