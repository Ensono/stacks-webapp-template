import styled from "@emotion/styled"
import {Layout} from "components"

const Picture = styled.img`
    border-radius: 50%;
    border: 3px solid white;
    width: 100px;
`

const Profile = ({user: props}) => {
    return (
        <Layout>
            {!props.user && <h2> Please login!</h2>}

            {props.user && (
                <div>
                    <Picture
                        src={props.user.picture}
                        alt={props.user.displayName}
                    />{" "}
                    <h2>Hello, {props.user.displayName}</h2>
                    <p>This is what we know about you:</p>
                    <ul>
                        {Object.keys(props.user).map(key => (
                            <li key={key}>
                                {key}: {props.user[key].toString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Layout>
    )
}

export default Profile
