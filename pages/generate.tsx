import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { layouts } from '@/lib/layout';

const FACTS = [
  "🌟 You dream of a peaceful home and meaningful impact.",
  "🎯 You're goal-driven with a creative spirit.",
  "💪 You value mastery, growth, and deep inspiration.",
  "🧘 You find calm in nature and purpose in connection.",
  "🌎 You aim to live boldly and give back richly.",
  "🔥 Your vision is full of passion and positivity."
];

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [loadingPrompt, setLoadingPrompt] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMasterPrompt = async () => {
      const answers = JSON.parse(localStorage.getItem('visionAnswers') || '[]');
      const profile = answers.join('\n');

      try {
        const res = await fetch('/api/generate-master-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile })
        });
        const data = await res.json();
        setPrompt(data.prompt || 'No prompt received.');
      } catch (err) {
        console.error('Error fetching prompt:', err);
        setPrompt('Something went wrong!');
      } finally {
        setLoadingPrompt(false);
      }
    };

    fetchMasterPrompt();

    const factTimer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % FACTS.length);
    }, 3000);

    return () => clearInterval(factTimer);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (!prompt) return;
      setLoadingImages(true);
      try {
        const res = await fetch('/api/image-generator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        setImages(data.image_url?.slice(0, 6) || []);
      } catch (err) {
        console.error('Error generating images:', err);
      } finally {
        setLoadingImages(false);
      }
    };

    if (prompt) fetchImages();
  }, [prompt]);

  const handleDownload = async () => {
    if (!boardRef.current) return;
    const dataUrl = await toPng(boardRef.current, {
      width: 1122,
      height: 794,
      backgroundColor: '#1a1a1a'
    });
    const link = document.createElement('a');
    link.download = 'vision-board.png';
    link.href = dataUrl;
    link.click();
  };

  const renderLayout = (
    layout: any[],
    scale = 1,
    isThumbnail = false,
    onClick?: () => void,
    highlight?: boolean
  ) => {
    return (
      <div
        className={`relative border border-purple-700 rounded-xl bg-[#1a1a1a] cursor-pointer transition-all ${
          highlight ? 'ring-4 ring-pink-500' : 'hover:ring-2 hover:ring-pink-400'
        }`}
        style={{
          width: `${1122 * scale}px`,
          height: `${794 * scale}px`,
          margin: isThumbnail ? '0.5rem' : 'auto'
        }}
        onClick={onClick}
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const img = images[i];
          const rect = layout[i];
          if (!img || !rect) return null;

          const maxWidth = 1122;
          const maxHeight = 794;
          const left = Math.min(rect.left * scale, maxWidth - rect.width * scale);
          const top = Math.min(rect.top * scale, maxHeight - rect.height * scale);

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top,
                left,
                width: rect.width * scale,
                height: rect.height * scale,
                backgroundColor: '#2a2a2a',
                border: '2px solid #a855f7',
                borderRadius: '0.75rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={img}
                alt={`vision-${i}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text"
      >
        ✨ Your AI-Generated Vision
      </motion.h1>

      {(loadingPrompt || loadingImages) ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse cursor-wait text-center">
          <div className="text-xl text-purple-300 mb-4">{FACTS[factIndex]}</div>
          <div className="text-lg text-gray-400">
            {loadingPrompt ? 'Generating your vision prompt... ⏳' : 'Creating your vision board images... 🎨'}
          </div>
        </div>
      ) : images.length > 0 && selectedLayoutIndex === null ? (
        <>
          <p className="text-lg text-center mb-4">Choose a layout you like best 👇</p>
          <div className="grid grid-cols-2 gap-8 justify-center items-center max-w-screen-xl mx-auto">
            {layouts.map((layout, idx) => (
              <div key={idx} className="flex justify-center">
                {renderLayout(layout, 0.45, true, () => setSelectedLayoutIndex(idx), false)}
              </div>
            ))}
          </div>
        </>
      ) : selectedLayoutIndex !== null ? (
        <>
          <div className="flex justify-center gap-4 mb-4 mt-6">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              <Download size={20} /> Download
            </button>
          </div>
          <div ref={boardRef}>
            {renderLayout(layouts[selectedLayoutIndex], 1)}
          </div>
        </>
      ) : null}
    </div>
  );
}
