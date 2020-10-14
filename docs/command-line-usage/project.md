---
id: project
title: Project
description: CLI commands to manage Takomo project
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

## Initialize a New Project

Initialize a new Takomo project. Creates standard Takomo project structure and minimal configuration files.

### Usage

```
tkm init [--create-samples] [--project] [--regions]
```

### Options

This command supports the following options.

<CliOptionsTable>
    <CliOption name='--create-samples' required={false}>
        Create sample configuration files.
    </CliOption>
    <CliOption name='--project' required={false}>
        Name of the project. If this option is omitted, the project name will be prompted.
    </CliOption>
    <CliOption name='--regions' required={false}>
        Regions of the project. This option can be used multiple times to set more than one region.
        If this option is omitted, the regions will be prompted.
    </CliOption>
</CliOptionsTable>

### Common Options

This command supports the following common options.

<CommonCliOptionsTable notSupported={['yes']} />

### Examples

Initialize a new project to the current directory:

```
tkm init 
```

Initialize a new project to the current directory and create sample stacks:

```
tkm init --create-samples
```

Initialize a new project to **/var/projects** directory:

```
tkm init -d /var/projects
```
