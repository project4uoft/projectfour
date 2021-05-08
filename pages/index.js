import Head from "next/head";
import { useUser } from '@auth0/nextjs-auth0';

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        <h1>
          Home Page
      </h1>

      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
};
