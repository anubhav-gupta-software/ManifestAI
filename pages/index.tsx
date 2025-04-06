import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-pink-400 to-yellow-400 text-transparent bg-clip-text"
      >
        🌈 ManifestAI ✨
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.9, delay: 0.3 }}
        className="text-center text-lg max-w-xl mb-6 text-gray-300"
      >
        🌟 Turn your dreams into visuals. Answer a few questions and watch your personalized AI vision board come to life! 🎯💭
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-pink-500 to-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-xl hover:opacity-90 transition duration-300"
        onClick={handleSignIn}
      >
        🚀 Sign in with Google
      </motion.button>
    </div>
  );
}