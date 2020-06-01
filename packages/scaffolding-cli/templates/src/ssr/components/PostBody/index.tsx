import {documentToReactComponents} from "@contentful/rich-text-react-renderer"

export default function PostBody({content}) {
    return (
        <div>
            <div>{documentToReactComponents(content)}</div>
        </div>
    )
}
