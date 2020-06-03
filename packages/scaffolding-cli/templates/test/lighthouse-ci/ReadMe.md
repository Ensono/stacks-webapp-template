# UI Performance Testing

We are using [lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) to run UI performance testing. Lighthouse-ci (LHCI) is a CLI which wraps around the base [Google Lighthouse CLI](https://github.com/GoogleChrome/lighthouse#using-the-node-cli). The configuration used in LHCI (see below) sets the arguments which are sent to the base Lighthouse CLI.


## Quick Start

1. Open a terminal in `./lighthouse`
2. Run `npm i`
3. Run `npm run lh:collect` to run a Google Lighthouse audit and publish results to `./lighthouseci` (folder will be created if it doesn't already exist)
4. Run `npm run lh:assert` to run assertions against the Google Lighthouse results

## Configuration

There are 3 scripts related to Google Lighthouse which can be found in `./lighthouse/package.json`:
- `lh:collect` - Run tests
- `lh:assert` - Assert results
- `lh:upload` - Upload results to Lighthouse Server

The three scripts all run based on the configuration which can be found in `./lighthouse/config`.
The configuration looks like this example:

```
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

The collect json object defines how the test will be executed and against which URL.
The assert json object defines the assertions the `lh:assert` step will run.

Full details for the configuration file can be found on [lighthouse-ci GitHub page](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md)

## Docker

Build the image from lighthouse-ci root: 
`docker image build -t amidostacks/lhci .`

# Start the container named lhci and start a bash session:

`docker run --name lhci -v "$(pwd)/lhci-data:/opt/lhci/.lighthouseci" --rm -i -t amidostacks/lhci:latest npm run lh:collect && npm run lh:assert`

This will output the collect results to `.lhci-data`, and the assertions to `.lighthouseci`
