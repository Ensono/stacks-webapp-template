# Terraform and K8s deploy container

Provides a Terraform CLI and K8s cli in alpine container with other utils

versions:
  - terraform: 1.0.2
  - aws-cli: 2.x.x
  - python: 3.7
  - kubectl: 1.18.9

USAGE:
---

```bash
docker build -t amidostacks/ci-k8s-tf-aws:latest -t amidostacks/ci-k8s-tf-aws:0.0.2 .
docker push amidostacks/ci-k8s-tf-aws
```

run and test any changes locally
```bash
docker run -v $(pwd):/usr/data --rm -it amidostacks/ci-k8s-tf-aws:latest /bin/bash
```
