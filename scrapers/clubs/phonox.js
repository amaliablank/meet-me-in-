// scrapers/clubs/phonox.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "Phonox"
exports.scrape = async function() {
  const candidateUrls = ["https://www.phonox.co.uk/whats-on/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "Phonox" })
    return events
  } catch (err) {
    console.error('phonox scrape error', err && err.message)
    return []
  }
}
