import React from 'react';

export default (props: { text: string, source: string }) => {
  // if (process.env.TAKOMO_VERSION) {
  //   throw new Error("TAKOMO_VERSION environment variable is not found!");
  // }

  // const apiVersion = process.env.TAKOMO_VERSION!.replace(/\./g, '-')
  const apiVersion = "8-0-1"

  return <a href={`https://takomo.io/api-docs/${apiVersion}/${props.source}`} target={'_blank'} style={{color: '#33adff'}}>{props.text}</a>
}