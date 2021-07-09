# Sample Node base image

Comes with Typescript so build tasks can happen in the container without referencing typescript as a dependency

versions:
  - node: 14.x
  - typescript: 3.7.5


USAGE:
---


```bash
docker build . -t amidostacks/node-14
docker tag 9175cc947ecb amidostacks/node-14:0.0.1
docker tag 7a80ca09ba27 amidostacks/node-14:latest
docker push amidostacks/node-14:0.0.1
```

cd $PATH_TO_MY_APP_ROOT
docker run -it --rm -v $(pwd):/opt/app amidostacks/node-14:0.0.1 /bin/bash
