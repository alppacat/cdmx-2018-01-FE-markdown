const fs = require('fs');
const chalk = require('chalk');
const fileDir = require('path');
const marked = require('marked');
const figlet = require('figlet');
const fetch = require('node-fetch');
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
  let arrLinks = [];
  let arrText = [];

  textLinks.forEach((url) = (textLinks) => {
    arrText.push(textLinks);
  });
  links.forEach((urls) = (links) => {
    arrLinks.push(links);
    // log(chalk.bgGreen('Link: ') + chalk.magenta(links.split('href=')));
  });
  fetchLinks(arrLinks, arrText);
  // for (let i = 0; i < arrLinks.length; i++) {
  //   log(chalk.bgGreen('Link: ') + chalk.magenta(arrLinks[i].split('href=')) + '\n' + chalk.bgYellow('Text: ') + chalk.magenta(arrText[i].split('</a>')));
  // }
};

const fetchLinks = (arrLinks, arrText) => {
  // Limpiando urls para hacer el fetch correctamente
 
  for (let i = 0; i < arrLinks.length; i++) {
    let link = arrLinks[i].slice(0, -1).substr(6);
    let text = arrText[i].slice(0,-4).substr(1);
    let statusLink = [];
    fetch(link)
      .then(res => {
        log(chalk.bgGreen('Link: ') + chalk.magenta(link) + '  ' + chalk.blue(res.statusText) + '\n' + chalk.bgYellow('Text: ') + text);
      });
  }
};

pathUndefined();
module.exports = {
  mdLinks,
  parseMarked,
  pathUndefined
};