import {PrefixedLink as Link} from "components"
export default function CoverImage({title, url, slug}) {
    const image = <img src={url} alt={`Cover Image for ${title}`} />
    return (
        <div>
            {slug ? (
                <Link as={`/posts/${slug}`} href="/posts/[slug]">
                    <a aria-label={title}>{image}</a>
                </Link>
            ) : (
                image
            )}
        </div>
    )
}
