import express from 'express';
import puppeteer from 'puppeteer';
import {RTX3090,RTX3080TI,RTX3080,RTX3070TI,RTX3070,RTX3060TI,RTX3060,RTX2060,GTX1660TI} from './url.js'
const port = process.env.PORT || '5000';
const app = express();
let GList = []

async function scrapeProduct() {
  try {
    const array = []
    const url = [RTX3090,RTX3080TI,RTX3080,RTX3070TI,RTX3070,RTX3060TI,RTX3060,RTX2060,GTX1660TI]
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    process.once('unhandledRejection', () => {
      browser.close();
    });
    for (let i = 0; i < url.length; i++) {
      await page.goto(url[i])
      const result = await page.evaluate(() => {
        const List = []
        allProduct = document.querySelectorAll("div.prod_info")
        allProduct.forEach(ele => {
          if (ele.querySelector('ul.price_box > li > span.site_btn.orderNow > button') !== null || ele.querySelector('ul.price_box > li > span.site_btn.add24hCart > button') !== null) {
            const GraphicCard = {
              'name': ele.querySelector('a').innerText,
              'price': ele.querySelector('.value').innerText,
              'link': ele.querySelector('a').href
            }
            List.push(GraphicCard)
          }
        })
        return List;
      })
      array.push(result)
    }
    await browser.close();
    return array;
  } catch (err) {
    console.log(err);
    await browser.close();
  }
}

async function createList(){
  try {
    GList = [];
    GList.push(await scrapeProduct())
  }catch (err) {
    console.log(err);
  }
}

createList()
setInterval(()=>createList(),30000)

app.get('/', (req, res) => {
  res.send(GList);
})

app.listen(port, (req, res) => {
  console.log('server up')
})
