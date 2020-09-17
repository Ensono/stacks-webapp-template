#!/usr/bin/env node

// Node version check
const checkNodeVersion = (version: number) => {
    const versionRegex = new RegExp(`^${version}\\..*`)
    const versionCorrect = process.versions.node.match(versionRegex)
    if (!versionCorrect) {
        throw Error(
            `This version is too old. Please upgrade the node runtime to version ${version}`
        )
    }
};

checkNodeVersion(12)

import('./cli')
