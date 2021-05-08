import Layout from "../components/Layout";
// import "../styles/globals.css";
import 'tailwindcss/tailwind.css'
import { UserProvider } from '@auth0/nextjs-auth0';



function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>

    <Layout>
      <Component {...pageProps} />
    </Layout>
    </UserProvider>
  );
}

export default MyApp;
