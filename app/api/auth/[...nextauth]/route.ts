import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter";


const handler = NextAuth({ 
  providers: [
    TwitterProvider({
        clientId: '',
        clientSecret: ''
      })
  ],
  session: { strategy: "jwt" }
})


export { handler as GET, handler as POST }