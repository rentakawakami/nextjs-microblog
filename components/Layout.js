import Head from "next/head";
import { Children } from "react";
import styles from "./layout.module.css";
import utilStyle from "../styles/utils.module.css";
import Link from "next/link";


const name = "River"
export const siteTitle = "next.js blog";


function Layout({children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <Link ref="icon" href="/favicon.ico"></Link>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                    <img src="/images/profile.png" className={utilStyle.borderCircle}/>
                <h1 className={utilStyle.heading2Xl}>{ name }</h1>
                </>
                ) : (
                    <>
                     <Link href="/">
              <img
                src="/images/profile.png"
                alt=""
                className={`${styles.headerImage} ${utilStyle.borderCircle}`}
              />
            </Link>
            <h2 className={utilStyle.headingLg}>
              <Link href="/">
                <span className={utilStyle.colorInherit}>{name}</span>
              </Link>
            </h2>
                    </>
                )}
            </header>
            <main>
                {children}
            </main>
            {!home && (
                <div>
                    <Link href="/">← ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;