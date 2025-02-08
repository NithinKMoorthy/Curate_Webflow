import Link from 'next/link';
import { getSession } from '@auth0/nextjs-auth0/edge';

// Force dynamic to check session on each request
export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  try {
    // Get the session from Auth0
    const session = await getSession();
    const isLoggedIn = Boolean(session?.user);
    const userName = session?.user?.name || '';

    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-900 text-white">
        {/* Navigation Bar */}
        <header className="px-6 py-4 flex items-center justify-between bg-purple-800 bg-opacity-50">
          <Link href="/" className="text-2xl font-bold hover:opacity-90">
            Curate
          </Link>
          <nav className="flex items-center gap-4">
            {isLoggedIn && (
              <Link href="/protected-home" className="text-white hover:underline underline-offset-2">
                Protected Home
              </Link>
            )}
            <Link
              href={isLoggedIn ? "/api/auth/logout" : "/api/auth/login"}
              className="bg-white text-purple-700 px-4 py-2 rounded-full font-semibold hover:shadow-lg transition"
            >
              {isLoggedIn ? 'Log Out' : 'Log In'}
            </Link>
          </nav>
        </header>

        {/* Landing Content */}
        <section className="p-6 flex flex-col items-center justify-center text-center mt-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Curate</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-xl">
            Your personalized home feed for everything you care about.
          </p>
          {isLoggedIn && <p className="text-lg font-semibold mb-6">Hello, {userName}!</p>}
          {isLoggedIn && (
            <Link
              href="/protected-home"
              className="bg-white text-purple-700 px-6 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition"
            >
              Go to Protected Home
            </Link>
          )}
        </section>
      </main>
    );
  } catch (error) {
    console.error('Error fetching session:', error);
    return (
      <main className="min-h-screen flex items-center justify-center bg-purple-600 text-white">
        <p className="text-lg">Error loading page. Please try again later.</p>
      </main>
    );
  }
}
