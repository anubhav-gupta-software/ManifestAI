import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const questions = [
  "What’s your full name?",
  "How old are you?",
  "What's your gender identity?",
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
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/back.png")',
          filter: 'brightness(0.65) saturate(1)',
        }}
      />

      {/* Main content */}
      <div className="w-full max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-white/10 rounded-lg shadow-xl p-8 border border-white/20 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white text-center">
            Question {currentStep + 1}
          </h2>
          <p className="text-white/90 text-center">{questions[currentStep]}</p>

          <textarea
            value={answers[currentStep]}
            onChange={(e) => {
              const updated = [...answers];
              updated[currentStep] = e.target.value;
              setAnswers(updated);
            }}
            className="w-full h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md p-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none"
            placeholder="Type your answer here..."
          />

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-white font-medium border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors text-white font-medium border border-white/20"
            >
              {currentStep === questions.length - 1 ? 'Finish 🏁' : 'Next'}
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {currentStep === questions.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/10 rounded-lg shadow-xl p-6 border border-white/20 mt-8"
          >
            <h3 className="text-xl font-semibold text-white mb-2">🗒️ Additional Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-28 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none"
              placeholder="Anything else you'd like to add?"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}