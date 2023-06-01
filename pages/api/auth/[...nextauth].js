import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../models/User";
import dbConnect from "../../../src/lib/dbConnect";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await dbConnect();

        // check user existence
        const result = await User.findOne({ email: credentials.email });

        if (!result) {
          throw new Error("User donot Exist");
        }

        // compare password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password does not match");
        }

        result.name = result.username;

        return result;
      },
    }),
  ],
  secret: process.env?.NEXTAUTH_SECRET || "Secret",
});
