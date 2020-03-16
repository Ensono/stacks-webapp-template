# Getting Started

Ensure that [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) are installed with the versions specified in root [package.json](../../package.json).

## Deprecated

_This is temporary documentation on how to pull and publish arifacts with Azure DevOps before we publish and open source them to our npm registry._

<!-- 
## Permissions

Please ensure you have been added to the 
`[Amido-Stacks]\Stacks Maintainers` project team in [Azure DevOps](https://dev.azure.com/amido-dev/Amido-Stacks). Stacks Maintainers have access to all Stacks artifacts.

[@amidostacks/eslint-config@latest](https://dev.azure.com/amido-dev/Amido-Stacks/_packaging?_a=package&feed=stacks-webapp-feed&package=%40amido-stacks%2Feslint-config&protocolType=Npm)


## Instructions

1. Create a .npmrc file in your ROOT: `touch $HOME/.npmrc`
2. Generate a [personal access token](https://amido-dev.visualstudio.com/_details/security/tokens) with *Packaging* read & write scopes.
3. Base64 encode the personal access token from 2. One safe and secure method of Base64 encoding a string is to:
  1. From a command/shell prompt run: `echo -n "PERSONAL_ACCESS_TOKEN" | base64`
  2. Paste your personal access token value and hit Enter/Return
  3. Copy the Base64 encoded value
4. Copy the code below to the created .npmrc file from 1:
  ```
  ; begin auth token
  //pkgs.dev.azure.com/amido-dev/Amido-Stacks/_packaging/stacks-webapp-feed/npm/registry/:username=amido-dev
  //pkgs.dev.azure.com/amido-dev/Amido-Stacks/_packaging/stacks-webapp-feed/npm/registry/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN]
  //pkgs.dev.azure.com/amido-dev/Amido-Stacks/_packaging/stacks-webapp-feed/npm/registry/:email=npm requires email to be set but doesn't use the value
  //pkgs.dev.azure.com/amido-dev/Amido-Stacks/_packaging/stacks-webapp-feed/npm/:username=amido-dev
  //pkgs.dev.azure.com/amido-dev/Amido-Stacks/_packaging/stacks-webapp-feed/npm/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN]
  //pkgs.dev.azure.com/amido-dev/Amido-Stacks/_packaging/stacks-webapp-feed/npm/:email=npm requires email to be set but doesn't use the value
  ; end auth token
  ```
  Replace both [BASE64_ENCODED_PERSONAL_ACCESS_TOKEN] values in your user .npmrc file with your Base64 encoded personal access token from Step 3.
5. Check you can download the dependencies with npm install from the package directory (where .npmrc file is located).


## Help! It's still not working.
If the following error occurs when trying `npm install`:

```shell
npm ERR! code E401npm ERR! Unable to authenticate, need: Bearer authorization_uri=https://login.windows.net/f88c76e1-2e79-4cd5-8b37-842f3f870d58, Basic realm="https://pkgsprodsu3weu.app.pkgs.visualstudio.com/", TFS-Federated
```

Please regenerate your Personal Access Token at https://amido-dev.visualstudio.com/_usersSettings/tokens, encrypt it, and try once more.

If you continue to get errors when attempting to install, please check your permissions in Azure DevOps.
-->
