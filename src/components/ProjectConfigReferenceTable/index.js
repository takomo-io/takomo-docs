import React from 'react';
import { getTypes, getRequirements } from "../common"

export default ({ children, required, types, defaultValue, since, requirements }) => (
    <table class={'config-reference-table'}>
        <tr>
            <th>Since</th>
            <td>{ since ? since : 'v1.0.0' }</td>
        </tr>
        <tr>
            <th>Type</th>
            <td>{ getTypes(types) }</td>
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
            <td>{ getRequirements(requirements) }</td>
        </tr>
    </table>
);
