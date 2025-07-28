# Installation

## System Requirements

Takomo is built with Node.js and requires:
- Node.js v22.16.0 or later
- macOS or Linux (Takomo is not compatible with Windows)

Ensure Node.js is installed before proceeding. You can check your version with:

```shell
node --version
```

## Install as a Project Dependency (Recommended)

The preferred way to use Takomo is by installing it as a local development dependency in your project. This ensures consistent behavior across environments and teams.

Initialize your project (if not already initialized):

```shell
npm init -y
```

Install Takomo locally:

```shell
npm install --save-dev takomo
```

Verify the installation:

```shell
npx tkm --version
```

## Install Globally (Optional)

For quick experimentation or global access, you can also install Takomo globally:

```shell
npm install -g takomo
```

Then verify the installation:

```shell
tkm --version
```

You don’t need to use npx if installed globally—tkm will be available directly from the shell.
