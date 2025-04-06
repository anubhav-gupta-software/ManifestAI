import { motion } from 'framer-motion';

export default function Banner() {
  return (
    <div className="fixed bottom-0 w-full overflow-hidden h-32 pointer-events-none">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      <motion.div
        animate={{ 
          x: [0, -1920],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
        className="whitespace-nowrap text-[200px] font-black leading-none relative"
      >
        <span className="text-transparent inline-block mr-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}>MANIFEST DREAMS.</span>
        <span className="text-transparent inline-block mr-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}>MANIFEST DREAMS.</span>
        <span className="text-transparent inline-block mr-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}>MANIFEST DREAMS.</span>
        <span className="text-transparent inline-block mr-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.7)' }}>MANIFEST DREAMS.</span>
      </motion.div>
    </div>
  );
}