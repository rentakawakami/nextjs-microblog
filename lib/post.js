import path from "path";
import fs from 'node:fs';
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

const postsDirectory =path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す処理
export function getPostData() {
    //ファルダ内になるファイルがオブジェクト配列となって格納
    const fileNames = fs.readdirSync(postsDirectory);
    //一つ一つ取り出す処理
    const allPostsData = fileNames.map((fileName) =>{
        //拡張子は取り除く処理
        const id = fileName.replace(/\.md$/, "");

        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        //fileNameの中身をみる処理
        const fileContents = fs.readFileSync(fullPath, "utf-8");

       const matterResult = matter(fileContents);

       //idとデータを返す処理
       return {
        id,
        ...matterResult.data,
       };
    });
    return allPostsData;
}

//getStaticPathでreturnで使うpathを取得する
export function getAllPostsIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName)  => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

//idに基づいてブログ投稿データを返す
export async function getPostsData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    //投稿のメタデータ部分を解析するためにgray-matterを使う
    const matterResult = matter(fileContent);

    //マークダウンのHTML文字列に変換するためにremarkを使う
    const processedContent = await remark()
    //HTMLに変換
    .use(html)
    //
    .process(matterResult.content);

    const contentHTML = processedContent.toString();

    return {
        id,
        contentHTML,
        ...matterResult.data,
    };
}