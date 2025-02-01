import { getSession } from '@auth0/nextjs-auth0/edge';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Force dynamic so Next.js doesn't attempt static optimization
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Retrieve the Auth0 session (server-side)
  const session = await getSession();

  // OPTIONAL: If you want to auto-redirect logged-in users to /protected-home, uncomment below
  // if (session?.user) {
  //   redirect('/protected-home');
  // }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-900 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-4">
          Welcome to Curate
        </h1>
        <p className="max-w-xl text-lg md:text-xl lg:text-2xl mb-8">
          A modern platform for discovering and curating the best content.
        </p>

        {/* Conditionally show Login/Logout & Profile Links */}
        {session?.user ? (
          <>
            <p className="text-sm md:text-base lg:text-lg mb-6">
              You’re logged in as <span className="font-semibold">{session.user.name}</span>.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/api/auth/logout"
                className="px-5 py-3 rounded-md bg-pink-500 hover:bg-pink-600 transition-colors"
              >
                Log Out
              </Link>
              <Link
                href="/protected-home"
                className="px-5 py-3 rounded-md bg-green-500 hover:bg-green-600 transition-colors"
              >
                Protected Home
              </Link>
            </div>
          </>
        ) : (
          <Link
            href="/api/auth/login"
            className="px-6 py-3 text-lg font-semibold bg-pink-500 rounded-md hover:bg-pink-600 transition-colors"
          >
            Get Started
          </Link>
        )}
      </div>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-6">Why Curate?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Discover"
              description="Find content tailored just for you with our advanced recommendation engine."
              icon="🔍"
              href="/curate" // Make this card clickable
            />
            <FeatureCard
              title="Organize"
              description="Keep your favorite articles, videos, and posts all in one place."
              icon="📚"
            />
            <FeatureCard
              title="Collaborate"
              description="Share collections and collaborate with friends or teammates in real time."
              icon="🤝"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * FeatureCard - A reusable component that optionally wraps its content
 * in a <Link> if the `href` prop is provided.
 */
function FeatureCard({ title, description, icon, href }) {
  const content = (
    <>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </>
  );

  // If there's a `href` prop, wrap the card in a Link to make it clickable.
  if (href) {
    return (
      <Link
        href={href}
        className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow block"
      >
        {content}
      </Link>
    );
  }

  // Otherwise, just render a static card.
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {content}
    </div>
  );
}
