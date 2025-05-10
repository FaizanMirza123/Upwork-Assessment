
import { paraphraseText } from '@/api/paraphrase';

// lib/api.ts
export const apiClient = {
  paraphrase: async (text: string) => {
    try {
      const res = await fetch("http://localhost:3001/paraphrase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      return await res.json();
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, error: "Network error" };
    }
  },
};
