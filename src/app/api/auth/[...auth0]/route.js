import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0/edge";

export const dynamic = "force-dynamic";

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

  async logout(req) {
    try {
      const response = await handleLogout(req, {
        returnTo: "https://main.d32znpesnpj1dh.amplifyapp.com",
      });

      // ✅ Manually set CORS headers for logout
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

      return response;
    } catch (error) {
      return new Response(error.message, { status: error.status || 500 });
    }
  },
});
