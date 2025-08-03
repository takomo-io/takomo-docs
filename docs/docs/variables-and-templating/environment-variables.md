import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Environment variables

System environment variables are exposed via the `env` variable.

#### Example

Here's an example how to print the HOME environment variable:

<Tabs>
<TabItem value="handlebars" label="Handlebars" default>

```yaml
Home dir is {{ env.HOME }}
```

</TabItem>
<TabItem value="ejs" label="EJS">

```yaml
Home dir is <%= it.env.HOME %>
```

</TabItem>
</Tabs>
