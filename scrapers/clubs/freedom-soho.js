// scrapers/clubs/freedom-soho.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "Freedom Soho"
exports.scrape = async function() {
  const candidateUrls = ["https://freedom-soho.com/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "Freedom Soho" })
    return events
  } catch (err) {
    console.error('freedom-soho scrape error', err && err.message)
    return []
  }
}
