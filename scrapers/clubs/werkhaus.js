// scrapers/clubs/werkhaus.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "Werkhaus"
exports.scrape = async function() {
  const candidateUrls = ["https://werkhaus.co.uk/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "Werkhaus" })
    return events
  } catch (err) {
    console.error('werkhaus scrape error', err && err.message)
    return []
  }
}
