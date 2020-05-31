import {format} from "date-fns"
import React from "react"

export default function DateElement({dateString}) {
    return (
        <time dateTime={dateString}>
            {format(new Date(dateString), "YYYY-MM-DD")}
        </time>
    )
}
