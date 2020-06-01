import {Layout} from "components"
import {BlogLanding} from "components"
import React, {FC, useEffect, useState} from "react"
import {getAllPostsForHome} from "../lib/contentful-api"
import contentful from "contentful"
import {wrapper} from "../state-management"

type BlogProps = {
    preview?: boolean
    allPosts: contentful.Entry<unknown>
}

const Blog = ({allPosts}: BlogProps) => {
    return (
        <Layout>
            <br />
            <br />
            <BlogLanding posts={allPosts} />
        </Layout>
    )
}
// export async function getStaticProps({preview = true}) {
export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
    const allPosts = await getAllPostsForHome(true)
    debugger
    return {
        props: {allPosts},
    }
})

export default Blog
