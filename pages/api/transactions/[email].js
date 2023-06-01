import Transaction from "../../../models/Transaction";
import User from "../../../models/User";
import dbConnect from "../../../src/lib/dbConnect";

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  // create new user
  if (method === "GET") {
    try {
      const { email } = req.query || {};
      const user = await User.findOne({ email });

      // get all transactions
      const transactions = await Transaction.find({ user: user?._id }).sort({
        createdDate: -1,
      });

      res.status(200).json(transactions);
    } catch (err) {
      console.error(err);
      res.status(400).json({
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
