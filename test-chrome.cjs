const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 10000 });
    const html = await page.content();
    console.log('HTML Length:', html.length);
    if (html.length < 500) console.log(html);
    await browser.close();
  } catch (err) {
    console.error('SCRIPT ERROR:', err.message);
  }
})();
