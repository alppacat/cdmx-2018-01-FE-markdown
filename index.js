const fs = require('fs');

const mdLinks = () => {
  fs.readFile('./algo.md', 'utf8', (err, content) => {
    if (err) throw err;
    console.log(content);
  });
};

module.exports = {
  mdLinks,
};

mdLinks();