import express from 'express';
import puppeteer from 'puppeteer';

// import your own url
import { custom_here } from './url.js'
const port = process.env.PORT || '5000';
const app = express();
let GList = []

async function scrapeProduct() {
  try {
    const array = []
    const url = [custom_here]
    const browser = await puppeteer.launch({
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
        
        //custom your own DOM searchAll option
        allProduct = document.querySelectorAll(custom_option)
        
        allProduct.forEach(ele => {
          
          //custom your jquery methods
          
          if (custom_jquery_methods) {
            
            //custom your object
            
            const GraphicCard = {
              
              custom_here
              
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

async function createList() {
  try {
    const getData = await scrapeProduct()
    GList = []
    GList.push(getData)
  } catch (err) {
    console.log(err);
  }
}

createList()
setInterval(() => createList(), 90000)

app.get('/', (req, res) => {
  res.send(GList);
})

app.listen(port, (req, res) => {
  console.log('server up')
})
