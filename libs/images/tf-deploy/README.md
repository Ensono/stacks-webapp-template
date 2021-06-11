# Terraform deployment container

Provides a Terraform CLI

versions:
 - terraform:      0.13.7
 - az cli          2.22.2
    - core      2.24.2
    - telemetry 1.0.6
 - Python location '/opt/az/bin/python3'
 - Extensions directory '/root/.azure/cliextensions'
 - Python: (Linux) 3.6.10

USAGE:
---

```bash
docker build -t amidostacks/ci-tf:latest -t amidostacks/ci-tf:0.0.8 .
docker push amidostacks/ci-tf
```

run and test any changes locally
```bash
docker run -v $(pwd):/usr/data --rm -it amidostacks/ci-tf:latest /bin/bash
```
