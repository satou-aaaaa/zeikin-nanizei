// アプリのアイコン（icon-192.png・icon-512.png）を作る。深い緑の地に、「税」と書いた金色の硬貨。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#1f4d3a"/>
      <circle cx="50" cy="52" r="34" fill="#f6d77a" stroke="#fffdf7" stroke-width="4"/>
      <text x="50" y="66" text-anchor="middle" font-size="40" font-weight="900" fill="#1f4d3a" font-family="'Noto Sans CJK JP','IPAPGothic',sans-serif">税</text></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
