---
id: publishing
title: Publishing Packages
sidebar_label: Publishing Packages
---

For package management, we are using [Lerna](https://lernajs.io) which can be installed using [npm](https://www.npmjs.com/package/lerna).

Lerna is configured to publish all changes in [packages](../packages) once any changes have passed the pipeline gates as defined in [build/azDevOps/azure](build/azDevOps/azure/). Note that it's then up the consumers of the packages to update their versions as needed.


## Versioning

Lerna version will use the [Conventional Commits Specification](https://conventionalcommits.org/) to [determine the version bump](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump) and generate [CHANGELOG.md files](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli).

## Automatic Versioning, Changelogs, and Tagged Releases

Lerna is embedded as a step in the [monorepo](./monorepo.md) pipeline. Check out the pipeline step [publish-packages-lerna.yml](./build/azDevOps/azure/templates/steps/publish-packages-lerna.yml) for more informatiion on how this is done.

At a high level:

1. changes are detected to the [packages](./packages.md)
2. changes are merged to master
3. this triggers lerna to look for changes
4. verisons are bumped, change logs created, and the commit is tagged as a release in Github
5. the packages are published to the configured registry
