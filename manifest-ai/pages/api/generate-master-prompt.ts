import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { profile } = req.body;

  if (!profile || typeof profile !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing profile field' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a visionary assistant that creates prompts for AI image generation.

You will receive a personal profile (10 questions with answers). Based on this, write a **single cohesive and detailed prompt** designed to generate **2-3 visually diverse images** that together represent the user’s dream life, personality, aspirations, values, lifestyle, and style. more like a vision board.

Do not list multiple prompts. Write one descriptive, cinematic prompt that could inspire a series of 2-3 conceptually varied but emotionally unified images.

The result will be used by a tool like Replicate or Midjourney. Keep in under 2500 characters please for each. Please add ".....______......" after each image generated so that I know that one image's prompt is over. Also each image has name, age, and gender so write it in each image(all the features as they are different) so that there is a correct depiction of the person! Also tell it to make ghibli images(write this in each image prompt please) instead of the human like.`,
        },
        {
          role: 'user',
          content: profile,
        },
      ],
    });

    const finalPrompt = response.choices[0].message.content?.trim();
    res.status(200).json({ prompt: finalPrompt });
  } catch (error: any) {
    console.error('🔥 OpenAI Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate the master prompt' });
  }
}
