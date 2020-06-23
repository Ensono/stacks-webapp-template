# UI Performance Testing

We are using [lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) to run UI performance testing. Lighthouse-ci (LHCI) is a CLI which wraps around the base [Google Lighthouse CLI](https://github.com/GoogleChrome/lighthouse#using-the-node-cli). The configuration used in LHCI (see below) sets the arguments which are sent to the base Lighthouse CLI.

## Quick Start

Requires [Docker](https://www.docker.com/get-started).

## Running Lighthouse with Docker

The image uses the [amidostacks/node](https://hub.docker.com/r/amidostacks/node) base image.

### From pipeline

The docker image is open and found at [amidostacks/lhci](https://hub.docker.com/r/amidostacks/lhci).

* Azure Devops: Use the template step to run [test-profiling-lighthouse.yml](https://github.com/amido/stacks-pipeline-templates/blob/feature/cycle2/azDevOps/azure/templates/v2/steps/test-profiling-lighthouse.yml)

* Other: use the container from the correct working directory, and invoke : `lhci collect --config=exmaple.json`

### Local

1. Build the image or, pull the latest from [amidostacks/node](https://hub.docker.com/r/amidostacks/node).
  `docker image build -t amidostacks/lhci .`

2. Run the container named lhci and pass through the lhci config:
  `docker run --name lhci -v "$(pwd)/lighthouserc.json:/opt/lhci/lighthouserc.json" -v "$(pwd)/results:/opt/lhci/.lighthouseci" --rm -i -t amidostacks/lhci:latest lhci collect --config=lighthouserc.json`

3. Run the container named lhci and pass through a URL:
  `docker run --name lhci -v "$(pwd)/lighthouserc.json:/opt/lhci/lighthouserc.json" -v "$(pwd)/results:/opt/lhci/.lighthouseci" --rm -i -t amidostacks/lhci:latest lhci collect --url=https://google.com`

4. This will output the collect results in both html and json foramt to [/results](./results), and the assertions to `.lighthouseci`
  
5. To assert on the results against specified baseline of acceptable standards:
  `docker run --name lhci -v "$(pwd)/lighthouserc.json:/opt/lhci/lighthouserc.json" -v "$(pwd)/results:/opt/lhci/.lighthouseci" --rm -i -t amidostacks/lhci:latest lhci assert --config=lighthouserc.json`

## Lighthouse CI

We are using the [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci#readme) for collecting Lighthouse reports. For more information on Lighthouse, see `https://developers.google.com/web/tools/lighthouse/`.

The config related to Google Lighthouse can be found in [./lighthouserc.json](./lighthouserc.json). This includes a template for:

- `lhci collect` - the [collect](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md#collect) JSON object defines how the test will be executed and against which URL. These can be overriden by using the CLI directly, e.g. `lhci collect --url=https://google.com`
- `lhci assert` - the [assert](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md#assertions) JSON object defines the assertions the `lh:assert` step will run.

The configuration looks like this example:

```json
{
  "ci": {
    "collect": {
      "chromePath": false,
      "numberOfRuns": 3,
      "url": "http://sandbox.euw.deploy.systems.next/footer",
      "settings": {
        "extraHeaders": "{\"x-next-realm\": \"Next\",  \"x-next-territory\": \"GB\", \"x-next-language\": \"en\"}"
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }]
          }
      }
  }
}
```

### More on Lighthouse

Useful [documentation, examples, and recipes](https://github.com/GoogleChrome/lighthouse#docs--recipes) to get you started.

This includes reference on how to test a site with authentication.
