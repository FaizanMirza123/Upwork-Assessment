import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/paraphrase", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, error: "No text provided" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AI-Paraphraser",
      },
      body: JSON.stringify({
        model: "nousresearch/deephermes-3-mistral-24b-preview:free",
        messages: [
          {
            role: "user",
            content: `Paraphrase the following text:\n\n"${text}"`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${error}`);
    }

    const data = await response.json();
    const paraphrased = data.choices?.[0]?.message?.content;

    if (!paraphrased) {
      return res.status(500).json({ success: false, error: "No response from OpenRouter" });
    }

    res.json({ success: true, result: paraphrased });
  } catch (error) {
    console.error("Paraphrasing failed:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://103.31.104.114:${PORT}`);
});
