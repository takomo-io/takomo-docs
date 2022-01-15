const fs = require("fs")
const packageJsonContents = fs.readFileSync("../package.json")
const packageJson = JSON.parse(packageJsonContents)
console.log(packageJson.version)