#!/bin/bash -e

# Change to dir containing this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"
cd ..

npm run build
cd doc_build

BASE_URL="/"

aws s3 cp . s3://takomo-website-bucket${BASE_URL} \
  --region us-east-1 \
  --recursive \
  --exclude "*.html" \
  --cache-control "public, max-age=604800"

aws s3 cp . s3://takomo-website-bucket${BASE_URL} \
  --region us-east-1 \
  --recursive \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public, max-age=60"



