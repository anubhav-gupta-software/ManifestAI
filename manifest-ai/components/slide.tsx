import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface SlideProps {
  slide: {
    id: number;
    title: string;
    subtitle: string;
    image: string;
  };
}

export default function Slide({ slide }: SlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 w-full h-full"
    >
      <div className="relative w-full h-full">
        <img 
          src={slide.image} 
          alt={`${slide.title} ${slide.subtitle}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="absolute top-8 left-8">
          <h1 className="text-white text-2xl tracking-tight">Manifest AI</h1>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center gap-12">
          <div className="flex items-baseline gap-4">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-8xl tracking-tighter font-medium text-white"
            >
              {slide.title}
            </motion.h2>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-7xl md:text-8xl tracking-tighter font-medium text-transparent"
              style={{
                WebkitTextStroke: '1px white',
              }}
            >
              {slide.subtitle}
            </motion.h2>
          </div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors tracking-wide"
          >
            <span>SIGN IN</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="absolute top-8 right-8 text-white/60 tracking-widest">
          <p>MANIFEST #{String(slide.id).padStart(2, '0')}</p>
        </div>
      </div>
    </motion.div>
  );
}