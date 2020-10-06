import React from 'react';

const principals = [
    "aws-artifact-account-sync.amazonaws.com",
    "backup.amazonaws.com",
    "cloudtrail.amazonaws.com",
    "compute-optimizer.amazonaws.com",
    "config.amazonaws.com",
    "ds.amazonaws.com",
    "fms.amazonaws.com",
    "license-manager.amazonaws.com",
    "member.org.stacksets.cloudformation.amazonaws.com",
    "ram.amazonaws.com",
    "servicecatalog.amazonaws.com",
    "ssm.amazonaws.com",
    "sso.amazonaws.com",
    "tagpolicies.tag.amazonaws.com"
]

export const awsServicePrincipals = () => (<ul>{ principals.map(p => (<li>{p}</li>)) }</ul>)