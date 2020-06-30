import {ProfilePicture} from "../ProfilePicture"
import Date from "../Date"
import {ImgHolder, Image} from "./components"
import React from "react"

export default function PostHeader({title, coverImage, date, author}) {
    return (
        <>
            <br />
            <h1>{title}</h1>
            <div>
                {author && (
                    <ProfilePicture
                        name={author.name}
                        picture={author.picture}
                    />
                )}
                <div>
                    <Date dateString={date} />
                </div>
            </div>
            <ImgHolder>
                <Image title={title} src={coverImage.url} />
            </ImgHolder>
        </>
    )
}
