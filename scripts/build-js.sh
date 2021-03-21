#!/bin/bash
BASE_DIR="`pwd`/`dirname "$0"/`/../"
PUBLIC=$BASE_DIR"public/"
DIST=$BASE_DIR"dist/"
mkdir -p $DIST
for file in $PUBLIC*.mjs;
  do terser $file -o $DIST`basename $file`;
done
