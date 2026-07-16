const fs = require('fs');
fetch('https://aecooly.com/products/portable-handheld-fan-air-gimbal-capy-lulu-eidtion')
  .then(res => res.text())
  .then(html => {
    const urls = new Set();
    const regex = /src="([^"]+cdn\.shopify\.com[^"]+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      if (match[1].includes('files') || match[1].includes('products')) {
        urls.add(match[1]);
      }
    }
    
    // Also try checking for data-src or background-image
    const dataRegex = /data-src="([^"]+cdn\.shopify\.com[^"]+)"/g;
    while ((match = dataRegex.exec(html)) !== null) {
      urls.add(match[1]);
    }

    const bgRegex = /url\(([^)]+cdn\.shopify\.com[^)]+)\)/g;
    while ((match = bgRegex.exec(html)) !== null) {
      urls.add(match[1].replace(/['"]/g, ''));
    }

    console.log(Array.from(urls).join('\n'));
  });
