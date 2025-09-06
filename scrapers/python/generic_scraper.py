import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
def scrape_candidate_urls(candidate_urls, club_name=None, postcode=None, timeout=10):
    results=[]
    headers={'User-Agent':'meet-me-in-bot/1.0'}
    for url in candidate_urls:
        try:
            r=requests.get(url, headers=headers, timeout=timeout); r.raise_for_status()
            soup=BeautifulSoup(r.text,'html.parser')
            selectors=['.event-item','.tribe-events-loop__event','.event','.listing','article','li.event']
            found=False
            for sel in selectors:
                nodes=soup.select(sel)
                if nodes:
                    for n in nodes:
                        title_el=n.find('a') or n.find(class_='entry-title') or n.find('h3')
                        title=title_el.get_text(strip=True) if title_el else club_name or 'Unknown'
                        link=title_el['href'] if title_el and title_el.has_attr('href') else url
                        time_el=n.find('time')
                        time=time_el['datetime'] if time_el and time_el.has_attr('datetime') else None
                        price_el=n.select_one('.price') or n.select_one('.ticket-price')
                        price=price_el.get_text(strip=True) if price_el else None
                        genre_el=n.select_one('.genre')
                        genre=genre_el.get_text(strip=True) if genre_el else None
                        results.append({'venue_name':title,'start_time':time,'ticket_price':price,'genre':genre,'postcode':postcode,'source_url': link if link.startswith('http') else urljoin(url, link)})
                    found=True
                    break
            if not found:
                for a in soup.find_all('a', href=True):
                    href=a['href']
                    if '/event' in href or '/events' in href or '/whats-on' in href:
                        results.append({'venue_name':club_name or 'Unknown','start_time':None,'ticket_price':None,'genre':None,'postcode':postcode,'source_url': href if href.startswith('http') else urljoin(url, href)})
            if results:
                break
        except Exception as e:
            print('candidate failed', url, str(e))
            continue
    return results
