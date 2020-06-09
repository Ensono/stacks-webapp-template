import {Avatar} from "@material-ui/core"
import React from "react"

export default function ProfilePicture({name, picture}) {
    return (
        <div>
            <Avatar alt={name} src={picture.url} />
            <div>{name}</div>
        </div>
    )
}
