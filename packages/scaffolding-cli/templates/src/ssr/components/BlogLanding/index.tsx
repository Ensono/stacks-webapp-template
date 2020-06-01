import contentful, {Entry} from "contentful"
import FeaturedPost from "components/FeaturedPost"
import {PostType} from "interfaces/blog.interface"
import MainFeaturedPost from "components/MainFeaturedPost"
import React from "react"

type BlogProps = {
    posts: contentful.Entry<PostType>[]
}

export const BlogLanding = props => {
    const allPosts: PostType[] = props?.posts ? props.posts : []
    // // TODO map the rest of the posts.
    // const nextPost = props?.posts ? props.posts[1] : []
    return (
        <>
            {allPosts &&
                allPosts.map(post => (
                    <MainFeaturedPost
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        author={post.author}
                        slug={post.slug}
                        excerpt={post.excerpt}
                    />
                ))}
            {/* {nextPost && (
                <FeaturedPost
                    title={nextPost.title}
                    coverImage={nextPost.coverImage}
                    date={nextPost.date}
                    author={nextPost.author}
                    slug={nextPost.slug}
                    excerpt={nextPost.excerpt}
                />
            )} */}
        </>
    )
}
