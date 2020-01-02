# stacks-webapp-template

Build it with docker:

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
