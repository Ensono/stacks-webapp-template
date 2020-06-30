import styled from "@emotion/styled"
import {Layout} from "components"
import React from "react"
import {Link} from "@material-ui/core"

const Picture = styled.img`
    border-radius: 50%;
    border: 3px solid white;
    width: 100px;
`

const Profile = props => {
    return (
        <Layout>
            <br />
            <br />
            {!props.user && (
                <h2>
                    {" "}
                    Please login <Link href="/login">here</Link>
                </h2>
            )}
            {props.user && (
                <div>
                    <Picture
                        src={props.user.picture}
                        alt={props.user.displayName}
                    />{" "}
                    <h2>Hello, {props.user.displayName}</h2>
                    <p>This is what we know about you:</p>
                    {
                        <div>
                            <pre>{JSON.stringify(props.user, null, 2)}</pre>
                        </div>
                    }
                </div>
            )}
        </Layout>
    )
}

export default Profile
