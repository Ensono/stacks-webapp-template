# Sample Node test base image

Comes with [.NET Core SDK](https://hub.docker.com/_/microsoft-dotnet-core-sdk/) and a ChromeDriver so test tasks can happen in the container without browser dependencies.

Versions:

- .NET Core: limited to 2.1 and 3.1
- Chrome: latest LTV (stable)

## Usage

For more example implementation and usage information, see [xxAMIDOxx.xxSTACKSxx.E2E.Selenium/README.md](../../../packages/scaffolding-cli/templates/test/xxAMIDOxx.xxSTACKSxx.E2E.Selenium/README.md)

### Amido Stacks maintainers

If you need to make changes to the image and publish to the [Amido Stacks Docker Hub Organisation](https://hub.docker.com/u/amidostacks):

```bash
docker build -t amidostacks/dotnet-test-base:0.0.2 . \
docker push amidostacks/dotnet-test-base:0.0.2 \
docker push amidostacks/dotnet-test-base:latest
```

### Private use

Push with your own USERNAME and TAG:

```bash
docker build -t USERNAME/TAG . \
docker tag USERNAME/TAG \
docker push USERNAME/TAG:latest
```

### Local

1. Build the image or, pull the latest from [amidostacks/node](https://hub.docker.com/r/amidostacks/node-14).
  `docker build -t amidostacks/dotnet-test-base:latest .`

2. Launch container interactive with bash: `docker run --rm -it -v $(pwd)/.:/src/ amidostacks/dotnet-test-base:latest /bin/bash`
