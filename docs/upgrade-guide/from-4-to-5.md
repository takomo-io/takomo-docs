---
sidebar_position: 3
---

import {ApiLink} from '@site/src/components/ApiLink';

# From Takomo 4.x to 5.x

Takomo 5.0 is a maintenance release with a few breaking changes. Upgrading from 4.x should be straightforward in most cases.

## Breaking changes

Here are the breaking changes introduced in Takomo 5.0.

### Require Nodejs 16.17.0

Nodejs 16.17.0 is now required to run Takomo. This change makes it possible to keep upgrading project dependencies to their latest versions in the future.

**Required actions**

Upgrade your Nodejs to version 16.17.0 or later.

### Changes to public API

The following breaking changes to public API were introduced in order to enable just in time assuming of command roles, and to hide details of internal API. 

#### Changes to <ApiLink text="Stack" source="interfaces/Stack.html"/> interface

- `getCloudFormationClient` function was removed because it exposes internal API
  - Use `getClient` function that returns native AWS SDK client instead 
- `credentials` property was removed because it didn't allow assuming command roles only when needed
  - Use `getCredentials` function instead 

If your project has custom parameter resolvers or hooks that use <ApiLink text="Stack" source="interfaces/Stack.html"/>, you need to go through your code and make the necessary changes.

#### Changes to <ApiLink text="CommandContext" source="interfaces/CommandContext.html"/> interface

- `awsClientProvider` property was removed because it exposes internal API
  - Use native AWS SDK clients instead

**Required actions**

If your project has custom parameter resolvers or hooks that use <ApiLink text="CommandContext" source="interfaces/CommandContext.html"/>, you need to go through your code and make the necessary changes.
