# Sonar-CLI Build container


DESCRIPTION:
---
Container used for sonar-scanner run analysis during build time within CI.

versions:
  - sonar-scanner: 4.8
  - dontetcore: 3.1
    - SDK: 3.1
    - aspnet_core_runtime: 3.1


USAGE:
---

```bash
docker build -t amidostacks/ci-sonarscanner .
docker tag 0b66b4984661 amidostacks/ci-sonarscanner:0.0.2
docker push amidostacks/ci-sonarscanner:latest
docker push amidostacks/ci-sonarscanner:0.0.2
```

```bash
export SONAR_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx \
export SONAR_PROJECT_KEY=my-app \
export SONAR_ORGANIZATION=my-org
```

Run with sonar scanner for python nodejs ruby projects
```
docker run -e SONAR_HOST_URL=https://sonarcloud.io -e SONAR_TOKEN=$SONAR_TOKEN -e SONAR_PROJECT_KEY=$SONAR_PROJECT_KEY -e \
SONAR_ORGANIZATION=$SONAR_ORGANIZATION -e BUILD_NUMBER=1.2.3 --rm -it -v $(pwd):/usr/src amidostacks/ci-sonarscanner:latest
```

Run with dotnet projects. example at a solution level
```bash 
cd $GITHUB_AMIDO_STACKS_DOTNET/src/api
docker run -v $(pwd):/usr/api --rm -it amidostacks/ci-sonarscanner:latest /bin/bash
dotnet sonarscanner begin /k:"dotnet-api" /d:sonar.host.url=https://sonarcloud.io /d:sonar.login=my_token /d:sonar.cs.opencover.reportsPaths="**/coverage.opencover.xml" /o:"my_org"
dotnet clean
dotnet restore
dotnet build
dotnet test
dotnet sonarscanner end /d:sonar.login=my_token
```


Overwrite existing args in case you want to fork for custom purposes you could do something like below.
then repeat the steps above to publish the fork into your own Docker repo. 
```bash
docker build -t amidostacks/ci-sonarscanner:my-custom-version --build-arg DOTNET_SONARSCANNER_VERSION=3.8.3 --build-arg DOTNET_CORE_VERSION=2.2 .
```

NOTES:
---
TODO: flesh this out
