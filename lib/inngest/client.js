import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "Smart Finance", // Unique app ID
  name: "Smart Finance",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});
