#!/bin/bash -e

aws s3 ls s3://takomo-website-versioned/docs/release/ \
  --recursive \
  | grep -E docs/release/v[0-9]+-[0-9]+-[0-9]+/index.html \
  | tr -s ' ' \
  | cut -d ' ' -f 4 \
  | cut -d '/' -f 3 \
  | tr - . \
  | tr -d v > versions.txt

aws s3 cp \
  versions.txt \
  s3://takomo-website-versioned/docs/release/versions.txt
