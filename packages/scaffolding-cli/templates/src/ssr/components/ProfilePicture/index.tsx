import {Avatar} from "@material-ui/core"
import React from "react"

export const ProfilePicture = ({name, picture, displayName = true}) => {
    return (
        <div>
            <Avatar alt={name} src={picture.url} />
            {displayName && <div>{name}</div>}
        </div>
    )
}
