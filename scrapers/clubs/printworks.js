// scrapers/clubs/printworks.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "Printworks"
exports.scrape = async function() {
  const candidateUrls = ["https://printworkslondon.co.uk/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "Printworks" })
    return events
  } catch (err) {
    console.error('printworks scrape error', err && err.message)
    return []
  }
}
