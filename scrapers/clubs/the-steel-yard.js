// scrapers/clubs/the-steel-yard.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "The Steel Yard"
exports.scrape = async function() {
  const candidateUrls = ["https://www.thesteelyard.com/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "The Steel Yard" })
    return events
  } catch (err) {
    console.error('the-steel-yard scrape error', err && err.message)
    return []
  }
}
