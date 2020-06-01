import React from "react"
import getConfig from "next/config"
import Link from "next/link"

const {publicRuntimeConfig} = getConfig()
export const {APP_BASE_PATH} = publicRuntimeConfig

export const PrefixedLink: React.FC<Link["props"]> = ({
    href,
    as = href,
    ...props
}) => <Link href={href} as={`${APP_BASE_PATH}${as}`} {...props} />
