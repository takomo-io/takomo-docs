import React, { useEffect, useState } from 'react';

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const sortVersions = (versions) => {
    return versions.map(a => a.split('.').map(n => +n+100000).join('.')).sort()
        .map(a => a.split('.').map(n => +n-100000).join('.')).reverse();
}

function Version() {

    const [error, setError] = useState(null);
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            fetch("https://takomo.io/docs/release/versions.txt")
                .then(res => res.text())
                .then(res => {
                   setVersions(sortVersions(res.split("\n").filter(v => v.trim() !== "")))
                })
                .catch(e => setError(e))
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <Layout
                title="Versions"
                permalink="/versions"
                description="Takomo documentation">
                <main className="container margin-vert--lg">
                    <h1>Takomo documentation versions</h1>
                    <p>Failed to load versions</p>
                </main>
            </Layout>
        );
    }

    if (versions.length === 0) {
        return (
            <Layout
                title="Versions"
                permalink="/versions"
                description="Takomo documentation">
                <main className="container margin-vert--lg">
                    <h1>Takomo documentation versions</h1>
                    <p>Loading...</p>
                </main>
            </Layout>
        );
    }

    const latestVersion = versions.length > 0 ? versions[0] : undefined
    const pastVersions = versions.filter((version) => version !== latestVersion)

    return (
        <Layout
            title="Versions"
            permalink="/versions"
            description="Takomo documentation">
            <main className="container margin-vert--lg">
                <h1>Takomo documentation versions</h1>
                <div className="margin-bottom--lg">
                    <h3 id="latest">Latest version (Stable)</h3>
                    <p>Here you can find the latest documentation.</p>
                    <table>
                        <tbody>
                        <tr>
                            <th>{latestVersion}</th>
                            <td>
                                <Link to='https://takomo.io/'>Documentation</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {pastVersions.length > 0 && (
                    <div className="margin-bottom--lg">
                        <h3 id="archive">Past Versions</h3>
                        <p>
                            Here you can find documentation for previous versions of Takomo.
                        </p>
                        <table>
                            <tbody>
                            {pastVersions.map((version) => (
                                <tr key={version}>
                                    <th>{version}</th>
                                    <td>
                                        <Link to={`https://takomo.io/docs/release/v${version.replace(/\./g, '-')}/`}>
                                            Documentation
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </Layout>
    );
}

export default Version;