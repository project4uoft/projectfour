import Head from "next/head";
import styles from "../styles/index.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const roomId = uuid();
      router.push(`/gameroom?user=${user.nickname}&roomid=${roomId}`);
    }
  }, [user, isLoading]);

  return (
    <div>
      <Head>
        <title>Party House</title>
      </Head>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-20">
          <div className={styles.left}>
            <h1 className={styles.h1}>Party House</h1>
            <img
              className={styles.logo}
              src="./assets/images/homepage/Logo1.png"
              alt="Logo"
            />
            <h3 className={styles.h3}>
              Play games with friends from your home
            </h3>
          </div>

          <div className={styles.outer}>
            <img
              className={styles.below}
              src="./assets/images/homepage/cardstack.png"
              alt="card stack"
            />

            {/* <img src='./assets/images/homepage/cardtest.png' alt='card stack'/> */}
            {/* test */}

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
                      {/* <form action="/api/auth/login" className="px-4 py-2 rounded ">
                        <input type="submit" className="font-bold text-white bg-gray-900 hover:bg-blue-900" value="Sign Up or Login" />
                      </form> */}
                      <Link href="/api/auth/login">
                        <button className="flex justify-center rounded hover:bg-grey">
                          <img
                            src=".././assets/images/homepage/SignupButton.png"
                            alt="login"
                          />
                        </button>
                      </Link>
                      <Link href="/api/auth/login">
                        <button className="flex justify-center rounded hover:bg-grey">
                          <img
                            src=".././assets/images/homepage/LoginButton.png"
                            alt="login"
                          />
                        </button>
                      </Link>
                      <Link href="/api/auth/login">
                        <button className="flex justify-center rounded hover:bg-grey">
                          <img
                            src=".././assets/images/homepage/GuestButton.png"
                            alt="Guest"
                          />
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/api/auth/logout">
                        <button className="flex justify-center rounded hover:bg-grey">
                          <img
                            src=".././assets/images/homepage/GuestButton.png"
                            alt="Guest"
                          />
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
