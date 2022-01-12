# Sample Node base image

Comes with Typescript so build tasks can happen in the container without referencing typescript as a dependency

versions:
  - node: 16.x
  - typescript: 4.5.4


USAGE:
---


```bash
docker build . -t amidostacks/node-16 -t amidostacks/node-16:latest -t amidostacks/node-16:0.0.1
docker push amidostacks/node-16:latest
docker push amidostacks/node-16:0.0.1
```

cd $PATH_TO_MY_APP_ROOT
docker run -it --rm -v $(pwd):/opt/app amidostacks/node-16:0.0.1 /bin/bash


How to test fo
