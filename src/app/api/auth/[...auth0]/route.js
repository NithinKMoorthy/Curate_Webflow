import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0/edge";

// Force dynamic to prevent static optimization
export const dynamic = "force-dynamic";

export const GET = handleAuth({
  async login(req) {
    try {
      return await handleLogin(req, {
        authorizationParams: {
          audience: "https://curate-api", // Ensure this matches your API audience
          scope: "openid profile email", // Include required scopes
        },
      });
    } catch (error) {
      return new Response(error.message, { status: error.status || 500 });
    }
  },

  async logout(req) {
    try {
      return await handleLogout(req, {
        returnTo: "/", // Redirect user to homepage after logout
      });
    } catch (error) {
      return new Response(error.message, { status: error.status || 500 });
    }
  },
});
