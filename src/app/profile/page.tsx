// app/profile/page.tsx
import { getSession } from '@auth0/nextjs-auth0/edge';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  // Retrieve the session from Auth0 (server-side)
  const session = await getSession();

  // If no user session, redirect to login
  if (!session?.user) {
    redirect('/api/auth/login');
  }

  const { user } = session;

  return (
    <main>
      <h1>Profile</h1>
      <img src={user.picture} alt="User Avatar" />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </main>
  );
}
