const fs = require('fs');
const chalk = require('chalk');
const fileDir = require('path');
const marked = require('marked');
const figlet = require('figlet');
const log = console.log;

const pathUndefined = () => {
  let path;
  if (process.argv[2]) {
    path = process.argv[2];
    mdLinks(path);
  } else {
    figlet('MarkdownLinks', (err, data) => {
      if (err) {
        log('Something went wrong...');
        console.dir(err);
      }
      log(chalk.magenta(data));
    });
  }
};

const mdLinks = (path) => {
  const dir = fileDir.extname(path);
  fs.readFile(path, 'utf8', (err, content) => {
    if (dir !== '.md') {
      log(chalk.bgRed('Not an .md File', err));
    } else {
      parseMarked(content);
    }
  });
};

const parseMarked = (content) => {
  const toHtml = marked(content);
  const regExp = /href="(.*?)"/g;
  const regExpText = />[^<]*<[ ]*\/a[ ]*>/g;
  const links = toHtml.match(regExp);
  const textLinks = toHtml.match(regExpText);
  // let arr = [];

  // textLinks.forEach((url) = (textLinks) => {
  //   arr.push(textLinks);
  // });
  links.forEach((urls) = (links) => {
    // arr.push(links)
    log(chalk.bgGreen('Link: ') + chalk.magenta(links.split('href=')));
  });
  // console.log(arr)
};

pathUndefined();
module.exports = {
  mdLinks,
  parseMarked,
  pathUndefined
};