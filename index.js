const fs = require('fs');
const chalk = require('chalk');
const fileDir = require('path');
const marked = require('marked');
const path = process.argv[2];
const log = console.log;
const dir = fileDir.extname(path);


const mdLinks = (path) => {
  fs.readFile(path, 'utf8', (err, content) => {
    if (dir !== '.md') {
      console.log('Not an .md File', err);
    } else {
      parseMarked(content);
    }
  });
};

const parseMarked = (content) => {
  const toHtml = marked(content);
  const regExp = /href="(.*?)"/g;
  const links = toHtml.match(regExp);
  links.forEach((urls) = (links) => {
    log(chalk.bgGreen('Link: ') + chalk.magenta(links));
  });

};

mdLinks(path);

module.exports = {
  mdLinks,
};