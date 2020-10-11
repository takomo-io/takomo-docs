---
id: stack-inspect
title: Stack Inspect
description: CLI commands to inspect stacks
keywords:
  - Takomo
  - CLI
---

import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Commands to inspect stacks:

- [Show dependency graph](#show-dependency-graph)

## Show dependency graph

Show dependency graph of stacks within the given command path. The dependency graph is shown in [DOT](https://en.wikipedia.org/wiki/DOT_(graph_description_language)) format.

If no command path is given, the root stack group path is used. 

### Usage

```
tkm stacks inspect dependency-graph [command-path]
```

### Positional arguments

<CliOptionsTable>
    <CliOption name='command-path' required={false}>
        Show dependency graph of stacks within this command path.
    </CliOption>
</CliOptionsTable>

### Examples

Show dependency graph of all stacks:

```
tkm stacks inspect dependency-graph
```

Show dependency graph of stacks within **/dev** command path:

```
tkm stacks inspect dependency-graph /dev
```