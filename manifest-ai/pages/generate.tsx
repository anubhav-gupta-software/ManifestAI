// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// export default function GeneratePage() {
//   const [prompt, setPrompt] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMasterPrompt = async () => {
//       const answers = JSON.parse(localStorage.getItem('visionAnswers') || '[]');
//       const profile = answers.join('\n');

//       try {
//         const res = await fetch('/api/generate-master-prompt', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ profile })
//         });
//         const data = await res.json();
//         setPrompt(data.prompt || 'No prompt received.');
//       } catch (err) {
//         console.error('Error fetching prompt:', err);
//         setPrompt('Something went wrong!');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMasterPrompt();
//   }, []);

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
//       <motion.h1
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.7 }}
//         className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text"
//       >
//         ✨ Your AI-Generated Master Prompt
//       </motion.h1>

//       {loading ? (
//         <p className="text-center text-gray-300 animate-pulse">Generating your vision prompt... ⏳</p>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700"
//         >
//           <p className="whitespace-pre-wrap text-lg leading-relaxed text-pink-200">{prompt}</p>
//         </motion.div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [loadingPrompt, setLoadingPrompt] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

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
        setImages(data.image_url || []);
      } catch (err) {
        console.error('Error generating images:', err);
      } finally {
        setLoadingImages(false);
      }
    };

    if (prompt) fetchImages();
  }, [prompt]);

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

      {loadingPrompt ? (
        <p className="text-center text-gray-300 animate-pulse">Generating your vision prompt... ⏳</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 mb-12"
        >
          <p className="whitespace-pre-wrap text-lg leading-relaxed text-pink-200">{prompt}</p>
        </motion.div>
      )}

      {loadingImages ? (
        <p className="text-center text-gray-300 animate-pulse">Creating your vision board images... 🎨</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded-xl shadow-xl border border-gray-700"
            >
              <img src={img} alt={`vision-${i}`} className="w-full h-auto object-cover" />
            </motion.div>
          ))}
        </div>
      ) : null}
    </div>
  );
}