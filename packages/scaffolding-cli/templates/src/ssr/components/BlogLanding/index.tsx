import contentful, {Entry} from "contentful"
import FeaturedPost from "components/FeaturedPost"
import {PostType} from "interfaces/blog.interface"
import MainFeaturedPost from "components/MainFeaturedPost"
import React from "react"
import {Typography} from "@material-ui/core"

type BlogProps = {
    posts: contentful.Entry<PostType>[]
}

export const BlogLanding = props => {
    const allPosts: PostType[] = props?.posts ? props.posts : []
    //TODO map the rest of the posts.
    return (
        <>
            <Typography component="h2" variant="h5" data-testid="blog_title">
                Yumido Blog
            </Typography>
            <br />
            {allPosts &&
                allPosts.map((post, idx) => (
                    <MainFeaturedPost
                        key={idx}
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        author={post.author}
                        slug={post.slug}
                        excerpt={post.excerpt}
                    />
                ))}
        </>
    )
}
