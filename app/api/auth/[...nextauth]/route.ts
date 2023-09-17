import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter";


const handler = NextAuth({ 
    session: { strategy: "jwt" },   
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID || '',
            clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
            version: '2.0'
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id
            }
            return token
        },

        async session({session, token}: any) {
            if (token) {
                session.user.id = token.id,
                session.user.name = token.name,
                session.user.email = token.email,
                session.user.image = token.picture
            }
            return session
        }


    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET || ''
    }
})


export { handler as GET, handler as POST }