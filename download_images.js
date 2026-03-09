const https = require('https');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const queries = {
    "lawang-sewu-1.jpg": "Lawang Sewu",
    "lawang-sewu-2.jpg": "Lawang Sewu interior",
    "kota-lama-1.jpg": "Gereja Blenduk Semarang",
    "kota-lama-2.jpg": "Kota Lama Semarang",
    "sam-poo-kong-1.jpg": "Sam Poo Kong",
    "sam-poo-kong-2.jpg": "Sam Poo Kong temple Semarang",
    "kampung-pelangi-1.jpg": "Kampung Pelangi Semarang",
    "kampung-pelangi-2.jpg": "Kampung Pelangi"
};

const imgDir = path.join(__dirname, 'img');
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir);
}

const fetchJSON = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'ExplorSemarang/1.0 (test@example.com)' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
};

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'ExplorSemarang/1.0 (test@example.com)' } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
            }
            const file = fs.createWriteStream(filepath);
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => reject(err));
        });
    });
};

async function main() {
    for (const [filename, query] of Object.entries(queries)) {
        try {
            console.log(`Searching for: ${query}...`);
            const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${querystring.escape(query + ' filetype:bitmap')}&srnamespace=6&format=json`;
            const searchData = await fetchJSON(searchUrl);
            
            if (searchData.query.search.length > 0) {
                const title = searchData.query.search[0].title;
                const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${querystring.escape(title)}&prop=imageinfo&iiprop=url&format=json`;
                const infoData = await fetchJSON(infoUrl);
                
                const pages = infoData.query.pages;
                const pageId = Object.keys(pages)[0];
                if (pages[pageId].imageinfo) {
                    const imgUrl = pages[pageId].imageinfo[0].url;
                    console.log(`Downloading ${title} to ${filename} from ${imgUrl}`);
                    await downloadImage(imgUrl, path.join(imgDir, filename));
                    console.log(`Successfully downloaded ${filename}`);
                }
            } else {
                console.log(`No results for ${query}`);
            }
        } catch (e) {
            console.error(`Error processing ${query}:`, e.message);
        }
    }
}

main();
