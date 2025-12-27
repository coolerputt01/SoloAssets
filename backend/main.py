import requests
from bs4 import BeautifulSoup

class Asset:
    def __init__(self, title, link, preview):
        self.title = title
        self.link = link
        self.preview = preview
    
    def __repr__(self):
        return f"Asset(title='{self.title}', link='{self.link}')"

HEADERS = {
    "User-Agent": "SoloAssetsBot/1.0"
}

def scrape_opengameart(keyword):
    try:
        BASE_URL = "https://opengameart.org"
        url = f"{BASE_URL}/art-search?keys={keyword}"
        response = requests.get(url, headers=HEADERS)
        print(f"OGArt response: {response.status_code}")
        soup = BeautifulSoup(response.text, "lxml")
        rows = soup.select(".views-row.art-previews-inline")

        results = []
        for asset in rows:
            title_tag = asset.select_one(".art-preview-title a")
            img_tag = asset.select_one(".field-item a img")

            if not title_tag or not img_tag:
                continue  # skip if missing

            title = title_tag.text.strip()
            link = BASE_URL + title_tag["href"]
            img_src = img_tag["src"]

            results.append(Asset(title, link, img_src))
        return results

    except Exception as e:
        print("Error scraping OpenGameArt:", e)
        return []


def scrape_craftpix(keyword):
    BASE_URL = "https://craftpix.net"
    url = f"{BASE_URL}/?s={keyword}"
    response = requests.get(url, headers=HEADERS)
    print(f"CraftPix response: {response.status_code}")
    soup = BeautifulSoup(response.text, "lxml")
    
    results = []
    assets = soup.select("article .blog-grid-item")
    for asset in assets:
        title = asset.select_one(".entry-info .entry-title a").text.strip()
        link = asset.select_one(".entry-info .entry-title a")["href"]
        preview = asset.select_one("figure a img")["src"]
        results.append(Asset(title=title, link=link, preview=preview))
    return results


SCRAPE_HANDLERS = {
    "https://opengameart.org": scrape_opengameart,
    "https://craftpix.net": scrape_craftpix,
}

def scrape_all(keyword):
    all_results = []
    for base_url, handler in SCRAPE_HANDLERS.items():
        try:
            results = handler(keyword)
            all_results.extend(results)
        except Exception as e:
            print(f"Error scraping {base_url}: {e}")
    return all_results


if __name__ == "__main__":
    keyword = "grass"
    results = scrape_all(keyword)
    for r in results:
        print(repr(r))
