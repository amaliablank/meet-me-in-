// scrapers/clubs/gutterring.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "GutterRing"
exports.scrape = async function() {
  const candidateUrls = ["https://www.gutter-ring.com/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "GutterRing" })
    return events
  } catch (err) {
    console.error('gutterring scrape error', err && err.message)
    return []
  }
}
