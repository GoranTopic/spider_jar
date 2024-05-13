import { jars, store } from 'spider-jar';
import home_script from './scripts/navHomePage.js';
import scrap_cedula from './scraper/scrap_cedula.js';
import parse_author from './parser/parse_author.js';


let crawl_home_page = async spider => {
    let proxy = spider.proxy;
    let country = spider.country;
    let name = spider.name;
    let firstName = spider.firstName;
    let LastName = spider.LastName;
    let id = spider.id;
    // important methods
    let cluster = spider.cluster;
    let page = spider.page;
    // wait function 
    await spider.wait.for.minutes(1);
    // get cedulas from store
    let checklist = store['cedulas'].checklist();
    let cedula = checklist.next();
    // get links from page
    let authors_links = spider.getLinks(/aunthors.*/);
    let posts_links = spider.getLinks(/posts.*/);
    // enqueue functions
    for( let author_link of authors_links ) 
        spider.run('crawl_author', author_link);
    // wait until each function is done is finished
    for( let post of posts_links ) 
        await spider.run('crawl_post', post);
    // enquee in cluster the whole cluster
    let post = posts_links[0];
    cluster.run('crawl_post', post);
    // cluster get single slider
    post = posts_links[2];
    let spiderBro = cluster.get('spider bro 21');
    spiderBro.run('crawl_post', post);
    // create new spider
    let newSpider = await cluster.createSpider('spider bro 22');
    // run function in new spider
    newSpider.run('crawl_post', post);
}

let crawl_author = async (spider, param) => {
    // in this case the param is the link
    let url = param;
    let page = spider.page;
    // go to page
    await page.goto(url);
    // parse the data
    let author_data = await parse_author(page.html());
    // save in store
    await store['authors'].push(author_data);
}

let crawl_post = async (spider, param) => {
    // in this case the param is the link
    let url = param;
    let page = spider.page;
    // go to page
    await page.goto(url);
    // parse the data
    let post_data = await parse_post(page.html());
    // save in store
    await store['posts'].push(post_data);
}

jars( [ crawl_home_page, crawl_author, crawl_post ], {
        spiders: 2,
        proxies: './path/to/proxies.txt',
    });



    
