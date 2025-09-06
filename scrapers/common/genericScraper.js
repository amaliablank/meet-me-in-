const got = require('got')
const cheerio = require('cheerio')
async function scrapeCandidateUrls(candidateUrls, opts = {}) {
  const results = []
  for (const url of candidateUrls) {
    try {
      const res = await got(url, { timeout: 15000, headers: { 'user-agent': 'meet-me-in-bot/1.0 (+https://example.com)' } })
      const $ = cheerio.load(res.body)
      const selectors = ['.event-item', '.tribe-events-loop__event', '.event', '.listing', 'article', '.g-events__item', 'li.event']
      let found = false
      for (const sel of selectors) {
        const nodes = $(sel)
        if (nodes && nodes.length) {
          nodes.each((i, el) => {
            const el$ = $(el)
            const title = el$.find('a').first().text().trim() || el$.find('.entry-title').text().trim() || el$.find('h3').text().trim()
            const link = el$.find('a').first().attr('href') || url
            const time = el$.find('time').attr('datetime') || el$.find('.date').text().trim() || null
            const price = el$.find('.price').text().trim() || el$.find('.ticket-price').text().trim() || null
            const genre = el$.find('.genre').text().trim() || null
            results.push({
              venue_name: title || opts.clubName || 'Unknown',
              start_time: time || null,
              ticket_price: price,
              genre,
              postcode: opts.postcode || null,
              source_url: link && link.startsWith('http') ? link : (new URL(link || '', url)).href
            })
          })
          found = true
          break
        }
      }
      if (!found) {
        $('a').each((i, el) => {
          const href = $(el).attr('href') || ''
          if (href.includes('/event') || href.includes('/events') || href.includes('/whats-on') || href.includes('/whatson')) {
            results.push({
              venue_name: opts.clubName || 'Unknown',
              start_time: null,
              ticket_price: null,
              genre: null,
              postcode: opts.postcode || null,
              source_url: href.startsWith('http') ? href : (new URL(href, url)).href
            })
          }
        })
      }
      if (results.length) break
    } catch (err) {
      console.warn('Candidate URL failed', url, err.message)
      continue
    }
  }
  return results
}
module.exports = { scrapeCandidateUrls }
