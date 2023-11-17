import { Spider, Jars, Proxies_rotator } from 'spider_jar'

let jars = new Jars({
    proxy_rotator: proxy_rotator('/file/path/'),
    jarNumbers: 100,
})

jars.start(start_urls);


