# K8s deployment container

provides a Kubectl cli  and Kustomize

versions:
  - kubectl: v1.15.1
  - kustomize v3.5.4


USAGE:
---

```bash
docker build . -t amidostacks/ci-tf:latest
docker tag 11e4b30db926 amidostacks/ci-tf:latest
docker push amidostacks/ci-tf:latest
```
