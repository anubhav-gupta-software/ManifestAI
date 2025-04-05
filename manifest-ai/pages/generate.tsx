import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    fetchMasterPrompt();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text"
      >
        ✨ Your AI-Generated Master Prompt
      </motion.h1>

      {loading ? (
        <p className="text-center text-gray-300 animate-pulse">Generating your vision prompt... ⏳</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700"
        >
          <p className="whitespace-pre-wrap text-lg leading-relaxed text-pink-200">{prompt}</p>
        </motion.div>
      )}
    </div>
  );
}