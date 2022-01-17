const { S3Client, paginateListObjectsV2, PutObjectCommand } = require("@aws-sdk/client-s3")
const { Octokit } = require("@octokit/core")
const CustomOctokit = Octokit.plugin(
  require("@octokit/plugin-paginate-rest").paginateRest
)
const MarkdownIt = require('markdown-it')

const md = new MarkdownIt()
const octokit = new CustomOctokit()
const client = new S3Client({ region: "us-east-1" })
const Prefix = "archive/"
const Bucket = "takomo-website-bucket"

const listVersionedWebsites = async () => {
  const input = {
    Prefix,
    Bucket,
    Delimiter: "/",
  }

  const versions = []
  for await (const page of paginateListObjectsV2({ client }, input)) {
    const items = page.CommonPrefixes.map(p => ({
      url: `https://takomo.io/${p.Prefix}`,
      version: p.Prefix.replace(Prefix, "").replace("/", "").replace(/-/g, ".")
    }))

    versions.push(...items)
  }

  return versions
}

const extractReleaseInfo = ({ name, published_at, body, html_url }) => ({
  version: name.replace("v", ""),
  date: published_at,
  body: md.render(body),
  githubUrl: html_url
})

const listGitHubReleases = () => {
  return octokit.paginate("GET /repos/{org}/{repo}/releases", {
    org: "takomo-io",
    repo: "takomo",
  }).then(releases => releases.map(extractReleaseInfo))
}

const createReleasesInfo = async () => {
  const websites = await listVersionedWebsites()
  const githubReleases = await listGitHubReleases()

  return githubReleases.map(release => {
    const website = websites.find(w => w.version === release.version)
    return {
      ...release,
      website: website !== undefined,
      websiteUrl: website ? website.url : null,
    }
  })
}

const uploadReleaseInfo = async (releases) => {
  const [ latest ] = releases
  await client.send(new PutObjectCommand({
    Bucket,
    Key: "takomo-releases.json",
    Body: JSON.stringify(releases, undefined, 2),
    ContentType: "application/json"
  }))

  console.log(latest.version)
}

createReleasesInfo().then(uploadReleaseInfo)