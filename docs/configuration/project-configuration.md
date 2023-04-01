---
sidebar_position: 4
---

# Project configuration

You can configure project-wide settings in a **takomo.yml** file that you place in the project root directory. 

## Required Takomo version

You specify the required Takomo version with the requiredVersion property. It accepts a NPM [semver](https://www.npmjs.com/package/semver) compatible version range.

#### Example

Require Takomo version 6.0.0 or above:

```yaml title="takomo.yml"
requiredVersion: ">=6.0.0"
```

## Allowed regions

By default, the supported regions are hardcoded in Takomo's codebase. A new Takomo version is released whenever AWS launches new regions.
In case you need to use an older Takomo version that does not include some regions launched after its release, you may specify the missing regions yourself using this property.

You can also use this property to list only the regions you intend to use to prevent deploys to any other region.

#### Example

Allow only these four regions:

```yaml title="takomo.yml"
regions:
  - us-east-1
  - eu-west-1
  - eu-central-1
  - eu-north-1 
```

## Feature flags

You can enable and disable certain Takomo features by specifying feature flags under the features property. 

Here are the available feature flags:

| Flag | Description |
| ---- | ----------- |
| deploymentTargetsUndeploy | Set false to disable undeploy deployment targets command.<br/><br/>You might want to disable this command to add an extra confirmation step to prevent removing targets unintentionally.<br/><br/>You can override this setting by giving `--feature deploymentTargetsUndeploy=true` option from command-line when executing undeploy deployment targets command. |

#### Example

Disable undeploy deployment targets command:

```yaml title="takomo.yml"
features:
  deploymentTargetsUndeploy: false
```

## Extending project configuration

You can make a Takomo project configuration file to inherit configuration from another file. Inheriting configuration becomes useful, for example, when you have a monorepo containing multiple Takomo projects, each having its own configuration and sharing some common properties with others. You can place the common properties in a parent file that others then inherit.

You use the extends property to make a project configuration file inherit configuration from another file:

```yaml title="takomo.yml"
extends: ../my-parent-config.yml
```

## Typescript support

By default, Takomo looks for a `takomo.ts` file, which can be used to customize Takomo configuration, from the project root dir. If the file is found, it's compiled with [esbuild](https://esbuild.github.io/), and then run to apply customizations it contains. 

You can customize this feature by providing `esbuild` property. It has the following properties:

| Property  | Description                                                 | Required | Default             |
|-----------|-------------------------------------------------------------|----------|---------------------|
| enabled   | Toggle esbuild and Typescript feature on or off             | no       | true                |
| outFile   | Name of the file where compiled Typescript code is written  | no       | takomo.ts           |
| entryPoint | Input entry point file for esbuild                         | no       | .takomo/out/takomo.js |

#### Example

Use different entry point file.

```yaml title="takomo.yml"
esbuild:
  entryPoint: src/index.ts
```

Disable Typescript support:

```yaml title="takomo.yml"
esbuild:
  enabled: false
```