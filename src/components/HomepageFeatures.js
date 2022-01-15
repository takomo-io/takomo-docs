import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Configure and deploy',
    description: (
      <>
        Organize, parameterize and deploy CloudFormation stacks across multiple regions and accounts.
      </>
    ),
  },
  {
    title: 'Extendable and dynamic',
    description: (
      <>
        Extend core functionality with your own JavaScript code. Use dynamic Handlebars templating and
        avoid repetitive configuration and copy-pasting in CloudFormation templates.
      </>
    ),
  },
  {
    title: 'Safe',
    description: (
      <>
        Review changes before deploying and take advantage of safety features that prevent you from making mistakes.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
