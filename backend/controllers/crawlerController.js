import CrawledPage from '../models/CrawledPageModel';
const puppeteer = require('puppeteer');

function ifUndefined(value){
  if(value===undefined || value===''){
    return ' ';
  }
  return value;
}

function checkUrl(url){
  if(url.includes('https://') || url.includes('http://')){
    return url;
  }
  return 'https://'+url;
}

export const crawl = async (req, res) => {
  const {url} = req.body;
  try {
    const options = {
      headless: true,
      defaultViewport: null,
      args: ['--window-size=1920,1080'],
    };

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(checkUrl(url));

    /// get title from title tag
    const title = await page.evaluate(()=>{
      try {
        return document.querySelector('title').textContent;
      } catch (e){
        return undefined;
      }
    });
    /// get description from meta tag
    let description = await page.evaluate(() => {
      try {
        return document.head.querySelector('meta[property="og:description"]').getAttribute('content');
      } catch (e){
        try {
          return document.head.querySelector('meta[name="description"]').getAttribute('content');

        } catch(e){
          return undefined;
        }
      }
    });
    /// get title from meta tag
    let title1 = await page.evaluate(() => {
      try {
        return document.head.querySelector('meta[property="og:title"]').getAttribute('content');
      } catch (e){
        return undefined;
      }
    });
    //// get first heading from h1 tag
    const h1 = await page.evaluate(()=>{
      try {
        return document.querySelector('h1').textContent;
      } catch (e){
        return undefined;
      }
    });
    //// get second heading from h2 tag
    const h2 = await page.evaluate(()=>{
      try {
        return document.querySelector('h2').textContent;
      } catch (e){
        return undefined;
      }
    });
    if(title1===undefined){
      title1 = title;
    }
    /// get number of links in a page
    let count =0;
    try {
      const pageFrame = page.mainFrame();
      const elems = await pageFrame.$$('a');
      count = elems.length;
    } catch(e){
      count =0;
    }


    await browser.close();
    const crawledPage = CrawledPage({
      description:ifUndefined(description),
      url:url,
      title:ifUndefined(title1),
      h1: ifUndefined(h1),
      h2:ifUndefined(h2),
      links: count,
    });
    const foundPage = await CrawledPage.findOne({url:url});
    if(!foundPage){
      await crawledPage.save();
      return res.json(crawledPage);
    }else {
      let oldPage = await CrawledPage.findOneAndUpdate({ url: url }, {  updateDate: crawledPage.updateDate, title: crawledPage.title,h1:crawledPage.h1,h2:crawledPage.h2,links:count,description:crawledPage.description }, { upsert: true });
      return res.json(oldPage);
    }
  } catch(e){
    return res.status(400).json(e);
  }



};

//load history using mongoose -> https://mongoosejs.com/
export const getHistory = (req, res) => {
  CrawledPage.find().sort({updateDate:-1}).find({}, (error, pages) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.send(pages);
  });
};
