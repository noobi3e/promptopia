// this file is a backend file which will should be inside of folder structure its currently in
// LIKE api/auth/[...nextauth]
// and inside this folder we will create route.js which is another file naming convention recoginized by next to treat these files as backend files

// in this file we will configure authentication using next-auth

import { connectToDB } from '@/models/database'
import UserModel from '@/models/user'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

// to setup authentication we will create a function by calling NextAuth and passing an object which needs a Provider list which will be an array as shown below

// In Providers we will pass the GoogleProvider [there can more as per your requirement] and call it with an object which will contain clientId and clientSecret

// below code shows how to authenticate user using next-auth and google as a auth provider
const AuthHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await UserModel.findOne({
        email: session.user.email,
      })

      session.user.id = sessionUser._id

      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDB()

        // If user exists
        const userExists = await UserModel.findOne({ email: profile.email })

        // IF user doesn't exist create a user and save it to the database
        if (!userExists) {
          await UserModel.create({
            email: profile.email,
            username: profile.name.replaceAll(' ', '').toLowerCase(),
            image: profile.picture,
          })
        }

        // IF user sign in successfully then we will return true
        return true
      } catch (err) {
        console.error(err)

        return false // if any error occurred
      }
    },
  },
})

export { AuthHandler as GET, AuthHandler as POST }
