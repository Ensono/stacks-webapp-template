import NextError from "next/error"
import {useRouter} from "next/router"
import {
    getAllPostsWithSlug,
    getPostAndMorePosts,
    getLanguages,
} from "../../lib/contentful-api"
import React from "react"
import PostHeader from "components/PostHeader"
import PostBody from "components/PostBody"
import {Layout} from "components"

export default function Post({post}) {
    console.log("POSTTTTTTTT>", post)
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

export async function getStaticProps({params, preview = false}) {
    const data = await getPostAndMorePosts(
        params.all.join("/"),
        preview,
        "en-GB",
    )
    return {
        props: {
            preview,
            post: data?.post ?? null,
            morePosts: data?.morePosts ?? null,
        },
    }
}

export async function getStaticPaths() {
    const allPosts = await getAllPostsWithSlug("en-GB")
    return {
        paths: allPosts?.map(({slug}) => `/posts/${slug}`) ?? [],
        fallback: true,
    }
}
