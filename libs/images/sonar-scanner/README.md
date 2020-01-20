# Sonar-CLI Build container


DESCRIPTION:
---
Container used for sonar-scanner run analysis during build time within CI.


USAGE:
---

TODO: Interim dockerhub repo will be moved to Amido org eventually.

```bash
docker build . -t amidodevelopment/build-server-stacks-webapp:latest
docker tag $push_id amidodevelopment/build-server-stacks-webapp:latest
docker push amidodevelopment/build-server-stacks-webapp:latest
```


```bash
export SONAR_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx \
export SONAR_PROJECT_KEY=my-app \
export SONAR_ORGANIZATION=my-org
```

```
docker run -e SONAR_HOST_URL=https://sonarcloud.io -e SONAR_TOKEN=$SONAR_TOKEN -e SONAR_PROJECT_KEY=$SONAR_PROJECT_KEY -e SONAR_PROJECT_KEY=$SONAR_PROJECT_KEY -e SONAR_ORGANIZATION=$SONAR_ORGANIZATION -e BUILD_NUMBER=1.2.3 --rm -it -v $(pwd):/usr/src dnitsch/build-server-stacks-webapp:0.0.2
```

NOTES:
---
TODO: flesh this out
