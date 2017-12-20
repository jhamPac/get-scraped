const axios   = require('axios')
const chalk   = require('chalk')
const cheerio = require('cheerio')
const fs      = require('fs')
const yargs   = require('yargs')

let { url } = yargs.argv

const scrape = (url) => {
  axios.get(url)
  .then((response) => {
    let $ = cheerio.load(response.data)

    $('div#siteTable > div.link').each(function( index ) {
      let title = $(this).find('p.title > a.title').text().trim();
      let score = $(this).find('div.score.unvoted').text().trim();
      let user = $(this).find('a.author').text().trim();
      fs.appendFileSync('./reddit.txt', title + '\n' + score + '\n' + user + '\n');
    })
  })
  .catch((error) => {
    console.log(chalk.red(`[Error]: ${error}`))
    process.exit(1)
  })
}

scrape(url)
