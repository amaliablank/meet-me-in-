// scrapers/clubs/corsica-studios.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "Corsica Studios"
exports.scrape = async function() {
  const candidateUrls = ["https://corsicastudios.com/whats-on/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "Corsica Studios" })
    return events
  } catch (err) {
    console.error('corsica-studios scrape error', err && err.message)
    return []
  }
}
