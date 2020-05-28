import contentful, {Entry} from "contentful"
import FeaturedPost from "components/FeaturedPost"
import {PostType} from "interfaces/blog.interface"
import MainFeaturedPost from "components/MainFeaturedPost"

type BlogProps = {
    posts: contentful.Entry<PostType>[]
}

export const BlogLanding = props => {
    const heroPost: PostType = props?.posts ? props.posts[0] : []
    // TODO map the rest of the posts.
    const nextPost = props?.posts ? props.posts[1] : []
    return (
        <>
            {heroPost && (
                <MainFeaturedPost
                    title={heroPost.title}
                    coverImage={heroPost.coverImage}
                    date={heroPost.date}
                    author={heroPost.author}
                    slug={heroPost.slug}
                    excerpt={heroPost.excerpt}
                />
            )}
            {nextPost && (
                <FeaturedPost
                    title={nextPost.title}
                    coverImage={nextPost.coverImage}
                    date={nextPost.date}
                    author={nextPost.author}
                    slug={nextPost.slug}
                    excerpt={nextPost.excerpt}
                />
            )}
        </>
    )
}
