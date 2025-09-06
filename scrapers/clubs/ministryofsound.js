// scrapers/clubs/ministryofsound.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "Ministry of Sound"
exports.scrape = async function() {
  const candidateUrls = ["https://www.ministryofsound.com/events/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "Ministry of Sound" })
    return events
  } catch (err) {
    console.error('ministryofsound scrape error', err && err.message)
    return []
  }
}
