#!/bin/bash
# arg1=templat-in.yml
# arg2=templat-out.yml
base_template="$1"
out_template="$2"
# remove template-in if exists
rm -f "$out_template"
# remove temp if exists
rm -f temp.yml
( echo "cat <<EOF >$out_template";
  cat "$base_template";
  echo "EOF";
) >temp.yml
. temp.yml
rm -f temp.yml
cat $out_template
