const https = require('https');

https.get('https://aecooly.com/products/portable-handheld-fan-air-gimbal-capy-lulu-eidtion', (res) => {
  let html = '';
  res.on('data', (chunk) => { html += chunk; });
  res.on('end', () => {
    const urls = new Set();
    const regex = /(https:\/\/cdn\.shopify\.com\/[^\s"')]+\.(?:jpg|png|webp|gif))/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      if (!match[1].includes('icon') && !match[1].includes('logo') && match[1].includes('files')) {
        // clean URL
        let clean = match[1].split('?')[0]; // remove query params just for cleaner matching, or keep it
        urls.add(match[1]);
      }
    }
    console.log(Array.from(urls).join('\n'));
  });
}).on('error', (e) => {
  console.error(e);
});
