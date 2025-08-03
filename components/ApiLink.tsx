import React from 'react';

export default (props: { text: string, source: string }) => {
  // const {siteConfig} = useDocusaurusContext()
  // const {customFields: { takomoVersion }} = siteConfig
  console.log(JSON.stringify((props), undefined, 2))
  // const apiVersion = takomoVersion.replace(/\./g, '-')

  const apiVersion = "8-0-0"
  // return <a href={`https://takomo.io/api-docs/${apiVersion}/${source}`} target={'_blank'}>{text}</a>
  return <a href={`https://takomo.io/api-docs/${apiVersion}/${props.source}`} target={'_blank'}>{props.text}</a>
}