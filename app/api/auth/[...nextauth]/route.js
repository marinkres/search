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

        // Array of names
        const names = ["Tito", "Boban", "Vrabac", "Dragan", "Sladjana", "Jamnica", "Carti", "Mentol", "Kurton"];

        // Function to generate a deterministic random name based on the user's ID
        const randomName = (userId) => {
          // Generate a hash value based on the user's ID
          const hash = SHA256(userId).toString();

          // Convert the first 8 characters of the hash value to an integer
          const index = parseInt(hash.slice(0, 8), 16);

          // Use the integer value to select a name from the names array
          const name = names[index % names.length];

          // Generate a random number between 1 and 1000
          const number = Math.floor(Math.random() * 1000) + 1;

          // Combine the name and number to generate a unique username
          return `${name}${number}`;
        };

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          let username = randomName(profile.id);

          // Check if the generated username already exists in the database
          let usernameExists = await User.findOne({ username });

          // Keep generating new usernames until we find one that doesn't exist in the database
          while (usernameExists) {
            username = randomName(profile.id);
            usernameExists = await User.findOne({ username });
          }

          await User.create({
            email: profile.email,
            username, // Use the generated unique username
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