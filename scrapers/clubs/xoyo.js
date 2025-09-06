// scrapers/clubs/xoyo.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "XOYO"
exports.scrape = async function() {
  const candidateUrls = ["https://xoyo.co.uk/whats-on/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "XOYO" })
    return events
  } catch (err) {
    console.error('xoyo scrape error', err && err.message)
    return []
  }
}
