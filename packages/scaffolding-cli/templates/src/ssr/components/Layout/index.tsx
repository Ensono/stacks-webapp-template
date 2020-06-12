import {Header} from "components"
import Meta from "components/meta"
import getConfig from "next/config"
import React from "react"

const layoutStyle = {
    margin: 20,
    padding: 20,
}

export const Layout = props => {
    // Process.env for pre render and getConfig() for SSR
    const assetPrefix =
        (getConfig() &&
            getConfig().publicRuntimeConfig &&
            getConfig().publicRuntimeConfig.APP_BASE_PATH) ||
        process.env.APP_BASE_PATH ||
        ""
    return (
        <>
            <Meta assetPrefix={assetPrefix} />
            <main>
                <div style={layoutStyle}>
                    <Header />
                    {props.children}
                </div>
            </main>
        </>
    )
}
