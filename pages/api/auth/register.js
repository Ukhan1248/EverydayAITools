import bcrypt from "bcrypt";
import User from "../../../models/User";
import dbConnect from "../../../src/lib/dbConnect";

async function handler(req, res) {
  const { method } = req;

 await  dbConnect();

  // create new user
  if (method === "POST") {
    try {
      const { email, password } = req.body || {};
      console.log({ email, password } );
      // check validation
      if (!req.body) {
        return res.status(400).json({
          error: "Invalid Data!!",
        });
      }

      // check user exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          error: {
            email: "User already exists",
          },
        });
      }

      // password hashed
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "server Error" });
          }

          if (hash) {
            // generate free trial end date
            const currentDate = new Date();
            const futureDate = new Date(
              currentDate.getTime() + 3 * 24 * 60 * 60 * 1000
            );
            const futureTimestamp = futureDate.getTime();

            const trialEnd = futureTimestamp;

            // create new user
            const newUser = new User({
              email,
              password: hash,
              trialEnd,
              tokens: 500,
            });

            // save user in db
            await newUser.save();

            // send response
            res.status(201).json(newUser);
          }
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err.message||"Server error occurred" ,
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
