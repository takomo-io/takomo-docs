import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export const ApiLink = ({source, text}) => {
  const {siteConfig} = useDocusaurusContext()
  const {customFields: { takomoVersion }} = siteConfig

  const apiVersion = takomoVersion.replace(/\./g, '-')

  return <a href={`https://takomo.io/api-docs/${apiVersion}/${source}`} target={'_blank'}>{text}</a>
};