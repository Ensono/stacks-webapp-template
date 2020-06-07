import {Header} from "components"
import Meta from "components/meta"
import getConfig from "next/config"
import React from "react"

const layoutStyle = {
    margin: 20,
    padding: 20,
}

export const Layout = props => {
    console.log(
        "Layout:",
        getConfig() &&
            getConfig().publicRuntimeConfig &&
            getConfig().publicRuntimeConfig.APP_BASE_PATH,
    )
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
