// scrapers/clubs/the-jazz-cafe.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "The Jazz Cafe"
exports.scrape = async function() {
  const candidateUrls = ["https://thejazzcafelondon.com/whats-on/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "The Jazz Cafe" })
    return events
  } catch (err) {
    console.error('the-jazz-cafe scrape error', err && err.message)
    return []
  }
}
