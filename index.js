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
    // mdLinks(path);
    options(path);
  } else {
    figlet('MarkdownLinks', (err, data) => {
      if (err) {
        log('Something went wrong...');
        console.dir(err);
      }
      log(chalk.magenta(data));
      log('    1.- Write down the path of your desired file \n    2.- Add a following option: --validate & --stats ');
    });
  }
};

const mdLinks = (path, options) => {
  const dir = fileDir.extname(path);
  fs.readFile(path, 'utf8', (err, content) => {
    if (dir !== '.md') {
      log(chalk.bgRed('Not an .md File', err));
    } else {
      parseMarked(content, options);
    }
  });
};

const parseMarked = (content, options) => {
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
  });
  fetchLinks(arrLinks, arrText, options);
};

const fetchLinks = (arrLinks, arrText, options) => {
  // Limpiando urls para hacer el fetch correctamente
 
  for (let i = 0; i < arrLinks.length; i++) {
    let link = arrLinks[i].slice(0, -1).substr(6);
    let text = arrText[i].slice(0, -4).substr(1);
    if (options.validate === false) {
      log(chalk.bgGreen('Link: ') + chalk.magenta(link) + '\n' + chalk.bgYellow('Text: ') + text);
    } else if (options.validate) {
      fetch(link)
        .then(res => {
          log(chalk.bgGreen('Link: ') + chalk.magenta(link) + '  ' + chalk.blue(res.statusText) + '\n' + chalk.bgYellow('Text: ') + text);
        });
    }
  }
};

const options = (path) => {
  let options = {
    validate: false,
    stats: false,
  };

  if (process.argv[3] === '--validate') {
    options.validate = true;
  } else if (process.argv[3] === '--stats') {
    options.stats = true;
  } else if (process.argv[3] === '--validate' && process.argv[4] === '--stats') {
    options.validate = true;
    options.stats = true;
  } else {
    log('Options: --validate & --stats');
  }
  mdLinks(path, options);
};

pathUndefined();
module.exports = {
  mdLinks,
  parseMarked,
  pathUndefined
};