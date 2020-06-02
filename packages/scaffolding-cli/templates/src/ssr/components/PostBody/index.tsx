import {documentToReactComponents} from "@contentful/rich-text-react-renderer"
import React from "react"

export default function PostBody({content}) {
    return (
        <div>
            <div>{documentToReactComponents(content)}</div>
        </div>
    )
}
