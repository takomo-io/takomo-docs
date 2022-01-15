import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function versionsListing(versions) {
  if (versions.length === 0) {
    return <div></div>
  }

  const [currentVersion, ...pastVersions] = versions

  return (
    <div>
      <header>
        <h1>Takomo versions</h1>
      </header>
      <h2>Current version</h2>
      <p>
        Here you can find the documentation for current released version.
      </p>
      <table>
        <thead>
        <tr>
          <th>Version</th>
          <th>Documentation</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{ currentVersion }</td>
          <td><a href="https://takomo.io/">Documentation</a></td>
        </tr>
        </tbody>
      </table>

      <h2>Past versions</h2>
      <p>
        Here you can find documentation for previous versions of Takomo.
      </p>
      <table>
        <thead>
        <tr>
          <th>Version</th>
          <th>Documentation</th>
        </tr>
        </thead>
        <tbody>
        { pastVersions.map((version) => (
          <tr key={ version }>
            <td>{ version }</td>
            <td><Link to={`/archive/${ version }`}>Documentation</Link></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Versions() {
  const [versions, setVersions] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTimeout(() => {
      console.log("ddddd")
      setVersions(["3.40.0", "3.39.0", "3.38.0"])
    }, 2000)
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