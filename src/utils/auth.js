// import { PrismaAdapter } from "@auth/prisma-adapter";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "./connect";
// import { getServerSession } from "next-auth";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// };

// export const getAuthSession = () => getServerSession(authOptions);
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./connect";
import { getServerSession } from "next-auth";
import bcrypt from 'bcrypt';


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
        name: { label: "Username", type: "text", placeholder: "JohnSmith" },
      },
      async authorize(credentials, req) {
       
        
        if (!credentials.email || !credentials.password) {
          throw new Error('Veuillez entrer un email et un mot de passe');
          
        }
        

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Aucun utilisateur trouvé');
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!passwordMatch) {
          throw new Error('Mot de passe incorrect');
        }

console.log(user.name);
console.log(user.email);



       
      
        
        // console.log(user.name);
        // await prisma.account.create({
        //   data: {
        //     userId: user.id,
        //     type: 'credentials',
        //     provider: 'local', // Vous pouvez définir le fournisseur en fonction de votre application
        //     // Ajoutez d'autres champs que vous souhaitez stocker
        //     providerAccountId: user.id, // Utilisation de l'ID de l'utilisateur comme identifiant du compte
        //     // Vous pouvez ajouter d'autres champs ici en fonction de vos besoins
        //     // refresh_token: '',
        //     access_token: 'dfgdfgdfgdfgdfgdfgt',
        //     expires_at: Date.now() + 36000, // Exemple d'expiration dans 1 heure
        //     token_type: 'Bearer',
        //     scope: 'DerickScope',
        //     id_token: 'ghghfhfhjjjjjg',
        //     //session_state: 'authenticated'
        //   }

         
        // });
        return user;
      },
  }),  
],
secret: process.env.SECRET,
session: {
  strategy: "jwt",
},
debug: process.env.NODE_ENV === "production",


}

export const getAuthSession = () => getServerSession(authOptions);
