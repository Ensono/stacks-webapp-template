# Sample Node base image

Comes with Typescript so build tasks can happen in the container without referencing typescript as a dependency

versions:
  - node: 12.x
  - typescript: 3.7.5


USAGE:
---


```bash
docker build . -t amidostacks/node
docker tag 9175cc947ecb amidostacks/node:0.0.3
docker tag 7a80ca09ba27 amidostacks/node:latest
docker push amidostacks/node:0.0.3
```


cd $PATH_TO_MY_APP_ROOT
docker run -it --rm -v $(pwd):/opt/app amidostacks/node:0.0.3 /bin/bash
