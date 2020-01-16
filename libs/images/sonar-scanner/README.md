# Sonar-CLI Build container


USAGE:
---

```bash
push_id=$(docker build . -t dnitsch/build-server-stacks-webapp:0.0.2)
docker tag $push_id dnitsch/build-server-stacks-webapp:0.0.2
docker push dnitsch/build-server-stacks-webapp:0.0.2
```


```bash
export SONAR_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx \
export SONAR_PROJECT_KEY=my-app \
export SONAR_ORGANIZATION=my-org
```

```
docker run -e SONAR_HOST_URL=https://sonarcloud.io -e SONAR_TOKEN=$SONAR_TOKEN -e SONAR_PROJECT_KEY=$SONAR_PROJECT_KEY -e SONAR_PROJECT_KEY=$SONAR_PROJECT_KEY -e SONAR_ORGANIZATION=$SONAR_ORGANIZATION -e BUILD_NUMBER=1.2.3 --rm -it -v $(pwd):/usr/src dnitsch/build-sonar-cli:latest
```
