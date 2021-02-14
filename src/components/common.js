import React from "react";

export const getTypes = (types) => {
    if (typeof types === "string") {
        return <div>{ types }</div>
    }

    if (Array.isArray(types)) {
        const lastIndex = types.length - 1
        return types.map((type, index) => index === lastIndex ? (<div>{type}</div>) : (<div>{type},</div>))
    }

    throw new Error("Invalid type property")
}

export const getRequirements = (requirements) => {
    if (typeof requirements === "string") {
        return <div>{ requirements }</div>
    }

    if (Array.isArray(requirements)) {
        if (requirements.length === 0) {
            return <div>none</div>
        }

        return requirements.length === 1 ?
            <div>{ requirements[0] }</div> :
            <ul>{ requirements.map(requirement => <li>{ requirement }</li>) }</ul>
    }

    return <div>none</div>
}