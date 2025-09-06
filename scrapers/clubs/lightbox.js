// scrapers/clubs/lightbox.js
const { scrapeCandidateUrls } = require('../common/genericScraper')
exports.name = "Lightbox"
exports.scrape = async function() {
  const candidateUrls = ["https://www.thelightbox-london.com/"]
  try {
    const events = await scrapeCandidateUrls(candidateUrls, { clubName: "Lightbox" })
    return events
  } catch (err) {
    console.error('lightbox scrape error', err && err.message)
    return []
  }
}
