const fs = require('fs');
let capy = fs.readFileSync('./src/pages/CapyLuluDetail.module.css', 'utf8');

const bannerCss = `
/* ── FULL WIDTH BANNERS ── */
.bannersSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--brand-light, #000);
  padding-bottom: 4rem;
}
.fullBanner {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.fullBanner img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}
`;

capy += '\n' + bannerCss;
fs.writeFileSync('./src/pages/CapyLuluDetail.module.css', capy);
