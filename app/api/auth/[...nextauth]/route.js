import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";



const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    }),
  ],
  
  callbacks: {
    
    async session({ session }) {
        
      const sessionUser = await User.findOne({
        email: session.user.email,
       
      });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }
     
      return session;
    },

    async signIn({ profile }) {
      console.log(profile)
      try {
        await connectToDB();

        // CHECK IF A USER ALREADY EXIST
        const userExists = await User.findOne({
          email: profile.email,
        });

        // IF NOT, CREATE A USER
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("sign in error", error);
        return false;
      }
    }
  }
    

});

export { handler as GET, handler as POST };