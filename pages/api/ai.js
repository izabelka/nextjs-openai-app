import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";

const API_KEY = process.env.PALM_API_KEY;

const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});


export default async (req, res) => {
  const prompt = req.body.prompt;
  if (prompt !== undefined) {
    const completion = await client.generateText({
      model: MODEL_NAME, // required, which model to use to generate the result
      temperature: 0.35, // optional, 0.0 always uses the highest-probability result
      candidateCount: 1, // optional, how many candidate results to generate
      top_k: 40, // optional, number of most probable tokens to consider for generation
      top_p: 0.95, // optional, for nucleus sampling decoding strategy
      max_output_tokens: 1024, // optional, maximum number of output tokens to generate
      stop_sequences: [], // optional, sequences at which to stop model generation
      // * optional, safety settings
      safety_settings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":1},{"category":"HARM_CATEGORY_TOXICITY","threshold":1},{"category":"HARM_CATEGORY_VIOLENCE","threshold":2},{"category":"HARM_CATEGORY_SEXUAL","threshold":2},{"category":"HARM_CATEGORY_MEDICAL","threshold":2},{"category":"HARM_CATEGORY_DANGEROUS","threshold":2}],
      prompt: {
        text: prompt,
      },
    })

    res.status(200).json({ text: `${completion[0].candidates[0].output}` });
  } else {
    res.status(400).json({ text: "No prompt provided "});
  }
}