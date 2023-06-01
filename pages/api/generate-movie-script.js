import { Configuration, OpenAIApi } from "openai";
import User from "../../models/User";

const API_KEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { title, writer, location, time, characters, email } = req.body;

  const user = await User.findOne({ email });

  if (user?.package === "free") {
    if (Date.now() > user?.trialEnd) {
      return res.status(400).json({
        error: {
          tokenError:
            "Your trial is over. Please purchase the Silver or Gold Package to continue using the App.",
        },
      });
    }
  }

  if (user?.tokens === 0) {
    return res.status(400).json({
      error: {
        tokenError:
          "You have run out of Responses. Your Responses will Reset on the 1st of each month.",
      },
    });
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Generate a movie script with the following info.\n\ntitle: ${title} writer: ${writer} scene locations: ${location} scene characters: ${characters}`,
    temperature: 0,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
  });

  if (response) {
    // decrease user tokens

    if (user?._id) {
      user.tokens = user.tokens - 1;
      await user.save();
    }
  }

  res.status(200).json({ data: response.data.choices });
}
