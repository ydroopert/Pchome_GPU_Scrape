import express from 'express';
import puppeteer from 'puppeteer';
const port = process.env.PORT || '5000';
const app = express();
let GList = [];
// ul.price_box > li:nth-child(2) > span > button"  "ul.price_box > li > span.site_btn.orderNow > button"
async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.goto(url);
    const textContent = await page.evaluate(() => {
        let List= []
        const result = document.querySelectorAll("div.prod_info");
        result.forEach(ele => {if(ele.querySelector('ul.price_box > li > span.site_btn.orderNow > button')!== null || ele.querySelector('ul.price_box > li > span.site_btn.add24hCart > button')!==null){
            console.log(ele);
                const GraphicCard = {
                    'name': ele.querySelector('a').innerText,
                    'price': ele.querySelector('.value').innerText,
                    'link': ele.querySelector('a').href
                }
                List.push(GraphicCard);
            }
        });
        return List;
    })
    browser.close();
    return textContent;
}
async function createList() {
    GList = [];
    const RTX3090 =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADHJ'))
    const RTX3080TI =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADIS'))
    const RTX3080 =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADHG'))
    const RTX3070TI =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADIW'))
    const RTX3070 =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADHM'))
    const RTX3060TI =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADHV'))
    const RTX3060 =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADI7'))
    const RTX2060 =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADF7'))
    const GTX1660TI =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADFJ'))
    const GTX1660Super =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADAP'))
    const GTX1660 =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADFL'))
    const GTX1650Super =(await scrapeProduct('https://24h.pchome.com.tw/store/DRADGR'))

    GList.push(RTX3090,RTX3080TI,RTX3080,RTX3070TI,RTX3070,RTX3060TI,RTX3060,RTX2060,GTX1660TI,GTX1660Super,GTX1660,GTX1650Super)
  }
  setTimeout(() => { createList() }, 13000)

app.get('/',(req,res) => {
    res.send(GList);
})

app.listen(port, (req,res)=> {
    console.log('server up')
})