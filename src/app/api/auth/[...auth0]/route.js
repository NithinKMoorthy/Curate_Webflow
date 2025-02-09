import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  async login(req) {
    try {
      return await handleLogin(req, {
        authorizationParams: {
          audience: "https://curate-api",
          scope: "openid profile email",
        },
      });
    } catch (error) {
      return new Response(error.message, { status: error.status || 500 });
    }
  },
});
