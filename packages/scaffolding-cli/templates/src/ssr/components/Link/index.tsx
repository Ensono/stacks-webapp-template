import Link from "next/link"
import React from "react"
import getConfig from "next/config"

export const PrefixedLink: React.FC<Link["props"]> = ({
    href,
    as = href,
    ...props
}) => (
    <Link
        href={href}
        as={`${
            process.env.APP_BASE_PATH
                ? process.env.APP_BASE_PATH
                : getConfig().publicRuntimeConfig.APP_BASE_PATH
        }${as}`}
        {...props}
    />
)
