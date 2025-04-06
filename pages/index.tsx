import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Dream',
    subtitle: 'Forward',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop',
  },
  {
    id: 2,
    title: 'See',
    subtitle: 'Clearly',
    image: 'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=1920&h=1080&fit=crop',
  },
  {
    id: 3,
    title: 'Stay',
    subtitle: 'Inspired',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1920&h=1080&fit=crop',
  },
  {
    id: 4,
    title: 'Feel',
    subtitle: 'Motivated',
    image: 'https://images.unsplash.com/photo-1494122353634-c310f45a6d3c?w=1920&h=1080&fit=crop',
  },
];

function Slide({ slide }: { slide: any }) {
  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-0"
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/50" />
    </motion.div>
  );
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoPlaying) {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    }, 4000);

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

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/questions');
    } catch (err) {
      console.error('Login Error:', err);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black font-sans">
      <AnimatePresence mode="wait">
        <Slide slide={slides[currentIndex]} />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40 z-10" />

      <button
        onClick={handlePrevious}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl sm:text-7xl font-extrabold text-white bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text mb-4"
        >
           Manifest Your Dreams 
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-white text-lg sm:text-xl max-w-2xl mx-auto mb-6"
        >
          Answer magical questions & let AI visualize the most radiant version of your life.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignIn}
          className="bg-gradient-to-r from-pink-500 to-yellow-500 text-black font-semibold px-10 py-4 rounded-full shadow-2xl hover:opacity-90 transition duration-300 text-lg"
        >
          🚀 Sign in with Google
        </motion.button>
      </div>

      <div className="absolute top-4 left-4 z-30 text-white text-sm bg-purple-600 px-3 py-1 rounded-full shadow">💡 Let’s Manifest</div>
      <div className="absolute top-4 right-4 z-30 text-white text-sm bg-yellow-500 px-3 py-1 rounded-full shadow">🌟 You’re Magic</div>
    </div>
  );
}