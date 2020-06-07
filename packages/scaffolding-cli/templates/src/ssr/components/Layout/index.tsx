import {Header} from "components"
import React from "react"
import Meta from "components/Meta"

const layoutStyle = {
    margin: 20,
    padding: 20,
}

export const Layout = props => {
    return (
        <>
            <Meta assetPrefix={props.assetPrefix} />
            <main>
                <div style={layoutStyle}>
                    <Header />
                    {props.children}
                </div>
            </main>
        </>
    )
}
