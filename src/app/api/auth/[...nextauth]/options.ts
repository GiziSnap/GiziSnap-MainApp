import { env } from "@/env";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

type User = {
    id: string;
    username: string;
    email_address: string;
    accessToken: string;
}

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                email_address: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password", placeholder: "password" },
            },
            async authorize(credentials , req) {
                const res = await fetch(`${env.NEXT_PUBLIC_AUTH_BACKEND_URL}/session`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                });
                const user: User = await res.json() as User;
                console.log(user);
                if (res.ok && user) {
                    return user;
                }
                return null
            },
        })
    ]
}


// import { env } from "@/env";
// import { NextAuthOptions } from "next-auth";
// import type { AdapterUser } from "next-auth/adapters";
// import CredentialsProvider from "next-auth/providers/credentials";

// interface Credentials {
//     username?: string;
//     password?: string;
// }

// interface User {
//     id: string;
//     username: string;
//     email: string;
// }

// interface LoginResponse {
//     Success: boolean;
//     Message: string;
//     token: string;
//     user: User;
// }

// export const options: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 username: { label: "Username", type: "text", placeholder: "username" },
//                 email_address: { label: "Email", type: "email", placeholder: "email" },
//                 password: { label: "Password", type: "password", placeholder: "password" },
//             },
//             async authorize(credentials: Credentials | undefined) {
//                 if (!credentials?.username || !credentials?.password) {
//                     return null;
//                 }

//                 const res = await fetch(`${env.NEXT_PUBLIC_AUTH_BACKEND_URL}/session`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         username: credentials.username,
//                         password: credentials.password,
//                     }),
//                 });

//                 const user: LoginResponse = await res.json() as LoginResponse; // Menyatakan tipe respons

//                 if (res.ok && user?.user) {
//                     // Mengembalikan objek yang cocok dengan tipe yang diharapkan oleh NextAuth
//                     return {
//                         id: user.user.id,
//                         username: user.user.username,
//                         email: user.user.email,
//                         token: user.token,
//                     };
//                 }

//                 return null; // Jika login gagal, kembalikan null
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//                 token.username = (user as AdapterUser).username;
//                 token.email = user.email;
//                 token.token = user.token;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if (token) {
//                 session.user.id = token.id as string;
//                 session.user.username = token.username as string;
//                 session.user.email = token.email as string;
//             }
//             return session;
//         },
//     },
// };
