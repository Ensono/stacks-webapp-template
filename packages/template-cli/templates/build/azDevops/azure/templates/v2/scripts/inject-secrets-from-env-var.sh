#!/bin/bash
secretfolderpath=$1

cd $secretfolderpath
echo "Scanning for files in $secretfolderpath"
echo "Found these files:"
ls -lp1

for file in $(find -type f); do

    envVar=$(echo "${file#"./"}" | tr / _);
    eval "tmpval=\"\$$envVar\""

    if [ -z "${tmpval}" ]
    then
      echo "Environment Variable '$envVar' was not defined and is required for $file";
      exit 1;
    else
        echo "Loading environment variable '$envVar' into $file";
        echo -n "${tmpval}" > $file; #set the value
    fi;
done;

exit 0;
