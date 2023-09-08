import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css';
import utilStyles from '@/styles/utils.module.css';
import { getPostData } from "../lib/post";

import Link from 'next/link'
import Layout, { siteTitle } from '@/components/Layout'
const inter = Inter({ subsets: ['latin'] })

//SSG
//外部から一度だけデータを読み込む処理
export async function getStaticProps() {
  const allPostsData = getPostData();
  return {
    props: {
      allPostsData, //これをHomeに渡す
    },
  };
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          エンジニアのお仕事をしています/好きな食べ物はタコライスです。
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>📝メモ</h2>
      <div className={`${styles.grid}`}>
        {allPostsData.map(({ id, title, date, thumbnail }) => (
          <article key={id}>
          <Link href={`/posts/${id}`}>
            <img src={`${thumbnail}`} className={`${styles.thumbnailImage}`} />
          </Link>
          <Link href={`/posts/${id}`}>
            <span className={utilStyles.boldText}>{title}</span>
          </Link>
          <br />
          <small className={utilStyles.lightText}>{date}</small>
        </article>
        ))}
      </div>
      </section>
    </Layout>
  )
}
