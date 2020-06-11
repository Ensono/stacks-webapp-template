# Boilerplate exampple: Jest with Typescript and SonarQube

Please refer to the in depth information at:

https://amido.github.io/stacks/docs/testing_static

## Getting started

`npm install`

## Run test with code coverage

`npm run test`

## Running SonarScanner

The following environment variables need to be set:

```bash
export SONAR_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx \
export SONAR_PROJECT_KEY=my-app \
export SONAR_ORGANIZATION=my-org
```

For more information on the image, see the image README for [sonar-scanner](../../../../../libs/images/sonar-scanner/README.md)

To run sonar scanner:
```
docker run -e SONAR_HOST_URL=https://sonarcloud.io -e SONAR_TOKEN=$SONAR_TOKEN -e SONAR_PROJECT_KEY=$SONAR_PROJECT_KEY -e \
SONAR_ORGANIZATION=$SONAR_ORGANIZATION -e BUILD_NUMBER=1.2.3 --rm -it -v $(pwd):/usr/src amidostacks/ci-sonarscanner:latest
```
