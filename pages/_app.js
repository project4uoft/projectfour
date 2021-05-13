// This is the first component which gets run on start of app

// Layout component just wraps all pages and adds meta information about app in html head tag
import Layout from "../components/Layout";
import "../styles/globals.css";
// User provider provides context user informartion to all components after login using auth0 library
import { UserProvider } from "@auth0/nextjs-auth0";

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

// after this _app.js next component which gets run is index.js in the pages folder
// which is equivalent of root route '/' of the app
