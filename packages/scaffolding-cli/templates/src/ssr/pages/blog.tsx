import {BlogLanding, Layout} from "components"
import contentful from "contentful"
import {PostType} from "interfaces/blog.interface"
import NextError from "next/error"
import React from "react"
import {getAllPostsForHome} from "../lib/contentful-api"

type BlogProps = {
    preview?: boolean
    allPosts: contentful.Entry<PostType>[]
}

const Blog = ({allPosts}: BlogProps) => {
    if (!allPosts) {
        return <NextError statusCode={404} />
    }
    return (
        <Layout>
            <br />
            <br />
            <BlogLanding posts={allPosts} />
        </Layout>
    )
}

export const getStaticProps = async () => {
    const allPosts = await getAllPostsForHome(false)
    return {
        props: {allPosts},
    }
}

export default Blog
