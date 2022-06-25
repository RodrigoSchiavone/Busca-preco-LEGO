
const puppeteer = require('puppeteer');
const csvContent = ["10949 Cuidando dos Animais da Fazenda"];;






const url = ["https://www.magazineluiza.com.br/", "https://www.amazon.com.br/"];
const inputSearch = ['input[type="search"]', '#twotabsearchtextbox'];
const waitSelector = ['h2', 'span'];
const nameSelector = ['h2[data-testid="product-title"]', 'span.a-size-base-plus.a-color-base.a-text-normal'];
const valueSelector = ['p[data-testid="price-value"]', 'span.a-price-whole'];

(async () => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  let names = [];
  let values = [];
  let productNames = [[], []];
  let productValues = [[], []];

  for (let urlIndex = 0; urlIndex < url.length; urlIndex++) {
    await page.goto(url[urlIndex]);
    console.log('open url ------->' + url[urlIndex]);


    console.log('start to search');
    console.log('---------------------------------------------------');

    for (let i = 0; i < csvContent.length; i++) {
      await page.waitForSelector(inputSearch[urlIndex]);

      console.log('clear search bar...');
      console.log('---------------------------------------------------');

      let searchInput = await page.$(inputSearch[urlIndex]);
      await searchInput.click({ clickCount: 3 });
      await searchInput.press('Backspace');

      await page.type(inputSearch[urlIndex], csvContent[i], + ' LEGO');
      await page.keyboard.press('Enter');

      console.log('searching for ' + csvContent[i]);
      console.log('---------------------------------------------------');

      await page.waitForSelector(waitSelector[urlIndex]);
      await page.waitForTimeout(6000);

      console.log('querySelectorAll')
      console.log('---------------------------------------------------');

      async function productNameInnerText(selector) {

        return page.evaluate((selector, index) => {

          console.log('waiting for selector' + selector);
          console.log('---------------------------------------------------');
          const nodeList = document.querySelectorAll(selector);
          const arrayName = [...nodeList];
          console.log('node list ------> array');
          console.log('---------------------------------------------------');
          const productNameList = arrayName.map(({ innerText }) => ({
            innerText
          }));

          return productNameList;
        }, selector);
      }

      async function productValueListInnerText(selector) {
        return page.evaluate((selector) => {
          console.log('waiting for selector' + selector);
          console.log('---------------------------------------------------');

          const nodeListValue = document.querySelectorAll(selector);
          const arrayValue = [...nodeListValue];


          console.log('node list ------> array');
          console.log('---------------------------------------------------');

          const productValueList = arrayValue.map(({ innerText }) => ({ innerText }));

          return productValueList;

        }, selector);


      }

      nameList = await productNameInnerText(nameSelector[urlIndex]);
      valueList = await productValueListInnerText(valueSelector[urlIndex]);

      names = [...nameList];
      values = [...valueList];

      let fullPrice = [];

     /* for (i = 0; i < values.length; i++) {
        fullPrice[i] = values[i].replace('/n', '.90');
        fullPrice[i] = values[i].replace('R$', '');
        fullPrice[i] = values[i].replace(',', '.');
      }*/

      productNames[urlIndex].push(names);
      productValues[urlIndex].push(values);
    }

  }

  console.log('---------------------------------------------------');
  console.log(productNames[0]);
  console.log('---------------------------------------------------');
  console.log(productValues[0]);
  console.log('---------------------------------------------------');
  console.log('---------------------------------------------------');
  console.log(productNames[1]);
  console.log('---------------------------------------------------');
  console.log(productValues[1]);
  console.log('---------------------------------------------------');


  await browser.close();
})();

