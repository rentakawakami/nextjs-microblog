import Head from "next/head";
import { Children } from "react";
import styles from "./layout.module.css";
import utilStyle from "../styles/utils.module.css";


const name = "River"
export const siteTitle = "next.js blog";


function Layout({children}) {
    return (
        <div className={styles.container}>
            <Head>
                <link ref="icon" href="/favicon.ico"></link>
            </Head>
            <header className={styles.header}>
                <img src="/images/profile.png" className={utilStyle.borderCircle}/>
                <h1 className={utilStyle.heading2Xl}>{ name }</h1>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;