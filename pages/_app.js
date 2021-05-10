import Layout from "../components/Layout";
import "../styles/globals.css";
import 'tailwindcss/tailwind.css'
import { UserProvider } from '@auth0/nextjs-auth0';



function MyApp({ Component, pageProps }) {
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
        </UserProvider>
  );
}

export default MyApp;
