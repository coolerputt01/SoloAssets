import requests
from bs4 import BeautifulSoup

class Asset():
    def __init__(self, title, link, preview):
        self.title = title
        self.link = link
        self.preview = preview
    
    def __repr__(self):
        return f"Asset(title='{self.title}', link='{self.link}')"

BASE_URL = "https://opengameart.org"
urls = ["https://opengameart.org/art-search?keys="]

headers = {
    "User-Agent": "SoloAssetsBot/1.0"
}

def scrape(keyword):

    if not keyword:
        raise ValueError("Keyword is invalid")
    
    url = f"{BASE_URL}/art-search?keys={keyword}"
    response = requests.get(url, headers=headers)
    print(response)
    soup = BeautifulSoup(response.text, "lxml")
    assets = soup.select(".views-row.art-previews-inline")
    #print(assets)

    for asset in assets:
        title = asset.select_one(".art-preview-title a").text.strip()
        link = BASE_URL + asset.select_one(".art-preview-title a")["href"]
        img_tag = asset.select_one(".field-item a img")["src"]

        a = Asset(title=title,link=link,preview=img_tag)
        print(repr(a))

scrape("grass")