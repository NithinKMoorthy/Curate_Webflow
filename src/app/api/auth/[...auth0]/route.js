import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0/edge";

// Force dynamic to prevent static optimization
export const dynamic = "force-dynamic";

export const GET = handleAuth({
  async login() {
    try {
      return await handleLogin( {
        authorizationParams: {
          audience: "https://curate-api", // Ensure this matches your API audience
          scope: "openid profile email", // Include required scopes
        },
      });
    } catch (error) {
      return new Response(error.message, { status: error.status || 500 });
    }
  },

  async logout() {
    try {
      return await handleLogout( {
        returnTo: "/", // Redirect user to homepage after logout
      });
    } catch (error) {
      return new Response(error.message, { status: error.status || 500 });
    }
  },
});

// Fix: Add a proper POST handler if needed
export const POST = async () => {
  return new Response("Method Not Allowed", { status: 405 });
};
