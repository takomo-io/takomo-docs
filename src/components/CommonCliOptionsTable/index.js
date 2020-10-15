import React from 'react';

import CliOption from "../CliOption"

const helpOption = () => (
    <CliOption key={'1'} name='--help' required={false}>
        Show help.
    </CliOption>
)

const yesOption = () => (
    <CliOption key={'2'} name={['--yes', '-y']} required={false}>
        Automatic yes to prompts; assume "yes" as an answer to all prompts and run non-interactively.
    </CliOption>
)

const profileOption = () => (
    <CliOption key={'3'} name='--profile PROFILE' required={false}>
        Use a profile configured in ~/.aws/credentials file.
    </CliOption>
)

const logOption = () => (
    <CliOption key={'4'} name='--log LEVEL' required={false}>
        Set logging level. Allowed values are "trace", "debug", "info", "warn", "error".
        Defaults to "info".
    </CliOption>
)

const dirOption = () => (
    <CliOption key={'5'} name={['--dir DIR', '-d DIR']}>
        Set the project directory from where Takomo loads configuration.
    </CliOption>
)

const sdkOption = () => (
    <CliOption key={'6'} name='--load-aws-sdk-config' required={false}>
        Instead of using profiles configured in ~/.aws/credentials, use profiles found from ~/.aws/config.
    </CliOption>
)

const varOption = () => (
    <CliOption key={'7'} name='--var name=VALUE' required={false}>
        Set variable that can be referenced in configuration files.
        This option can be used multiple times to set multiple variables.
    </CliOption>
)

const varFileOption = () => (
    <CliOption key={'8'} name={['--var-file FILE', '--var-file name=FILE']} required={false}>
        Load variables from a file. The variables can be referenced in configuration files.
        This option can be used multiple times to load variables from multiple files.
        If NAME is given, variables are loaded to a variable with that name.
    </CliOption>
)

const envFileOption = () => (
    <CliOption key={'9'} name='--env-file FILE' required={false}>
        Load environment variables from a file. The variables can be referenced in configuration files.
        This option can be used multiple times to load variables from multiple files.
    </CliOption>
)

const logConfidentialInfoOption = () => (
    <CliOption key={'10'} name='--log-confidential-info' required={false}>
        Allow printing of environment variables and confidential parameter values that are
        concealed from the logs by default.
    </CliOption>
)

const statsOption = () => (
    <CliOption key={'11'} name='--stats' required={false}>
        Print statistics information of the executed command.
    </CliOption>
)

const options = {
    'help': helpOption,
    'yes': yesOption,
    'profile': profileOption,
    'log': logOption,
    'dir': dirOption,
    'sdk': sdkOption,
    'var': varOption,
    'varFile': varFileOption,
    'envFile': envFileOption,
    'logConfidentialInfo': logConfidentialInfoOption,
    'stats': statsOption
}

export default ({ children, notSupported }) => {

    const supported = Object.keys(options)
        .filter(name => !notSupported || !notSupported.includes(name))
        .map(name => options[name]())

    return (
        <table className={'cli-options-table'}>
            <thead>
                <tr>
                    <th>Option</th>
                    <th>Required</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                { supported.map(o => o) }
            </tbody>
        </table>
    )
}