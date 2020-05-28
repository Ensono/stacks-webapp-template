import {Layout} from "components"
import {BlogLanding} from "components"
import React, {FC, useEffect, useState} from "react"
import {getAllPostsForHome} from "../../lib/contentful-api"
import contentful from "contentful"

// type BlogProps = {
//     preview?: boolean
//     allPosts: contentful.Entry<unknown>
// }
// { preview, allPosts }: BlogProps

function Blog() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function asyncFunction() {
            const allPosts = await getAllPostsForHome(false)
            setPosts({...posts, ...allPosts})
            console.log("------>>>>>>>>>", allPosts)
        }
        asyncFunction()
        return undefined
    }, [])

    // const heroPost = allPosts[0]
    return (
        <Layout>
            <br />
            <br />
            <BlogLanding posts={posts} />
        </Layout>
    )
}

// TODO: Make it serverside render
// export async function getStaticProps({preview = true}) {
//     const allPosts = await getAllPostsForHome(preview)
//     debugger
//     console.log("--------------------------------------->>>>>>>>>", allPosts)
//     return {
//         props: {preview, allPosts},
//     }
// }
export default Blog
