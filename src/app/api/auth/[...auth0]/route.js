import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0/edge";

export const dynamic = "force-dynamic";

const allowedOrigin = process.env.NODE_ENV === 'development' 
  ? "*" 
  : "https://main.d32znpesnpj1dh.amplifyapp.com";

export const OPTIONS = (req) => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
};

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
    console.log("LOGOUT");
    try {
      const response = await handleLogout(req, {
        returnTo: "https://main.d32znpesnpj1dh.amplifyapp.com",
      });

      // Update CORS headers here too
      response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
      response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

      return response;
    } catch (error) {
      return new Response(error.message, { status: error.status || 500 });
    }
  },
});