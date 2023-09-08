import Layout from "@/components/Layout";
import { getAllPostsIds, getPostData } from "@/lib/post";
import utilstyles from "@/styles/utils.module.css";
import Head from "next/head";
// import Date from "@/components/date";

export async function getStaticPaths() {
    const paths = getAllPostsIds();

    return {
        paths, //どのパスが事前にレンダリングされるのか決める
        fallback: false, //あとで説明。(falseにすると、上のpathsに含まれていないあらゆるパスはアクセスすると404ページになる)
    };
}
//ブログ記事のデータを持ってくる
export async function getStaticProps({ params }) {
    const postData = getPostData(params.id);
    console.log(postData);
    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilstyles.headingX1}>{postData.title}</h1>
                <div className={utilstyles.lightText}>
                    {postData.date}
                </div>
            <div dangerouslySetInnerHTML={{__html: postData.contentHTML}} />
            </article>
        </Layout>
    );
}