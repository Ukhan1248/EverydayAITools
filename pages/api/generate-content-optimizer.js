import { Configuration, OpenAIApi } from "openai";
import User from "../../models/User";

const API_KEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { topics, keywords, competitors, email } = req.body;

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
    prompt: `Generate SEO content and improvement tips with the following info: Topics: ${topics} Keywords: ${keywords} Competitors: ${competitors}`,
    temperature: 0,
    max_tokens: 300,
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

// if (user?.package === "free") {
//   let currentDate = new Date(); // create a new Date object with the current date
//   currentDate.setDate(currentDate.getDate()); // add 3 days to the current date
//   let timestamp = Math.floor(currentDate.getTime() / 1000); // convert the resulting date to a Unix timestamp// print the timestamp to the console

//   if (timestamp > user?.trialEnd) {
//     return res.status(400).json({
//       error:
//         "Your trial is over. Please purchase the Silver or Gold Package to continue using the App.",
//     });
//   }
// }