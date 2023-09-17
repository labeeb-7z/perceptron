import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter";


const handler = NextAuth({ 
    session: { strategy: "jwt" },   
    providers: [
        TwitterProvider({
            clientId: 'aUd3N3YwN3BjWXFNYVB0dGhrU3I6MTpjaQ',
            clientSecret: '8Ltgjvm4OAO77Sufg0pa-8H7L3YvDv56xrK9Sz_6aUEnScrtQj',
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
})


export { handler as GET, handler as POST }