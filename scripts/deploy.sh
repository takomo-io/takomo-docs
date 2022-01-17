#!/bin/bash -e

# Change to dir containing this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# ======================================================
# Functions.
# ======================================================

build_and_deploy() {
  BASE_URL=$1

  echo "Build and deploy using base url: ${BASE_URL}"

  cd ..
  rm -rf build

  BASE_URL=$BASE_URL yarn build
  cd build

  aws s3 cp . s3://takomo-website-bucket${BASE_URL} \
    --recursive \
    --exclude "*.html" \
    --cache-control "public, max-age=604800"

  aws s3 cp . s3://takomo-website-bucket${BASE_URL} \
    --recursive \
    --exclude "*" \
    --include "*.html" \
    --cache-control "public, max-age=60"
}

# ======================================================
# Variables.
# ======================================================

# Get current version
CURRENT_VERSION=$(node get-current-version.js)
ENCODED_CURRENT_VERSION="${CURRENT_VERSION//./-}"
echo "Current version: ${CURRENT_VERSION}"
echo "Encoded version: ${ENCODED_CURRENT_VERSION}"

# ======================================================
# Build and deploy as archived version accessible from
# url /archive/<versio>/.
# ======================================================
build_and_deploy "/archive/${ENCODED_CURRENT_VERSION}/"

# ======================================================
# Update releases file that contains all releases and
# links to versioned websites.
# ======================================================
cd "$DIR"
LATEST_VERSION=$(node update-releases-config.js)

# ======================================================
# Build and deploy as latest version if the current
# version is the latest. Accessible from the root path.
# ======================================================
if [[ "${LATEST_VERSION}" == "${CURRENT_VERSION}" ]]; then
  echo "Current version ${CURRENT_VERSION} is the latest version. Deploy as latest version"
  build_and_deploy "/"
fi

