import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you'd might want to do in your ctx fn
  // async function getUserFromHeader() {
  //   if (opts?.req.headers.authorization) {
  //     // const user = await decodeJwtToken(req.headers.authorization.split(' ')[1])
  //     // return user;
  //   }
  //   return null;
  // }
  // const user = await getUserFromHeader();
  return {
    req: opts?.req,
    res: opts?.res,
  };
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
