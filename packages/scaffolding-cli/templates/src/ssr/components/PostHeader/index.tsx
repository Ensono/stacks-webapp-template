import Avatar from "../Avatar"
import Date from "../Date"
import {ImgHolder} from "./components"

export default function PostHeader({title, coverImage, date, author}) {
    return (
        <>
            <br />
            <h1>{title}</h1>
            <div>
                {author && (
                    <Avatar name={author.name} picture={author.picture} />
                )}
                <div>
                    <Date dateString={date} />
                </div>
            </div>
            <ImgHolder>
                <img title={title} src={coverImage.url} />
            </ImgHolder>
        </>
    )
}
