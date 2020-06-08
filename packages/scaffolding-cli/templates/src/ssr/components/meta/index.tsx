import Head from "next/head"
import theme from "../../config/theme"
import React from "react"

export default function Meta({assetPrefix = ""}) {
    return (
        <Head>
            <meta name="theme-color" content={theme.palette.secondary.main} />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
                key="viewport"
            />
            <link
                rel="icon"
                type="image/x-icon"
                href={`${assetPrefix}/static/icons/favicon.ico`}
            />
            <meta
                property="og:image"
                content={`${assetPrefix}/static/icons/favicon-96x96.png`}
            />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta
                name="msapplication-config"
                content={`${assetPrefix}/static/icons/browserconfig.xml`}
            />
            <link
                rel="manifest"
                href={`${assetPrefix}/static/icons/manifest.json`}
            />
            <meta
                name="description"
                content="Amido stacks prototype project built using NextJS and Node"
            />
        </Head>
    )
}
