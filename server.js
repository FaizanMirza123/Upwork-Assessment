import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenRouter API Key
const OPENROUTER_API_KEY = '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';

// Endpoint for paraphrasing
app.post('/paraphrase', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, error: 'Text is required for paraphrasing.' });
  }

  try {
    // Request payload for OpenRouter
    const requestBody = {
      model: 'nousresearch/deephermes-3-mistral-24b-preview:free',
      messages: [
        {
          role: 'user',
          content: `Paraphrase this text: ${text}`,
        },
      ],
    };

    // Fetch request to OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ success: false, error: data.error || 'Error paraphrasing text.' });
    }

    // Assuming the result is in the "choices" array from OpenRouter API
    const paraphrasedText = data.choices[0]?.message.content;

    if (!paraphrasedText) {
      return res.status(500).json({ success: false, error: 'No paraphrased text received.' });
    }

    res.json({ success: true, result: paraphrasedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'An error occurred while paraphrasing text.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
