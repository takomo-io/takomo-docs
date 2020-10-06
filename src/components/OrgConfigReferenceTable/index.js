import React from 'react';

const requirementsElement = (requirements) => {
    if (!requirements) {
        return (<div>none</div>)
    }

    if (Array.isArray(requirements)) {
        switch (requirements.length) {
            case 0:
                return (<div>none</div>)
            case 1:
                return (<div>{ requirements[0] }</div>)
            default:
                return (<ul>{ requirements.map(requirement => <li>{ requirement }</li>) }</ul>)
        }
    }

    return (<div>{ requirements }</div>)
}

const typesElement = (types) => {
    if (!types) {
        throw new Error("types is required")
    }

    if (Array.isArray(types)) {
        { types.map(type => (<div>{type}</div>)) }
    }

    return (<div>{types}</div>)
}

export default ({ children, required, types, defaultValue, since, requirements }) => (
    <table class={'config-reference-table'}>
        <tr>
            <th>Since</th>
            <td>{ since ? since : 'v1.0.0' }</td>
        </tr>
        <tr>
            <th>Type</th>
            <td>
                { typesElement(types) }
            </td>
        </tr>
        <tr>
            <th>Required</th>
            <td>{ required ? 'yes' : 'no' }</td>
        </tr>
        <tr>
            <th>Default</th>
            <td>{ defaultValue }</td>
        </tr>
        <tr>
            <th>Requirements</th>
            <td>
                { requirementsElement(requirements) }
            </td>
        </tr>
    </table>
);
