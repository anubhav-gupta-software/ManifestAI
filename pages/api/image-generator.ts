import type { NextApiRequest, NextApiResponse } from 'next';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
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
    const splitPrompts = prompt
      .split('.....______......')
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
      .slice(0, 6); // only allow up to 6 prompts

    // If fewer than 6 prompts, fill with last valid one
    while (splitPrompts.length < 6 && splitPrompts.length > 0) {
      splitPrompts.push(splitPrompts[splitPrompts.length - 1]);
    }

    const generateImage = async (subPrompt: string) => {
      const prediction = await replicate.predictions.create({
        version: 'black-forest-labs/flux-1.1-pro',
        input: {
          prompt: subPrompt,
          prompt_upsampling: true,
        },
      });

      const id = prediction.id;
      let result = prediction;

      while (result.status !== 'succeeded' && result.status !== 'failed') {
        await new Promise((r) => setTimeout(r, 2500));
        result = await replicate.predictions.get(id);
      }

      if (result.status === 'succeeded') {
        const output = result.output;
        return Array.isArray(output) ? output[0] : output;
      }

      throw new Error(`Image generation failed for: ${subPrompt}`);
    };

    const imageUrls = await Promise.all(splitPrompts.map(generateImage));

    return res.status(200).json({ image_url: imageUrls });
  } catch (error) {
    console.error('🔥 Image generation error:', error);
    return res.status(500).json({ error: 'Image generation failed' });
  }
}
