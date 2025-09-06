// scrapers/clubs/dalston-superstore.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "Dalston Superstore"
exports.scrape = async function() {
  const candidateUrls = ["https://www.dalstonsuperstore.co.uk/whats-on"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "Dalston Superstore" })
    return events
  } catch (err) {
    console.error('dalston-superstore scrape error', err && err.message)
    return []
  }
}
