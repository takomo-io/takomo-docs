---
id: stack-inspect
title: Stack Inspect
description: CLI commands to inspect stacks
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Commands to inspect stacks:

- [Show dependency graph](#show-dependency-graph)

## Show dependency graph

Print dependency graph of stacks within the given command path in [DOT](https://en.wikipedia.org/wiki/DOT_(graph_description_language)) format.

If no command path is given, the root stack group path is used. 

### Usage

```
tkm stacks inspect dependency-graph [command-path]
```

### Positional arguments

<CliOptionsTable>
    <CliOption name='command-path' required={false}>
        Print dependency graph of stacks within this command path. Defaults to the root stack group path ("/").
    </CliOption>
</CliOptionsTable>

### Common Options

This command supports the following common options.

<CommonCliOptionsTable />

### Examples

Print dependency graph of all stacks:

```
tkm stacks inspect dependency-graph
```

Print dependency graph of stacks within **/dev** command path:

```
tkm stacks inspect dependency-graph /dev
```