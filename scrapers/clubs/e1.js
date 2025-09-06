// scrapers/clubs/e1.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "E1"
exports.scrape = async function() {
  const candidateUrls = ["https://www.e1london.com/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "E1" })
    return events
  } catch (err) {
    console.error('e1 scrape error', err && err.message)
    return []
  }
}
