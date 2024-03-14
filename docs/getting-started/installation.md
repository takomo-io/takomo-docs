---
sidebar_position: 1
---

# Installation

## System requirements

Takomo is built with Node.js and requires Node.js **v20.11.0** or later.

Takomo doesn't work on Windows, so you need to have Linux or Mac.

## Install as a project dependency

The recommended way to install Takomo is to add it as a development dependency in your project's package.json.

Initialize a new project if needed:

```shell
npm init -y
```

Add Takomo as a development dependency:

```shell
npm install -D takomo 
```

Verify installation:

```shell
npx tkm --version
```

## Global installation

You can, of course, use global installation, too.

```shell
npm install -g takomo
```

Verify installation:

```shell
npx tkm --version
```