# JENKINS

versions:
  - jenkins: lts (2.222.x)

USAGE:
---
```bash
docker build -t jenkins-dood .
docker volume create jenkins-vol && \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock -v "$(which docker):/usr/bin/docker" -v jenkins-vol:/var/jenkins_home --name jenkins-dood -p 8080:8080 jenkins-dood
docker start jenkins
```

Note: If you're using Windows with Docker for Windows you'll need to change run command to the following:
```bash
docker run -d -v /var/run/docker.sock:/var/run/docker.sock -v jenkins-vol:/var/jenkins_home --name jenkins-dood -p 8080:8080 jenkins-dood
DOCKER_VERSION="$(docker -v | awk -F ' ' '{print substr($3, 1, length($3)-1)}')"
docker exec -it jenkins-dood /bin/bash -c "wget https://download.docker.com/linux/static/stable/x86_64/docker-$DOCKER_VERSION.tgz && tar -xvzf docker-$DOCKER_VERSION.tgz && ln -s /docker/docker /usr/bin/docker"
```
If you're using GitBash you may need to double up the slash on the Docker socket also: `... -v //var/run/docker.sock:/var/run/docker.sock ...`

If you are running it for the first time
```bash
docker exec -it jenkins-dood /bin/bash -c "cat /var/jenkins_home/secrets/initialAdminPassword"
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
