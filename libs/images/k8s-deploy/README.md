# K8s deployment container

Aims to be an all in one image for any Kubernetes deployment tasks, with additional emphasis on AKS and GKE.

Provides a Kubectl CLI and Kustomize along with the following tools and corresponding versions.

versions:
  - kubectl: 1.15.1
  - kustomize: 3.5.4
  - typescript: 3.7.5
  - dontetcore: 3.1
    - SDK: 3.1
    - aspnet_core_runtime: 3.1
  - GCLoud CLI: 
    - Google Cloud SDK 290.0.1
    - alpha 2020.04.24
    - beta 2020.04.24
    - bq 2.0.56
    - core 2020.04.24
    - gsutil 4.49
    - docker-credential-gcr 2.0.1

USAGE:
---
```bash
docker build -t amidostacks/ci-k8s .
docker push amidostacks/ci-k8s:latest
docker tag f2ce292a1ce9 amidostacks/ci-k8s:0.0.6
docker push amidostacks/ci-k8s:0.0.6
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
