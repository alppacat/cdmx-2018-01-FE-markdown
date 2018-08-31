const fs = require('fs');

const mdLinks = () => {
  fs.readFile('./README.md', 'utf8', (err, content) => {
    if (err) throw err;
    console.log(content);
  });
};

module.exports = {
  mdLinks,
};

mdLinks();