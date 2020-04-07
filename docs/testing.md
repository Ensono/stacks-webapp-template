---
id: testing
title: Testing and Quality
sidebar_label: Testing and Quality 
---

## Overview

Tests where possible will be written and delivered as part of the same branch and feature. Where this is not possible, in the event of using a standalone repo or the alternative, we expect the same development and code reviews standards to be upheld, and the branch naming to be aligned with the development branch name as possible.

### Pre-commit Tests

To be run on the local active develop branch, before commit. Before committing changes, we suggest enforcing and running pre-commit tests with a pre-commit hook.

### Pre-deployment Tests

To be run on the active development branch.
After which, we have two different processes, one for pre-deployment tests (unit, snapshot, integration), and another for post-deployment (functional tests).  Pre-deployment tests can run on the fly whilst coding. This is enabled by using a ‘watch-mode’ which will check for code changes, compile/trans-compile, and run the tests against the webapp.

### Post-deployment Tests

To be run on master once the pull request (PR) has been approved and passed all pre-deployment tests.


## Quality Gates

The following demonstrates the series of quality gates that the webapp must pass through in order to successfully be deployed to a user facing environment (production).

![alt text](https://www.lucidchart.com/publicSegments/view/2094f5d4-eaca-417c-a51e-36bf79853373/image.png "Quality Gates")
