import Head from "next/head";
import Navbar from '../components/navbar/navbar';
import styles from '../styles/Welcome.module.css';

export default function Welcome() {

  return (

    <div>
        <Head>
            <title>Welcome</title>
        </Head>
        <Navbar/>
    </div>

  );
}
