import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/database";
import mongoose from "mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const handlerAuth = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();
        try {
          const user = await mongoose.connection.db
            .collection("users")
            .findOne({ email: credentials.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Password incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session) return null;

      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        await connect();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            firstname: profile.name?.split(" ")[0],
            lastname: profile.name?.split(" ")[1],
            phone: Math.floor(1000000000 + Math.random() * 9000000000),
          });

          console.log("User created successfully!");
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export { handlerAuth as GET, handlerAuth as POST };
