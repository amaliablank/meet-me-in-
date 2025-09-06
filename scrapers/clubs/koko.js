// scrapers/clubs/koko.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "KOKO"
exports.scrape = async function() {
  const candidateUrls = ["https://www.koko.uk.com/whats-on/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "KOKO" })
    return events
  } catch (err) {
    console.error('koko scrape error', err && err.message)
    return []
  }
}
