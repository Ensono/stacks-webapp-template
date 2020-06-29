# Terraform deployment container

Provides a Terraform CLI

versions:
  - terraform: 0.12.28
  - netcore deps:
    - azure-cli              2.2.0
    - command-modules-nspkg  2.0.3
    - core                   2.2.0
    - nspkg                  3.0.4
    - telemetry              1.0.4
    - Python location '/opt/az/bin/python3'
    - Extensions directory '/root/.azure/cliextensions'

  - Python: (Linux) 3.6.5
  - GCC: 8.3.0

USAGE:
---

```bash
docker build -t amidostacks/ci-tf:latest -t amidostacks/ci-tf:0.0.4 .
docker push amidostacks/ci-tf
```

run and test any changes locally
```bash
docker run -v $(pwd):/usr/data --rm -it amidostacks/ci-tf:latest /bin/bash
```
