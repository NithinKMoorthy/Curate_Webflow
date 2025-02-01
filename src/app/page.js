import Link from 'next/link';
import { getSession } from '@auth0/nextjs-auth0/edge';

// Force dynamic so we can check session on each request
export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  // Check if the user is logged in via Auth0
  const session = await getSession();
  const isLoggedIn = !!session?.user;
  const userName = session?.user?.name || '';

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-900 text-white">
      {/* Stylish Nav Bar */}
      <header className="px-6 py-4 flex items-center justify-between bg-purple-800 bg-opacity-50">
        {/* Logo or Brand Name */}
        <Link href="/" className="text-2xl font-bold hover:opacity-90">
          Curate
        </Link>

        {/* Nav Items */}
        <nav className="flex items-center gap-4">
          {/* Protected Home if logged in */}
          {isLoggedIn && (
            <Link
              href="/protected-home"
              className="text-white hover:underline underline-offset-2"
            >
              Protected Home
            </Link>
          )}

          {isLoggedIn ? (
            <a
              href="/api/auth/logout"
              className="bg-white text-purple-700 px-4 py-2 rounded-full font-semibold hover:shadow-lg transition"
            >
              Log Out
            </a>
          ) : (
            <a
              href="/api/auth/login"
              className="bg-white text-purple-700 px-4 py-2 rounded-full font-semibold hover:shadow-lg transition"
            >
              Log In
            </a>
          )}
        </nav>
      </header>

      {/* Main Landing Content */}
      <div className="p-6 flex flex-col items-center justify-center text-center mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Curate</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-xl">
          Your personalized home feed for everything you care about.
        </p>
        {/* Greet user if logged in */}
        {isLoggedIn && (
          <p className="text-lg font-semibold mb-6">Hello, {userName}!</p>
        )}

        {/* If user didn’t redirect to protected home, this is a direct link to get there */}
        {isLoggedIn && (
          <Link
            href="/protected-home"
            className="bg-white text-purple-700 px-6 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition"
          >
            Go to Protected Home
          </Link>
        )}
      </div>
    </main>
  );
}

