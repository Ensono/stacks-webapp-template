import NextError from "next/error"
import {useRouter} from "next/router"
import {
    getAllPostsWithSlug,
    getPostAndMorePosts,
} from "../../lib/contentful-api"

export default function Post({post, morePosts, preview}) {
    const router = useRouter()
    debugger
    if (!router.isFallback && !post) {
        return <NextError statusCode={404} />
    }

    return <div>Posts here!!</div>
}

export async function getStaticProps({params, preview = false}) {
    const data = await getPostAndMorePosts(params.slug, preview)

    return {
        props: {
            preview,
            post: data?.post ?? null,
            morePosts: data?.morePosts ?? null,
        },
    }
}

export async function getStaticPaths() {
    const allPosts = await getAllPostsWithSlug()
    return {
        paths: allPosts?.map(({slug}) => `/posts/${slug}`) ?? [],
        fallback: true,
    }
}
