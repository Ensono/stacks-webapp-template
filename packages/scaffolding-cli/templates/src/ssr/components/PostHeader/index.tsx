import Avatar from "../Avatar"
import Date from "../Date"
import CoverImage from "../CoverImage"
import React from "react"

export default function PostHeader({title, coverImage, date, author}) {
    return (
        <>
            <h1>{title}</h1>
            <div>
                {author && (
                    <Avatar name={author.name} picture={author.picture} />
                )}
            </div>
            <div>
                <CoverImage title={title} url={coverImage.url} slug={""} />
            </div>
            <div>
                <div>
                    {author && (
                        <Avatar name={author.name} picture={author.picture} />
                    )}
                </div>
                <div>
                    <Date dateString={date} />
                </div>
            </div>
        </>
    )
}
