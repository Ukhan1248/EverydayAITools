import Stripe from "stripe";
import Transaction from "../../models/Transaction";
import User from "../../models/User";
import sendMail from "../../services/emailService";
import emailTemplate from "../../services/emailTemplate";
import dbConnect from "../../src/lib/dbConnect";

const stripe = new Stripe(
  "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"
);

async function handler(req, res) {
  const { method } = req;

  dbConnect();

  // create new user
  if (method === "POST") {
    try {
      const { stripeToken, price, email, packageName, tokens, brand, last4 } =
        req.body || {};

      const user = await User.findOne({ email });

      // Stripe payment
      if (stripeToken) {
        const payment = await stripe.paymentIntents.create({
          amount: price * 100,
          currency: "USD",
          description: `${email} purchased the ${packageName} package for just $${price}.`,
          payment_method: stripeToken,
          confirm: true,
        });

        if (payment) {
          // generate 30 days
          const currentDate = new Date();
          const futureDate = new Date(
            currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
          );
          const futureTimestamp = futureDate.getTime();

          const packageEnd = futureTimestamp;

          user.package = packageName;
          user.tokens = Number(tokens);
          user.packageEnd = packageEnd;

          await user.save();

          // create new transaction
          const newTransaction = new Transaction({
            user: user?._id,
            amount: price,
            description: `Bought ${packageName} Plan Subscription`,
            createdDate: Date.now(),
          });

          // get date
          const today = new Date();
          const day = today.getDate().toString().padStart(2, "0");
          const month = (today.getMonth() + 1).toString().padStart(2, "0");
          const year = today.getFullYear().toString();
          const formattedDate = `${day} / ${month} / ${year}`;

          // send email purchase receipt
          sendMail({
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: `Your ${packageName} package has been purchased`,
            html: emailTemplate({
              name: email,
              brand,
              last4,
              receipt_id: newTransaction?._id,
              date: formattedDate,
              packageName: `${packageName} Package`,
              description: `Bought ${packageName} Plan Subscription`,
              amount: price,
            }),
          });

          await newTransaction.save();

          res.status(200).json(user);
        }
      }
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
