// scrapers/clubs/fabric.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "Fabric"
exports.scrape = async function() {
  const candidateUrls = ["https://fabriclondon.com/whats-on/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "Fabric" })
    return events
  } catch (err) {
    console.error('fabric scrape error', err && err.message)
    return []
  }
}
