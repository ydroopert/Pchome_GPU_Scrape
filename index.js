import express from 'express';
import puppeteer from 'puppeteer';
const port = process.env.PORT || '5000';
const app = express();
let GList = [];

async function scrapeProduct(url){
    
    //puppeteer setup
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.goto(url);
    const textContent = await page.evaluate(() => {
        
        //getting element with Jquery then push object to array
        
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
    // import url here
    
    GList = [];
    const product = (await scrapeProduct(url))

    GList.push(product)
  }
//auto update
  setTimeout(() => { createList() }, 13000)

app.get('/',(req,res) => {
    res.send(GList);
})

app.listen(port, (req,res)=> {
    console.log('server up')
})
