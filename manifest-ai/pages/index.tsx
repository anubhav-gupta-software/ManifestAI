import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';

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

  useEffect(() => {
    // Redirect to login or questionnaire if already signed in (future logic)
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-6">
      <h1 className="text-4xl font-bold mb-4">ManifestAI</h1>
      <p className="text-center text-lg max-w-xl mb-6">
        Turn your dreams into visuals. Answer a few questions and watch your personalized AI vision board come to life.
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        onClick={handleSignIn}
      >
        Sign in with Google
      </button>
    </div>
  );
}
