# Introduction

Blueprints are ordinary stack configuration, but unlike stacks, can't be deployed. Stacks can inherit configuration from them and also override parts or all of the inherited configuration. Blueprints can help you to reduce repetitive configuration. 

Blueprints can contain the same properties as ordinary stacks. You place blueprint files to **blueprints** directory or its subdirectories. Each blueprint file must have **.yml** extension. 

In stack configuration, you use [blueprint](../stack-properties/blueprint.md) property to specify from which blueprint the stack inherits its configuration.

#### Example

Our project looks like this:

```shell
.
├─ stacks
│  ├─ frontend.yml
│  ├─ backend.yml
│  ├─ operative-database.yml
│  └─ reporting-database.yml
├─ templates
│  ├─ application-template.yml
│  ├─ database-template.yml
│  └─ custom-database-template.yml
└─ blueprints
   ├─ application.yml
   └─ database.yml
```

We have four stacks and two blueprints. Let's look at the blueprints first.

**blueprints/application.yml** is blueprint for applications. It doesn't specify any parameters, so any stack using it, must provide values for the parameters found in **templates/application-template.yml** template file.

```yaml title="blueprints/application.yml"
template: application-template.yml
regions: eu-west-1
```

**templates/application-template.yml** is template used by **blueprints/application.yml** blueprint.

```yaml title="templates/application-template.yml"
Parameters:
  Environment:
    Type: String
    Description: Application environment
  Name:
    Type: String
    Description: Application name
  DockerImage:
    Type: String
    Description: Application docker image

Resources:
  # ...Resources omitted for brevity 
```

Our project has two application stacks: **frontend.yml** and **backend.yml**. They both use **blueprints/application.yml** and provide value for its parameters.

```yaml title="stacks/frontend.yml"
blueprint: application.yml
paramters:
  Environment: dev
  Name: Frontend App
  DockerImage: frontend:1.0.0
```

```yaml title="stacks/backend.yml"
blueprint: application.yml
paramters:
  Environment: dev
  Name: Backend App
  DockerImage: backend:2.0.0
```

blueprints/database.yml is blueprint for databases. It provides some default values for its parameters.

```yaml title="blueprints/database.yml"
template: database-template.yml
regions: eu-west-1
parameters:
  InstanceClass: db.m4.large
  AllocatedStorage: 50
  Engine: mariadb
  EngineVersion: 10.6.8
```

**templates/database-template.yml** is template used by **blueprints/application.yml** blueprint.

```yaml title="templates/database-template.yml"
Parameters:
  Environment:
    Type: String
    Description: Database environment
  InstanceClass:
    Type: String
    Description: Database instance class
  AllocatedStorage:
    Type: Number
    Description: Database allocated storage
  Engine:
    Type: String
    Description: Database engine
  EngineVersion:
    Type: String
    Description: Database engine version
    
Resources:
  # ...Resources omitted for brevity 
```

**templates/custom-database-template.yml** is some customized database template with fewer parameters.

```yaml title="templates/custom-database-template.yml"
Parameters:
  Environment:
    Type: String
    Description: Database environment
  AllocatedStorage:
    Type: Number
    Description: Database allocated storage
    
Resources:
  # ...Resources omitted for brevity 
```

Finally, there are two database stacks: **operative-database.yml** and **reporting-database.yml**. They both use **blueprints/database.yml** but the latter uses an alternative template.

```yaml title="stacks/operative-database.yml"
blueprint: database.yml
paramters:
  Environment: dev
  InstanceClass: db.m4.medium
  AllocatedStorage: 25
```

```yaml title="stacks/reporting-database.yml"
blueprint: database.yml
template: custom-database-template.yml
paramters:
  Environment: dev
  AllocatedStorage: 100
```