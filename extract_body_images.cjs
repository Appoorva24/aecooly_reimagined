const fs = require('fs');
const productsData = require('./src/products.json');
const capy = productsData.products.find(p => p.id === 12491509039422);

const html = capy.body_html;
const regex = /src="([^"]+)"/g;
let match;
const urls = new Set();
while ((match = regex.exec(html)) !== null) {
  urls.add(match[1]);
}

console.log(Array.from(urls).join('\n'));
