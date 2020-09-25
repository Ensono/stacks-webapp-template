#!/usr/bin/env node

// Node version check
const checkNodeVersion = (version: number) => {
    const versionRegex = new RegExp(/^(\d+)\..*/)
    const versionCheck = process.versions.node.match(versionRegex)

    if (versionCheck === null) {
        throw Error(
            `Can't detect the node version!`
        )
    }

    if (parseInt(versionCheck[1]) < version) {
        throw Error(
            `Your node version is too old. Please upgrade the node runtime to version ${version}`
        )
    }
};

checkNodeVersion(12)

import('./cli')
