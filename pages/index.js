import Head from "next/head";
import styles from '../styles/index.module.css';
import { useUser } from '@auth0/nextjs-auth0';


export default function Home() {
  const { user, error, isLoading } = useUser();
  return (
    <div>
      <Head>
        <title>Party House</title>
      </Head>
      <div className={styles.vertical}>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-20">

          {/* Column1 */}
          <div className={styles.left}>
            <h1 className={styles.h1}>Party House</h1>
            <img className={styles.logo} src='./assets/images/homepage/Logo1.png' alt='Logo' />
            <h3 className={styles.h3}>Play games with friends from your home</h3>
          </div>

          {/* Column2 */}
          <div className={styles.outer}>
            <img className={styles.below} src='./assets/images/homepage/cardstack.png' alt='card stack' />

            {/* <img src='./assets/images/homepage/cardtest.png' alt='card stack'/> */}

            <div className={styles.top}>
              
              {isLoading && <p>Loading login info...</p>}

                    {error && (
                      <>
                        <h4>Error</h4>
                        <pre>{error.message}</pre>
                      </>
                    )}

              <div className={styles.buttons}>
                <div className="grid grid-cols-1 gap-10">
                  {!user ? (
                    <>
                      <form action="/api/auth/login" className=" py-2 px-4 rounded">
                        <input type="submit" className="bg-purple-300 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" value="Sign Up or Login" />
                      </form>
                      <form action="/api/auth/login" className=" py-2 px-4 rounded">
                        <input type="submit" className="bg-purple-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" value="Guest" />
                      </form>
                    </>) : (
                    <>

                      <form action="/api/auth/logout" className=" py-2 px-4 rounded">
                        <input type="submit" className="bg-gray-900 hover:bg-blue-900 text-white font-bold" value="Log Out" />
                      </form>
                      <form action="/profile" className=" py-2 px-4 rounded">
                        <input type="submit" className="bg-gray-900 hover:bg-blue-900 text-white font-bold" value="Profile" />
                      </form>
                    </>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div >
  </div>

  );
}
