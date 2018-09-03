const fs = require('fs');
const chalk = require('chalk');
const fileDir = require('path');
const marked = require('marked');
const log = console.log;
// const dir = fileDir.extname(path);

const pathUndefined = () => {
  let path;
  if (process.argv[2]) {
    path = process.argv[2];
    mdLinks(path);
  } else {
    log('Escribe tu direccion');
  }
};

const mdLinks = (path) => {
  const dir = fileDir.extname(path);
  fs.readFile(path, 'utf8', (err, content) => {
    if (dir !== '.md') {
      log('Not an .md File', err);
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

pathUndefined();
module.exports = {
  mdLinks,
};