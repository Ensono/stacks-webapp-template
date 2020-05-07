# JENKINS 





versions:
  - jenkins: lts (2.222.x)

USAGE:
---
```bash
docker build -t local-jenkins .
docker volume create jenkins-local-vol && \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker -v jenkins-local-vol:/var/jenkins_home --name local-jenkins -p 8080:8080 local-jenkins:latest
docker start jenkins
```

docker run -d -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker --name local-jenkins -p 8080:8080 local-jenkins:latest
docker start jenkins

If you are running it for the first time
```bash
docker exec -it local-jenkins /bin/bash
jenkins$: cat /var/jenkins_home/secrets/initialAdminPassword
```

Exposed args:
```
ARG KUBECTL_VERSION=1.15.1
ARG KUSTOMIZE_VERSION=3.5.4
ARG TYPESCRIPT_VERSION=3.7.5
ARG DOTNET_CORE_VERSION=3.1
```

Overwrite existing args in case you want to fork for custom purposes you could do something like below.
then repeat the steps above to publish the fork into your own Docker repo. 
```bash
docker build -t amidostacks/ci-k8s:my-custom-version --build-arg TYPESCRIPT_VERSION=3.8.3 --build-arg KUBECTL_VERSION=1.17.1 .
```
