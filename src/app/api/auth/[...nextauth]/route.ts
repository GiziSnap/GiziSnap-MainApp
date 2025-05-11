import { options } from '@/auth';
import NextAuth from 'next-auth';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(options);

export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextApiRequest, NextApiResponse } from "next";

// Buat konfigurasi NextAuth
// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Username",
//           type: "text",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials) {
//         const { username, password } = credentials || {};

//         // Verifikasi kredensial (biasanya menggunakan database)
//         // Di sini, kita menggunakan hardcode username dan password untuk demonstrasi
//         if (username === "admin" && password === "password123") {
//           return {
//             id: "1",
//             name: "Admin User",
//             email: "admin@example.com",
//           };
//         } else {
//           return null; // Jika kredensial salah, kembalikan null
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/auth/signin', // Kustomisasi halaman login
//   },
//   session: {
//     strategy: "jwt", // Menggunakan JWT untuk sesi
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.id = token.id;
//         session.name = token.name;
//         session.email = token.email;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET, // Jangan lupa setkan NEXTAUTH_SECRET di environment variables
// });
