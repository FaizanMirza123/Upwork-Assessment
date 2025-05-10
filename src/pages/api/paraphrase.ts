// src/pages/api/paraphrase.ts
import { paraphraseText } from '@/api/paraphrase';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const result = await paraphraseText(text);
    
    return res.status(200).json({ result });
  } catch (error) {
    console.error('Error in paraphrase API:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
