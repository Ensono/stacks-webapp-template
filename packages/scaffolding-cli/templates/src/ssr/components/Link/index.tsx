import Link from "next/link"
import React from "react"
import conf from "../../environment-configuration"

export const PrefixedLink: React.FC<Link["props"]> = ({
    href,
    as = href,
    ...props
}) => {
    return (
        <Link
            href={`${
                process.env.APP_BASE_PATH
                    ? process.env.APP_BASE_PATH
                    : conf.APP_BASE_PATH
            }${href}`}
            as={`${
                process.env.APP_BASE_PATH
                    ? process.env.APP_BASE_PATH
                    : conf.APP_BASE_PATH
            }${as}`}
            {...props}
        />
    )
}
