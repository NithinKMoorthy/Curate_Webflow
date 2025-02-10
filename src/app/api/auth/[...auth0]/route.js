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
      return await handleLogout(req, {
        returnTo: "https://main.d32znpesnpj1dh.amplifyapp.com", // ✅ Ensure this matches Auth0 settings
      });
    } catch (error) {
      return new Response(error.message, { status: error.status || 500 });
    }
  },
});
