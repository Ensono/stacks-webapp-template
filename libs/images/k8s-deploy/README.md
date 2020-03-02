# K8s deployment container

provides a Kubectl cli  and Kustomize

versions:
  - kubectl: v1.15.1
  - kustomize v3.5.4


USAGE:
---

TODO: Interim dockerhub repo will be moved to Amido org eventually.

```bash
docker build . -t dnitsch/ci-k8s-deploy:0.0.3
docker tag e48cfa4cf4ca dnitsch/ci-k8s-deploy:0.0.3
docker push dnitsch/ci-k8s-deploy:0.0.3
```
