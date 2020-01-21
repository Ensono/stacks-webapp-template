# template-cli


## Create app from template

Creates an amido-stacks template in your local directory much like express-generate with an addition of `build/, deploy/, docs/, src/` folders as per the Amido-Stacks standards.

1. Install dependencies required to generate the templated app:
```bash
cd ./packages/template-cli
npm install
```
2. Change to your output directory and run
```bash
npx [DIR]/stacks-webapp-template/packages/template-cli
```

3. Follow the CLI prompts to create a templated app with user defined configuration:
- Project Name: _default_: current directory
- Project Type: _default_: SSR (server side rendering)
- Platform: _default_: AKS (Azure Kubernetes Service)
- CI/CD Tooling: _default_: AzureDevOps

4. Navigate to the created project directory to install template dependencies:
```bash
cd [DIR]/[PROJECT_NAME]/src/client
npm install
```

5. Build and run the app:
```bash
npm run build
npm run start
```
