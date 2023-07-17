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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        const data = await User.findOne({ email: session.user.email });

        const newSession = {
          ...session,
          user: {
            ...session.user,
            id: data?._id.toString(),
            firstname: data?.firstname,
            lastname: data?.lastname,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error) {
        return session;
      }
    },

    async signIn({ profile }) {
      try {
        await connect();
        if (profile) {
          const userExists = await User.findOne({ email: profile.email });

          console.log("User exists: ", userExists);

          if (!userExists) {
            await User.create({
              email: profile.email,
              firstname: profile.name?.split(" ")[0],
              lastname: profile.name?.split(" ")[1],
              phone: Math.floor(1000000000 + Math.random() * 9000000000),
            });

            console.log("User created successfully!");
          }
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export { handlerAuth as GET, handlerAuth as POST };
