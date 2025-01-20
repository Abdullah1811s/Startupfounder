import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { author_by_github_id } from "./sanity/lib/queries"
import { write_client } from "./sanity/lib/client-write"
import { sanityFetch } from "./sanity/lib/live"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks:
  {
    //create a user if the user doesn't exists
    async signIn({ user, account, profile }) {
      const userExists = await sanityFetch({
        query: author_by_github_id,
        params: {id: profile?.id}
      })
      if (!userExists.data) {
        await write_client.create({
          _type: "author",
          id: profile?.id,
          name: user?.name,
          image: user?.image,
          username: profile?.login,
          email: user?.email,
          bio: profile?.bio || " "
        })
      }
      return true;
    },
    async jwt({token , profile , account})
    {
      if(account && profile)
      {
        const user = await sanityFetch({query:author_by_github_id , params:{id : profile?.id}});
        token.id = user?.data?._id;
      }
      return token;
    },
    async session({ session, token }:{session:any , token:any}) {
      session.user.id = token.id;
      return session;
    }
    
  }
})