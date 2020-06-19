import {Typography} from "@material-ui/core"
import MainFeaturedPost from "components/MainFeaturedPost"
import contentful from "contentful"
import {PostType} from "interfaces/blog.interface"
import React from "react"

type BlogProps = {
    posts: contentful.Entry<PostType>[]
}

export const BlogLanding = ({posts}) => {
    return (
        <>
            <Typography component="h2" variant="h5" data-testid="blog_title">
                Yumido Blog
            </Typography>
            <br />
            {posts &&
                posts.map(post => (
                    <MainFeaturedPost
                        key={post.id}
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
