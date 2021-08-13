auto scraper

this app allows you to open a browser with puppeteer and scrape for custom products.

feel free to cusomise the jquery and urls for yoru need!

the app opens up a browser and perform a for loop to go through all the urls provided and retrieve desired info from the web and push into an array then finally closes the browser and return the array as JSON. The app also support automation with setInterval method for constant updating the array.

此APP以PUPPETEER來獲取頁面資料並統整成ARRAY後以JSON形式回傳

將CUSTOM處修改來獲得資料


Heroku  EX.

(suggest extending the interval time for heroku due to issue with long waiting time at the for loop on heroku. 90sec is stable for 9 goto pages)


GPU scraper for PChome
自動刷新統整PCHOME現有庫存能購買的顯卡(GTX1660TI~RTX3090系列)並以JSON形式傳回

LINK:https://pchome-gpu.herokuapp.com/

returns 

{

"name": "3070",

"price": "12345",

"link": "https://24h.pchome.com.tw/XXX"

}
