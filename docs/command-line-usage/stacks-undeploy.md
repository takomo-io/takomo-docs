---
id: stacks-undeploy
title: stacks undeploy
description: Undeploy stacks
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Undeploy stacks within the given command path. Also stacks outside the command path that depend on the stacks within the command path are undeployed. Stacks are sorted in undeployment order by stack dependencies so that any given stack is undeployed only after its dependants have been successfully undeployed. Stacks are undeployed in parallel when possible.

## Usage

```
tkm stacks undeploy [command-path] \
  [--ignore-dependencies] \
  [--interactive|-i]
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='command-path' required={false}>
        Undeploy stacks within the given command path. Defaults to the root stack group path ("/").
    </CliOption>
</CliOptionsTable>

## Options

This command supports the following options.

<CliOptionsTable>
    <CliOption name='--ignore-dependencies' required={false}>
        Ignore stack dependencies. By default, when a stack is undeployed, 
        its dependants are undeployed first, and then the stack itself. 
        In some exceptional cases, you might want to undeploy just one stack 
        and skip its dependants.<br/><br/>
        Bear in mind that this option is supported only when exactly one stack is 
        undeployed. Ignoring dependants may lead into unexpected results, so you 
        should use this option only in exceptional circumstances.
    </CliOption>
    <CliOption name={['--interactive','-i']} required={false}>
        Choose the command path using autocompleting search. 
    </CliOption>
</CliOptionsTable>

## Common Options

This command supports the following common options.

<CommonCliOptionsTable />

## IAM Permissions

These are the minimum IAM permissions required to run this command.

```yaml
# Minimum permissions. Additional permissions are needed to actually 
# modify resources defined in CloudFormation templates.
Statement: 
  - Sid: Stacks
    Effect: Allow
    Action:
      - cloudformation:DescribeStackEvents
      - cloudformation:DeleteStack
      - cloudformation:DescribeStacks
    Resource: "*"

  # IAM permissions needed only if command roles are used  
  # Specify resource to restrict access to specific roles.  
  - Sid: IAM
    Effect: Allow
    Action:
      - sts:AssumeRole
    Resource: "*"   
```

## Examples

Undeploy all stacks:

```
tkm stacks undeploy
```

Undeploy within the given command path:

```
tkm stacks undeploy /dev
```

Undeploy only **/dev/vpc.yml** stack and its dependants:

```
tkm stacks undeploy /dev/vpc.yml
```

The region part must be specified if the stack has more than one region and you want to undeploy it from only one region.

```
tkm stacks undeploy /dev/vpc.yml/eu-west-1
```

Undeploy exactly one stack and skip its dependants:

```
tkm stacks undeploy /cloudtrail.yml --ignore-dependencies
```