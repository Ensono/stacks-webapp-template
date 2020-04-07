# Examples folder


### Cli 

To Generate an app with a preconfigured JSON config you can use npx cli like so:

sample myconfig.json

```JSON
{
  "project_name": "test-app-1",
  "project_type": "ssr",
  "platform": "aks",
  "deployment": "azdevops"
}
```

```bash
npx @amidostacks/scaffolding-cli@latest run -c myconfig.json
```

the location of the config file should either absolute or relative to where you are running the cli from

USAGE:
---
