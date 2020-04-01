# Terraform deployment container

Provides a Terraform CLI

versions:
  - terraform: 0.12.24

USAGE:
---

```bash
docker build -t amidostacks/ci-tf:latest .
docker push amidostacks/ci-tf:latest
docker tag e5e317e45bc2 amidostacks/ci-tf:0.0.2
docker push amidostacks/ci-tf:0.0.2
```
