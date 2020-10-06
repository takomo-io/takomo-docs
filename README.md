# Takomo Docs

Documentation site built using [Docusaurus 2](https://v2.docusaurus.io/).

## Installation

Install dependencies:

    yarn

## Local Development

Start a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

    yarn start

## Build

Build static content into the `build` directory and can be served using any static contents hosting service.

    yarn build

## Versioned Documentation

There is a separate git branch for each released Takomo version. The naming of release branches follows pattern: `release/vx.y.z` where `x.y.z` is the release, e.g. documentation for release `2.9.0` is found from a release branch named `release/v2.9.0`.

Documentation for the next Takomo release is done in the `master` branch. 

## Deployment

The documentation is automatically deployed when a commit is pushed to the following branches:

- `master` - Documentation site for the next release at https://takomo.io/docs/release/next/
- `release/vx.x.x` - Documentation site for the release `x.x.x` at https://takomo.io/docs/release/vx-x-x/

The latest release is also deployed to https://takomo.io/, For example, if the latest Takomo release is 2.9.0, then changes pushed to the branch release/v2.9.0 triggers deploy to both https://takomo.io/ and https://takomo.io/docs/release/v2-9-0/.
