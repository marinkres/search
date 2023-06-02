import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import SHA256 from "crypto-js/sha256"; // Import the SHA256 hash function

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // Array of names and numbers
        const names = [
          "Alice",
          "Bob",
          "Charlie",
          "Dave",
          "Eve",
          "Frank",
          "Grace",
          "Hank",
          "Ivy",
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
        ];

        // Function to generate a deterministic random name based on the user's ID
        const randomName = (userId) => {
          // Generate a hash value based on the user's ID
          const hash = SHA256(userId).toString();

          // Convert the first 8 characters of the hash value to an integer
          const index = parseInt(hash.slice(0, 8), 16);

          // Use the integer value to select a name from the names array
          return names[index % names.length];
        };

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: randomName(profile.id), // Generate a random unique name for each user based on their ID
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST }