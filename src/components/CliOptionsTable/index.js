import React from 'react';

export default ({ children }) => {
    return (
        <table className='cli-options-table'>
            <thead>
                <tr>
                    <th>Option</th>
                    <th>Required</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                { children}
            </tbody>
        </table>
    )
}