// scrapers/clubs/venue-mot.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "Venue MOT"
exports.scrape = async function() {
  const candidateUrls = ["https://www.motarchive.com/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "Venue MOT" })
    return events
  } catch (err) {
    console.error('venue-mot scrape error', err && err.message)
    return []
  }
}
