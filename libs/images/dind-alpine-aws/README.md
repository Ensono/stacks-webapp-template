# ALPINE DOCKER CONTAINER

Inclues aws cli v2 in alpine container with docker for use in DinD inside CI/CD workflows with AWS ECR as an example


USAGE:
---

Exposed args:
```
```

Overwrite existing args in case you want to fork for custom purposes you could do something like below.
then repeat the steps above to publish the fork into your own Docker repo. 
```bash
docker build -t amidostacks/ci-dind-19-03-12:0.0.1 -t amidostacks/ci-dind-19-03-12:latest .
```

run and test any changes locally
```bash
docker run -v $(pwd):/usr/data --rm -it amidostacks/ci-dind-19-03-12:0.0.1 /bin/sh
```

Creating additional versions
```bash
docker build -t amidostacks/ci-dind-19-03-12:latest -t amidostacks/ci-dind-19-03-12:0.0.1 .
docker push amidostacks/ci-dind-19-03-12
```
