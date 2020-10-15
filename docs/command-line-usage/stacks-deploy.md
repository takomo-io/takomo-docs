---
id: stacks-deploy
title: stacks deploy
description: Deploy stacks
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Deploy stacks within the given command path. Also stacks outside the command path that are dependencies to the stacks within the command path are deployed. Stacks are sorted in deployment order by stack dependencies so that any given stack is deployed only after its dependencies have been successfully deployed. Stacks are deployed in parallel when possible.

## Usage

```
tkm stacks deploy [command-path] \
  [--ignore-dependencies] \
  [--interactive|-i]
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='command-path' required={false}>
        Deploy stacks within the given command path. Defaults to the root stack group path ("/").
    </CliOption>
</CliOptionsTable>

## Options

<CliOptionsTable>
    <CliOption name='--ignore-dependencies' required={false}>
        Ignore stack dependencies. By default, when a stack is deployed,
        its dependencies are deployed first, and then the stack itself. 
        In some exceptional cases, you might want to 
        deploy just one stack and skip its dependencies.<br/><br/>
        Bear in mind that this option is supported only when exactly one stack is 
        deployed. Ignoring dependencies may lead into unexpected results, so you 
        should use this option only in exceptional circumstances.
    </CliOption>
    <CliOption name={['--interactive','-i']} required={false}>
        Choose the command path using autocompleting search. 
    </CliOption>
</CliOptionsTable>

## Common Options

<CommonCliOptionsTable />

## Examples

Deploy all stacks:

```
tkm stacks deploy
```

Deploy stacks within the given command path:

```
tkm stacks deploy /prod
```

Deploy only **/dev/vpc.yml** stack and its dependencies:

```
tkm stacks deploy /dev/vpc.yml
```

The region part must be specified if the stack has more than one region and you want to deploy it to only one region.

```
tkm stacks deploy /dev/vpc.yml/eu-west-1
```

Deploy exactly one stack and skip its dependencies:

```
tkm stacks deploy /cloudtrail.yml --ignore-dependencies
```