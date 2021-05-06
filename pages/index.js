import Head from "next/head";
import styles from '../styles/index.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Party House</title>
      </Head>
      <div class="container mx-auto">
        <div className="grid grid-cols-2 gap-20">
          <div className={styles.left}>
            <h1 className={styles.h1}>Party House</h1>
            <img className={styles.logo} src='./assets/images/homepage/Logo1.png' alt='Logo'/>
            <h3 className={styles.h3}>Play games with friends from your home</h3>
          </div>

          <div className={styles.outer}>
            <img className={styles.below} src='./assets/images/homepage/cardstack.png' alt='card stack'/>
            <img className={styles.top} src='./assets/images/homepage/card.png' alt='card stack'/>
          </div>
        </div>
      </div>
    </div>

  );
}
