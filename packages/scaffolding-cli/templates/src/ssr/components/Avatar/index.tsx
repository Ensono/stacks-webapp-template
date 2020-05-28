import {Avatar} from "@material-ui/core"

export default function ProfilePicture({name, picture}) {
    return (
        <div>
            <Avatar alt={name} src={picture.url} />
            <div>{name}</div>
        </div>
    )
}
