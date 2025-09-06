// scrapers/clubs/the-cause.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "The Cause"
exports.scrape = async function() {
  const candidateUrls = ["https://www.thecause.is/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "The Cause" })
    return events
  } catch (err) {
    console.error('the-cause scrape error', err && err.message)
    return []
  }
}
