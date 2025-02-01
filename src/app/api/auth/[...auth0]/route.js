// app/api/auth/[...auth0]/route.js

import {
  handleAuth,
  handleLogin,
  handleLogout
} from '@auth0/nextjs-auth0/edge';

// Force dynamic so Next.js does not try to statically optimize the route
export const dynamic = 'force-dynamic';

export const GET = handleAuth({
  // Override the login handler
  async login(request) {
    try {
      // After successful login, send the user to /protected-home
      return await handleLogin(request, {
        returnTo: '/protected-home'
      });
    } catch (error) {
      return new Response(error.message, { status: error.status || 500 });
    }
  },

  // Override the logout handler
  async logout(request) {
    try {
      // After logout, send the user back to the home page
      return await handleLogout(request, {
        returnTo: '/'
      });
    } catch (error) {
      return new Response(error.message, { status: error.status || 500 });
    }
  }
});

// Export a POST handler (required if you want to handle POST requests as well)
export const POST = handleAuth();
