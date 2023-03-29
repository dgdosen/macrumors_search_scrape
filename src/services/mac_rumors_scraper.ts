import puppeteer from 'puppeteer';

const isHeadless = process.env.REACT_APP_BROWSER_HEADLESS_STATE === 'true';

export async function scrape(): Promise<boolean> {

  console.log('scraping macrumors');
  const browser = await puppeteer.launch({headless: isHeadless, executablePath: `${process.env.REACT_APP_BROWSER}`, args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://forums.macrumors.com/search/');

  const form = await page.$eval('.uix_contentWrapper', (div) => div.innerHTML);
 
  const postedByText = 'leman, name99, Confused-User, senttoschool';
  await page.type('.uix_contentWrapper input[name="c[users]"]', postedByText);
  
  await page.click('.uix_contentWrapper button[type="submit"]');

  await page.waitForSelector('.contentRow-snippet');

  const contentRowData = await page.$$eval('.block-row', elements =>
    elements.map(element => {
      const contentRowSnippet = element.querySelector('.contentRow-snippet')?.textContent || '';
      const name = element.querySelector('.username[itemprop="name"]')?.getAttribute('href') || '';
      return {
        contentRowSnippet,
        name,
      };
    })
  );

   console.log(contentRowData);

  //await page.waitForNavigation();
  //const content = await page.content();
  //console.log(content);
  await browser.close();

  return true;
}

