import {BlogLanding, Layout} from "components"
import contentful from "contentful"
import NextError from "next/error"
import React from "react"
import {getAllPostsForHome} from "../lib/contentful-api"
import {wrapper} from "../state-management"
import {PostType} from "interfaces/blog.interface"

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

export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
    const allPosts = await getAllPostsForHome(true)
    debugger
    return {
        props: {allPosts},
    }
})

export default Blog
