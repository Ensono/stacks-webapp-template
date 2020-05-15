# Infrastructure libs

Holds all the libs used by stacks for insfrastructure bootstrapping and definitions. 

In general it's best to avoid writing bootstrapping modules and prefer Docs sections with clearly described pre-requisites.

### Terraform

Each module should contain an examples folder with at least 1 example on how to use + plus any extra creds step description. 
Especially important for Azure modules

##### Docs

Docs should be descriptive as to what it does and contain an `Inputs`, `Outputs` and `Providers` section. The recommended way to do that is to use this [package](https://github.com/segmentio/terraform-docs)


##### Local testing
run and test any changes locally
```bash
docker run -v $(pwd):/usr/data --rm -it amidostacks/ci-tf:0.0.3 /bin/bash
```
