import React from 'react';

export default ({ children, name, required }) => {
    return (
        <tr>
            <td className='name'>{ name }</td>
            <td>{ required ? 'yes' : 'no' }</td>
            <td>{ children }</td>
        </tr>
    )
}