import NextError from "next/error"
import {useRouter} from "next/router"
import {getAllPostsWithSlug, getPost} from "../../lib/contentful-api"
import React from "react"
import PostHeader from "components/PostHeader"
import PostBody from "components/PostBody"
import {Layout} from "components"

export default function Post({post}) {
    const router = useRouter()
    if (!router.isFallback && !post) {
        return <NextError statusCode={404} />
    }

    return (
        <Layout>
            {router.isFallback ? (
                <p>Loading...</p>
            ) : (
                <>
                    <PostHeader
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        author={post.author}
                    />
                    <PostBody content={post.content} />
                </>
            )}
        </Layout>
    )
}

export async function getStaticProps({params}) {
    const data = await getPost(
        params.all.join("/"),
        params.all.length > 1 ? params.all[0] : "en-GB",
    )
    return {
        props: {
            preview: false,
            post: data?.post ?? null,
        },
    }
}

export async function getStaticPaths() {
    const allPosts = await getAllPostsWithSlug()
    const allPostsWithLang = allPosts.map(post => Object.values(post)).flat()
    return {
        paths: allPostsWithLang?.map(slug => {
            return `/posts/${slug}` ?? []
        }),
        fallback: true,
    }
}
