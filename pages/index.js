import Head from "next/head";
import styles from '../styles/index.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Party House</title>
      </Head>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-20">
          <div className={styles.left}>
            <h1 className={styles.h1}>Party House</h1>
            <img className={styles.logo} src='./assets/images/homepage/Logo1.png' alt='Logo'/>
            <h3 className={styles.h3}>Play games with friends from your home</h3>
          </div>

          <div className={styles.outer}>
            <img className={styles.below} src='./assets/images/homepage/cardstack.png' alt='card stack'/>

            {/* <img src='./assets/images/homepage/cardtest.png' alt='card stack'/> */}
            {/* test */}
            
            <div className={styles.top}>


              <div className={styles.buttons}>
                <div className="grid grid-cols-1 gap-10">
                  <button className="bg-gray-900 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                    SIGN UP
                  </button>
                  <button className="bg-purple-300 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                    LOGIN
                  </button>
                  <button className="bg-purple-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                    GUEST
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

  );
}
