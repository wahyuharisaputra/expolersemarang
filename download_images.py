import urllib.request
import urllib.parse
import json
import os

queries = {
    "lawang-sewu-1.jpg": "Lawang Sewu",
    "lawang-sewu-2.jpg": "Lawang Sewu interior",
    "kota-lama-1.jpg": "Gereja Blenduk",
    "kota-lama-2.jpg": "Kota Lama Semarang",
    "sam-poo-kong-1.jpg": "Sam Poo Kong",
    "sam-poo-kong-2.jpg": "Sam Poo Kong temple Semarang",
    "kampung-pelangi-1.jpg": "Kampung Pelangi Semarang",
    "kampung-pelangi-2.jpg": "Kampung Pelangi"
}

os.makedirs("img", exist_ok=True)

for filename, query in queries.items():
    try:
        # Search for file
        search_url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query + ' filetype:bitmap')}&srnamespace=6&format=json"
        req = urllib.request.Request(search_url, headers={'User-Agent': 'ExplorSemarangBot/1.0 (https://github.com/example/explorsemarang) Python/urllib'})
        res = urllib.request.urlopen(req)
        data = json.loads(res.read())
        
        if data['query']['search']:
            title = data['query']['search'][0]['title']
            
            # Get image URL
            info_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json"
            req2 = urllib.request.Request(info_url, headers={'User-Agent': 'ExplorSemarangBot/1.0'})
            res2 = urllib.request.urlopen(req2)
            data2 = json.loads(res2.read())
            
            pages = data2['query']['pages']
            page_id = list(pages.keys())[0]
            if 'imageinfo' in pages[page_id]:
                img_url = pages[page_id]['imageinfo'][0]['url']
                print(f"Downloading {title} to {filename} from {img_url}")
                
                # Download
                req3 = urllib.request.Request(img_url, headers={'User-Agent': 'ExplorSemarangBot/1.0'})
                with urllib.request.urlopen(req3) as response, open(f"img/{filename}", 'wb') as out_file:
                    out_file.write(response.read())
            else:
                print(f"No imageinfo for {title}")
        else:
            print(f"No results for {query}")
    except Exception as e:
        print(f"Error processing {query}: {e}")
