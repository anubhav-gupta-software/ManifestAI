import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const questions = [
  "What are 3-5 specific goals or dreams you want to achieve in the next 6 months to 5 years?",
  "How do you want to feel in your ideal life, every single day?",
  "Who is the future version of yourself that you are growing into?",
  "What areas of your life feel out of alignment right now and how do you want them to shift?",
  "What kind of lifestyle do you dream of living?",
  "What kind of people do you want to attract and surround yourself with?",
  "What would your ideal day look like from morning to night?",
  "What experiences, places, or milestones do you want to have in your lifetime?",
  "What do you want to create, contribute, or be remembered for?",
  "Are there any colors, quotes, or symbols that instantly motivate or center you?",
];

export default function QuestionsPage() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [currentStep, setCurrentStep] = useState(0);
  const [notes, setNotes] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const fullAnswers = [...answers, notes];
      localStorage.setItem('visionAnswers', JSON.stringify(fullAnswers));
      router.push('/generate');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-4">Question {currentStep + 1}</h2>
        <p className="mb-4 text-gray-300">{questions[currentStep]}</p>
        <textarea
          value={answers[currentStep]}
          onChange={(e) => {
            const updated = [...answers];
            updated[currentStep] = e.target.value;
            setAnswers(updated);
          }}
          className="w-full bg-black border border-gray-600 text-white rounded p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400"
          rows={5}
        />
        <div className="flex justify-between">
          <button onClick={handleBack} disabled={currentStep === 0} className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-500 transition">⬅️ Back</button>
          <button onClick={handleNext} className="px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600 transition">{currentStep === questions.length - 1 ? 'Finish 🏁' : 'Next ➡️'}</button>
        </div>
      </motion.div>

      {currentStep === questions.length - 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-xl mt-8 bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700"
        >
          <h3 className="text-xl font-semibold mb-2">📝 Additional Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-black border border-gray-600 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            rows={4}
          />
        </motion.div>
      )}
    </div>
  );
}