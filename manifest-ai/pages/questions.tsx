import { useState } from 'react';
import { useRouter } from 'next/router';

const questions = [
  "Describe your ideal life in a few sentences.",
  "What are your top 3 goals this year?",
  "What kind of environment makes you feel most alive?",
  "Describe your dream job or passion project.",
  "What kind of people do you want in your life?",
  "How do you envision your health and fitness?",
  "If money wasn’t a problem, what would you do daily?",
  "What hobbies or passions do you wish you had time for?",
  "Where in the world do you dream of going?",
  "What would you want your legacy to be?",
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
      // Submit all answers
      const fullAnswers = [...answers, notes];
      localStorage.setItem('visionAnswers', JSON.stringify(fullAnswers));
      router.push('/generate');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Question {currentStep + 1}</h2>
        <p className="mb-4">{questions[currentStep]}</p>
        <textarea
          value={answers[currentStep]}
          onChange={(e) => {
            const updated = [...answers];
            updated[currentStep] = e.target.value;
            setAnswers(updated);
          }}
          className="w-full border border-gray-300 rounded p-3 mb-6"
          rows={5}
        />
        <div className="flex justify-between">
          <button onClick={handleBack} disabled={currentStep === 0} className="px-4 py-2 rounded bg-gray-300">Back</button>
          <button onClick={handleNext} className="px-4 py-2 rounded bg-blue-600 text-white">{currentStep === questions.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
      </div>

      {currentStep === questions.length - 1 && (
        <div className="w-full max-w-xl mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Additional Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded p-3"
            rows={4}
          />
        </div>
      )}
    </div>
  );
}
