# Sample Node test base image

Comes with Typescript and Lighthouse CI so build tasks can happen in the container without install dependencies.

Versions:

- node: 14.x
- typescript: 3.7.5
- lhci:0.4.1

## Usage

For more implementation usage information, see [lighthouse-ci/README.md](../../../packages/scaffolding-cli/templates/test/lighthouse-ci/README.md)

### Amido Stacks maintainers

If you need to make changes to the image and publish to the [Amido Stacks Docker Hub Organisation](https://hub.docker.com/u/amidostacks):

```bash
docker build -t amidostacks/node-14-lhci:0.0.4 . \
docker tag amidostakcs/node-14-lhci:0.0.4 node-14-lhci:0.0.4\
docker push amidostacks/node-14-lhci:0.0.4
docker push amidostacks/node-14-lhci:latest
```

### Private use

Push with your own USERNAME

```bash
docker build -t USERNAME/node-14-lhci:latest. \
docker tag USERNAME/node-14-lhci:latest amidostacks/node-14-lhci:latest \
docker push USERNAME/node-14-lhci:latest
```

### Local

1. Build the image or, pull the latest from [amidostacks/node](https://hub.docker.com/r/amidostacks/node-14).
  `docker image build -t amidostacks/node-14-lhci .`

2. Launch container interactive with bash: `docker run --rm -it amidostacks/node-14-lhci:latest /bin/bash`
