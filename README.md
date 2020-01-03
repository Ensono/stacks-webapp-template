# stacks-webapp-template

## To build and run using Docker

In order to be able to build and run the webapp template, across environments and as part of CI, we need to use [Docker](https://docs.docker.com/install/).

```bash
# build
docker build -t stacks-app .
# or, use multi-stage builds to build a smaller docker image
docker build -t stacks-app -f ./Dockerfile.multistage .
```

Run it:

```bash
docker run --rm -it -p 3000:3000 stacks-app
```
