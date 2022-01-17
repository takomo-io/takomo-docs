import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function versionsListing(releases) {
  if (releases.length === 0) {
    return <div></div>
  }

  return (
    <div>
      <header>
        <h1>Takomo releases</h1>
      </header>
      { releases.map(release => {
        return <div key={release.version} dangerouslySetInnerHTML={{ __html: release.body }}></div>
      }) }
    </div>
  )
}

export default function Releases() {
  const [versions, setVersions] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetch("https://takomo.io/takomo-releases.json", {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(releases => {
        setVersions(releases)
      })

  }, []);

  return (
    <Layout
      title="Versions"
      description="All Takomo versions">
      <main>
        <div className="container padding-top--md padding-bottom--lg">
          { versionsListing(versions) }
        </div>
      </main>
    </Layout>
  );
}