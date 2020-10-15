---
id: targets-deploy
title: targets deploy
description: Deploy targets
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Deploy infrastructure configured with config sets to the specified deployment targets.

## Usage

```
tkm targets deploy [group-path...] \
  [--config-file <config-file-name>] \
  [--target <target>]...
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='group-path' required={false}>
        You can pass one or more deployment group paths to deploy only 
        the targets that belong to deployment groups located under the 
        given paths in the deployment groups hierarchy.
    </CliOption>
</CliOptionsTable>

## Options

<CliOptionsTable>
    <CliOption name='--target' required={false}>
        Choose targets to deploy. You can use this option multiple times to specify more targets.
    </CliOption>
    <CliOption name='--config-file' required={false}>
        Load deployment configuration from this file.
    </CliOption>
</CliOptionsTable>

## Common Options

<CommonCliOptionsTable />

## Examples

Deploy all deployment targets:

```
tkm targets deploy
```

Use alternative configuration file that is located in the **deployment** directory:

```
tkm targets deploy --config-file my-targets.yml
```

Deploy only targets that belong to a deployment group **MyGroup** or to any other deployment group under it:

```
tkm targets deploy MyGroup
```

Deploy only the deployment target named **my-target**:

```
tkm targets deploy --target my-target
```
