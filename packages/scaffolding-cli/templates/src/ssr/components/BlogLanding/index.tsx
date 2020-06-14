import contentful, {Entry} from "contentful"
import FeaturedPost from "components/FeaturedPost"
import {PostType} from "interfaces/blog.interface"
import MainFeaturedPost from "components/MainFeaturedPost"
import React from "react"
import {Typography} from "@material-ui/core"

type BlogProps = {
    posts: contentful.Entry<PostType>[]
}

export const BlogLanding = ({posts}) => {
    const allPosts: PostType[] = posts ? posts : []
    return (
        <>
            <Typography component="h2" variant="h5" data-testid="blog_title">
                Yumido Blog
            </Typography>
            <br />
            {allPosts &&
                allPosts.map(post => (
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
