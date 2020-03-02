---
id: publishing
title: Publishing Packages
sidebar_label: Publishing Packages
---

For package management, we are using [Lerna](https://lernajs.io) which can be installed using [npm](https://www.npmjs.com/package/lerna).

Lerna is configured to publish all changes in [packages](../packages) once any changes have passed the pipeline gates as defined in [build/azDevOps/azure](build/azDevOps/azure/). Note that it's then up the consumers of the packages to update their versions as needed.


## Versioning

Lerna version will use the [Conventional Commits Specification](https://conventionalcommits.org/) to [determine the version bump](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump) and generate [CHANGELOG.md files](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli).
