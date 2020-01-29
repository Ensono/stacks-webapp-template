# template-cli


## Create app from template

Creates an amido-stacks template in your local directory much like express-generate with an addition of `build/, deploy/, docs/, src/` folders as per the Amido-Stacks standards.

1. Install dependencies required to generate the templated app:
```bash
cd ${YOUR_GIT_STACKS_WEB_APP_PATH}/stacks-webapp-template/packages/template-cli
npm install
npm run build
```

2. Change to a directory for testing - e.g. $HOME and run
```bash
cd ${SELECTED_DIR}
npx ${YOUR_GIT_STACKS_WEB_APP_PATH}/stacks-webapp-template/packages/template-cli
```

3. Follow the CLI prompts to create a templated app with user defined configuration:
- Project Name: _default_: current directory (will create a directory with this name)
- Project Type: _default_: SSR (server side rendering)
- Platform: _default_: AKS (Azure Kubernetes Service)
- CI/CD Tooling: _default_: AzureDevOps

4. Navigate to the created project directory to install template dependencies:
e.g. ${SELECTED_DIR}/$PROJECT_NAME
```bash
cd ${SELECTED_DIR}/$PROJECT_NAME/src/ssr
npm install
```

5. Build and run the app:
```bash
npm run build
npm run start
```

Open Browser and hit [http://localhost:3000](http://localhost:3000)

6. to test the deploy fodler has been correctly provisioned
prior to checking you need to at this point in time copy over a sample backend-config and terraform vars. currently vars.tf and provider configuration is not automatically updated.

future iterations will include this.

The safest way to run and maintain this going forward is to rely on environment variables for credentials as that is the way the pipeline will trigger the executions of terraform. 

sample export script with correct environment vars:

```bash
export ARM_CLIENT_ID=xxxxxxxx \
ARM_CLIENT_SECRET=xxxxxxxxxx \
ARM_SUBSCRIPTION_ID=xxxxxxx \
ARM_TENANT_ID=xxxxxx
```

```
cd ${SELECTED_DIR}/deploy/azure/terraform
t12i -backend-config=./backend.local.tfvars
t12p
```

NB: as the module currently points to a private github repo you will need to supply credentials on the command line as part of the plan/apply
