[![Maintained by Amido](https://img.shields.io/badge/Maintained%20by-Amido-yellow)](https://amido.com/)
[![npm](https://img.shields.io/npm/dt/@amidostacks/scaffolding-cli)](https://www.npmjs.com/package/@amidostacks/scaffolding-cli)

Please read through the [scaffolding-cli](../../docs/cli_process.md) for more
information.

## scaffolding-cli

Builds opinionate boilerplate project types (CSR, SSR, .NET API, Test Frameworks...) with accompanying infrastructure code. All from your CLI.

## Getting Started

We are using npx to execute and create the
[scaffolding-cli](./packages/scaffolding-cli)
[npx](https://www.npmjs.com/package/npx).

We are supporting and running [node@12](https://nodejs.org/en/about/releases/).
Please ensure that your local environment has the correct version
[installed](https://nodejs.org/en/download/).

## Create a SSR webapp from template

Creates an amidostacks template in your local directory much like
express-generate with an addition of `build/, deploy/, docs/, src/` folders as
per the Amido Stacks standards.

There is already a prebuilt version of this up on npm, if you don't wish to
build this locally you only need to execute steps 3, 4, 5 and 6

1. Install dependencies required to generate the templated app:

```bash
$ cd ${YOUR_GIT_STACKS_WEB_APP_PATH}/stacks-webapp-template/packages/scaffolding-cli
$ npm install
$ npm run build
```

2. Watch your build

```bash
$ cd ${YOUR_GIT_STACKS_WEB_APP_PATH}/stacks-webapp-template/packages/scaffolding-cli
$ npm run build:watch
```

3. Change to a directory for testing - e.g. \$HOME and run

```bash
$ cd ${SELECTED_DIR}
# for a local deployment
$ npx ${YOUR_GIT_STACKS_WEB_APP_PATH}/stacks-webapp-template/packages/scaffolding-cli/dist/index.js run -i
# for the npm repo
npx @amidostacks/scaffolding-cli@latest run -i
```

4. Follow the CLI prompts to create a templated app with user defined
   configuration: ssr this is why t - Project Name: _default_: current directory
   (will create a directory with this name)

   - Project Type: _default_: SSR (server side rendering)
   - Platform: _default_: AKS (Azure Kubernetes Service)
   - CI/CD Tooling: _default_: AzureDevOps

5. Navigate to the created project directory to install template dependencies:
   e.g. ${SELECTED_DIR}/$PROJECT_NAME

```bash
$ cd ${SELECTED_DIR}/$PROJECT_NAME/src/
$ npm install
```

6. Build and run the app:

```bash
$ npm run build
$ npm run start
```

Open Browser and hit [http://localhost:3000](http://localhost:3000)

7. To test the deploy folder has been correctly provisioned prior to checking
   you need to at this point in time copy over a sample backend-config and
   terraform vars. Currently vars.tf and provider configuration is not
   automatically updated. Future iterations will include this.

The safest way to run and maintain this going forward is to rely on environment
variables for credentials as that is the way the pipeline will trigger the
executions of terraform.

Sample export script with correct environment vars:

```bash
#WINDOWS: comment out the lines below
$ export ARM_CLIENT_ID= \
ARM_CLIENT_SECRET= \
ARM_SUBSCRIPTION_ID= \
ARM_TENANT_ID=
##########################################################

#WINDOWS: uncomment the following lines and fill in values
# Set-Variable -Name "ARM_CLIENT_ID" -Value ""
# Set-Variable -Name "ARM_CLIENT_SECRET" -Value ""
# Set-Variable -Name "ARM_SUBSCRIPTION_ID" -Value ""
# Set-Variable -Name "ARM_TENANT_ID" -Value ""
##########################################################

$ echo "
vnet_id                 = \"amido-stacks-vnet-uks-dev\"
rg_name                 = \"amido-stacks-rg-uks-dev\"
resource_group_location = \"uksouth\"
name_company            = \"amido\"
name_project            = \"stacks\"
name_component          = \"spa\"
name_environment        = \"dev\"
" > ${YOUR_GIT_STACKS_WEB_APP_PATH}/stacks-webapp-template/deploy/terraform/azure/backend.local.tfvars
```

```bash
$ cd ${YOUR_GIT_STACKS_WEB_APP_PATH}/deploy/terraform/azure
$ terraform init -backend-config=./backend.local.tfvars
$ terraform plan
```

We are using [Jest.js](https://jestjs.io/) for testing including code coverage.

## Versioning and Publishing

For information on how to version and publish changes to this package, please
see [Publishing Packages](../../docs/publishing.md).

## Testing and Debugging

Change the .vscode task and use the example .json (eg.
`ssr.bootstrap-config.json`).

`npx stacks-webapp-template/packages/scaffolding-cli/dist/index.js run -i`

To enhance:

- questions.ts - add project type, value is used to contruct the mapping
- prompt.ts - doesn't need to be touched
- selectors.ts -
- workflow.ts - binding
- selectors.ts
- static.config.json - map of folders and destinations
