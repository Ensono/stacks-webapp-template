import {PrefixedLink as Link} from "components"
import React from "react"

type CoverImageType = {
    title: string
    url: string
    slug?: string
}

export default function CoverImage({title, url, slug}: CoverImageType) {
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
