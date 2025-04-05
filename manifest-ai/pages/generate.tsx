import { useEffect, useState } from 'react';

export default function GeneratePage() {
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const answers = JSON.parse(localStorage.getItem('visionAnswers') || '[]');
      const res = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      setPrompts(data.prompts);
    };
    fetchPrompts();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Your AI Vision Prompts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {prompts.map((prompt, i) => (
          <div key={i} className="p-4 bg-white rounded shadow border">
            <p>{prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
