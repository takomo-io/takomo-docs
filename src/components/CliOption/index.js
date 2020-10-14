import React from 'react';

const nameElement = (name) => {
    if (Array.isArray(name)) {
        return <div>{name.map((n, i) => <div key={i}>{n}</div>)}</div>
    } else {
        return name
    }
}

const allowedValuesElement = (allowedValues) => {
    if (!allowedValues) {
        return ""
    }

    return (
        <div>
            <br/>
            Allowed values:
            <ul>
                {allowedValues.map(a => (<li>{a}</li>))}
            </ul>
        </div>
    )
}

export default ({ children, name, required, allowedValues }) => {
    return (
        <tr>
            <td className='name'>{ nameElement(name) }</td>
            <td>{ required ? 'yes' : 'no' }</td>
            <td>
                <div>{ children }</div>
                { allowedValuesElement(allowedValues) }
            </td>
        </tr>
    )
}