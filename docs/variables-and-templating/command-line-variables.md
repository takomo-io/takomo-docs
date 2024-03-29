---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Command-line variables

You can pass variables from command line using `--var` and `--var-file` options. Both options can be used multiple times. Variables are exposed via var variable.

## Named variables

Use `--var` option to pass a single named variable from the command line.

#### Example

Provide a single variable named myVariable with value hello:

```shell
--var myVariable=hello
```

You can refer to the variable in configuration files like so:

<Tabs>
<TabItem value="handlebars" label="Handlebars" default>

```yaml
Resources:
  LogGroup:
    Type: AWS::Logs::LogGroup
    LogGroupName: {{ var.myVariable }}
```

</TabItem>
<TabItem value="ejs" label="EJS">

```yaml
Resources:
  LogGroup:
    Type: AWS::Logs::LogGroup
    LogGroupName: <%= it.var.myVariable %>
```

</TabItem>
</Tabs>

## Variables from files

Use `--var-file` option to load variables from a file. If the file extension is **.json** or **.yml**, the file is first parsed into an object which is then stored to a variable. If the file extension is something else, the contents are just read into a variable.

The variable name can be omitted for **.yml** and **.json** files as long as the file contents can be deserialized to an object. The deserialized object is then stored to the top-level of variables.

#### Example - Read file contents to a variable

If the project directory contains a file named **commit.txt**, you can read its contents into a variable named **commitHash** like so:

```shell
--var-file commitHash=commit.txt
```

#### Example - Deserialize file contents to a variable

Here's an example how you would deserialize file contents to a variable. Suppose you have a file **/home/variables.yml** with valid YAML contents:

```yaml title="/home/variables.yml"
name: James
age: 55
permissions:
  - create
  - delete
  - update
```

You can deserialize its contents to a variable named **myVariable** like so:

```shell
--var-file person=/home/variables.yml
```

And then use the variable in the configuration like so:

<Tabs>
<TabItem value="handlebars" label="Handlebars" default>

```yaml
parameters:
  UserName: {{ var.person.name }}
  UserAge: {{ var.person.age }}
```

</TabItem>
<TabItem value="ejs" label="EJS">

```yaml
parameters:
  UserName: <%= it.var.person.name %>
  UserAge: <%= it.var.person.age %>
```

</TabItem>
</Tabs>

#### Example - Deserialize file contents to top-level variables

Say, you have a file **properties.json** with valid JSON contents:

```yaml title="properties.json"
{
  "color: "red",
  "foo": {
    "bar": true
  }
}
```

You can deserialize its contents to top-level of variables:

```shell
--var-file person=/home/variables.yml
```

And then use the variables in the configuration like so:

<Tabs>
<TabItem value="handlebars" label="Handlebars" default>

```yaml
parameters:
  Color: {{ var.color }}
  FooBarEnabled: {{ var.foo.bar }}
```

</TabItem>
<TabItem value="ejs" label="EJS">

```yaml
parameters:
  Color: <%= it.var.color %>
  FooBarEnabled: <%= it.var.foo.bar %>
```

</TabItem>
</Tabs>


## Loading order and merging of variables

Variables from files are loaded first in the order they are defined, and then the named variables also in the definition order. Variables defined later will override previously loaded variables with the same name. Complex variables are merged recursively.

#### Example

Say, you have a JSON file that defines some basic settings:

```yaml title="base.json"
{
  "color": "blue",
  "width": 100,
  "settings": {
    "debug": true
  }
}
```

You also have another file that contains environment-specific settings:

```yaml title="prod.json"
{
  "settings": {
    "debug": false
  }
}
```

You can load both settings files and also override and extend the loaded configuration using named variables:

```shell
--var-file base.json \
  --var-file prod.json \
  --var color=yellow \
  --var height=200
```

The final merged variables object would look like this:

```yaml
{
  "color": "yellow",
  "width": 100,
  "height": 200,
  "settings": {
    "debug": false
  }
}
```
