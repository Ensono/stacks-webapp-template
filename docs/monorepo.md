---
id: monorepo
title: Template Monorepo
sidebar_label: Template Monorepo
---

<!-- TODO: change this around -->

## Description

The Amido stacks webapp template is a monorepo managed with
[Lerna](https://lernajs.io/)

At the moment, the project is comprised of:

- [Webapp](`packages/webapp`) - SSR React, Node.js
- [UI_Library](`packages/UILib`) - TBC

## Sample Project Directory Structure:

```
.
├── Dockerfile
├── README.md
├── build
│   └── azDevOps
│       └── azure
├── deploy
│   ├── k8s
│   │   ├── README.md
│   │   └── webapp
│   └── terraform
│       └── azure
├── docker-compose.yml
├── docs
│   ├── browser_support.md
│   ├── ...
├── examples
│   └── README.md
├── lerna.json
├── libs
│   ├── images
│   │   ├── README.md
│   │   ├── build-agent-tfs
│   │   ├── k8s-deploy
│   │   ├── node-base
│   │   ├── sonar-scanner
│   │   └── tf-deploy
│   └── orchestration
│       ├── README.md
│       ├── terraform-azurerm-amido-aks
│       ├── terraform-azurerm-amido-csr
│       └── terraform-azurerm-amido-ssl-app-gateway
├── package-licenses.json
├── package-lock.json
├── package.json
├── packages
│   ├── eslint-config
│   │   ├── CHANGELOG.md
│   │   ├── GETTING_STARTED.md
│   │   ├── LICENSE.md
│   │   ├── README.md
│   │   ├── eslintrc.js
│   │   ├── package-lock.json
│   │   └── package.json
│   ├── template-cli
│   │   ├── CHANGELOG.md
│   │   ├── LICENSE.md
│   │   ├── README.md
│   │   ├── coverage
│   │   ├── jest.config.json
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   ├── templates
│   │   ├── tsconfig.jest.json
│   │   └── tsconfig.json
│   └── tsconfig.json
├── tests
│   ├── sample_generated_app
│   └── utils
├── tsconfig.json
└── website
    ├── README.md
    ├── build
    │   └── stacks-webapp-template-gh-pages
    ├── core
    ├── package-lock.json
    ├── package.json
    ├── pages
    ├── sidebars.json
    ├── siteConfig.js
    └── static
```

## Approach

- _npm_ handles the dependencies.
- _Lerna_ handles tasks that affect multiple package (compile/test/lint all
  modules).
- One folder per package inside _packages/_.
  - any new package should be added within the `packages` directory and follow
    the above structure.
- All packages share the similar structure.
