// pages/generate.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FACTS = [
  "🌟 You dream of a peaceful home and meaningful impact.",
  "🎯 You're goal-driven with a creative spirit.",
  "💪 You value mastery, growth, and deep inspiration.",
  "🧘 You find calm in nature and purpose in connection.",
  "🌎 You aim to live boldly and give back richly.",
  "🔥 Your vision is full of passion and positivity."
];

export default function GeneratePage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const fetchPromptAndImages = async () => {
      const answers = JSON.parse(localStorage.getItem('visionAnswers') || '[]');
      const profile = answers.join('\n');

      try {
        const promptRes = await fetch('/api/generate-master-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile })
        });
        const promptData = await promptRes.json();
        const prompt = promptData.prompt;

        const imageRes = await fetch('/api/image-generator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        const imageData = await imageRes.json();
        setImages((imageData.image_url || []).slice(0, 6));
      } catch (err) {
        console.error('Error loading vision board:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromptAndImages();

    const factTimer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % FACTS.length);
    }, 3000);

    return () => clearInterval(factTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] animate-pulse cursor-wait">
          <div className="text-xl text-purple-300 mb-4">{FACTS[factIndex]}</div>
          <div className="text-lg text-gray-400">Generating your personal vision board... ✨</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.slice(0, 6).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.4 }}
              className="rounded-xl overflow-hidden border-2 border-purple-600 shadow-lg bg-[#1f1f1f]"
            >
              <img src={img} alt={`vision-${i}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
