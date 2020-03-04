# K8s deployment container

provides a Kubectl cli  and Kustomize

versions:
  - kubectl: v1.15.1
  - kustomize v3.5.4


USAGE:
---


```bash
docker build . -t amidostacks/ci-k8s
docker tag e48cfa4cf4ca amidostacks/ci-k8s:0.0.1
docker tag e48cfa4cf4ca amidostacks/ci-k8s:latest
docker push amidostacks/ci-k8s:0.0.1
```
