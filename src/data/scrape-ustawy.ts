const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs-extra");
const path = require("path");

const url =
  "https://sip.lex.pl/akty-prawne/dzu-dziennik-ustaw/prawo-o-ruchu-drogowym-16798732";
const SELECTOR = "main .a_sec-dz";

// const SELECTOR = "main";
// Example usage: scrape all <span> tags from url
scrapeTags(url, SELECTOR, 1).then((tags) => {
  console.log(tags);
  fs.writeJsonSync(path.join(__dirname, "ustawy.json"), tags);
});

async function scrapeTags(url, tagName, limit) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const html = await page.content();
  const $ = cheerio.load(html);

  const tags = $(tagName)
    .toArray()
    .slice(0, limit)
    .map((tag) => {
      return {
        // text: $(tag).text(),
        // html1: $(tag).html(),
        ustawa_108: $(tag).prop("outerHTML"),
      };
    });

  // await browser.close();

  return tags;
}

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto(url);

//   // Set screen size
//   await page.setViewport({ width: 1080, height: 1024 });

//   const mainSelector = "main";
//   await page.waitForSelector(mainSelector);

//   const html = await page.content();
//   const $ = cheerio.load(html);

//   const tags = $(tagName).toArray();

//   const htmlContent = await page.evaluate(
//     (mainSelector) => document.querySelector(mainSelector).innerHTML,
//     mainSelector
//   );

//   console.log("htmlContent===", htmlContent);

//   fs.writeFileSync("test.html", htmlContent);

//   // // Type into search box
//   // await page.type(".search-box__input", "automate beyond recorder");

//   // // Wait and click on first result
//   // const searchResultSelector = ".search-box__link";
//   // await page.waitForSelector(searchResultSelector);
//   // await page.click(searchResultSelector);

//   // // Locate the full title with a unique string
//   // const textSelector = await page.waitForSelector(
//   //   "text/Customize and automate"
//   // );
//   // const fullTitle = await textSelector?.evaluate((el) => el.textContent);

//   // // Print the full title
//   // console.log('The title of this blog post is "%s".', fullTitle);

//   // await browser.close();
// })();
