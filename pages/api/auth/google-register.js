import User from "../../../models/User";
import dbConnect from "../../../src/lib/dbConnect";

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  // create new user
  if (method === "POST") {
    try {
      const { email, name, image } = req.body || {};

      const user = await User.findOne({ email });

      if (!user) {
        // generate free trial end date
        const currentDate = new Date();
        const futureDate = new Date(
          currentDate.getTime() + 3 * 24 * 60 * 60 * 1000
        );
        const futureTimestamp = futureDate.getTime();

        const trialEnd = futureTimestamp;

        const newUser = new User({
          email,
          image,
          type: "google",
          trialEnd,
          tokens: 500,
        });

        await newUser.save();

        return res.status(200).json(newUser);
      }

      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Server error occurred",
      });
    }
  }
}

export default handler;

export const config = {
  api: {
    responseLimit: false,
  },
};
