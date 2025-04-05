import type { NextApiRequest, NextApiResponse } from 'next';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing prompt' });
  }

  try {
    const generateImage = async (prompt: string) => {
      const prediction = await replicate.predictions.create({
        version: 'black-forest-labs/flux-1.1-pro',
        input: {
          prompt,
          prompt_upsampling: true,
        },
      });

      const predictionId = prediction.id;
      let result;

      while (!result || (result.status !== 'succeeded' && result.status !== 'failed')) {
        console.log(`⏳ Polling for image... (status: ${result?.status || 'starting'})`);
        await new Promise(res => setTimeout(res, 3000));
        result = await replicate.predictions.get(predictionId);
      }

      if (result.status === 'succeeded') {
        return Array.isArray(result.output) ? result.output : [result.output];
      } else {
        throw new Error('Prediction failed.');
      }
    };

    const generationCount = 10;
    const imagePromises = Array.from({ length: generationCount }, () => generateImage(prompt));
    const allResults = await Promise.all(imagePromises);

    const images = allResults.flat();
    return res.status(200).json({ image_url: images });
  } catch (error) {
    console.error('🔥 Parallel image generation error:', error);
    return res.status(500).json({ error: 'Image generation failed using Replicate' });
  }
}