import {Header} from "components"
import React from "react"
import Meta from "components/meta"

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: "1px solid #DDD",
}

export const Layout = props => {
    return (
        <>
            <Meta />
            <div style={layoutStyle}>
                {<Header />}
                {props.children}
            </div>
        </>
    )
}
