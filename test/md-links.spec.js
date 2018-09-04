
const { mdLinks} = require('../index');
const {pathUndefined} = require('../index');
const {parseMarked} = require('../index');
const {chalk} = require('chalk');
const {fileDir} = require('path');
const {marked} = require('marked');
const {figlet} = require('figlet');

describe('Function mdLinks', () => {
  test('It should be', () => {
    expect(mdLinks('./READMELabo.md')).toBe();
  });
});
describe('Path undefined Function', () => {
  test('It should be...', () => {
    expect(pathUndefined(process.argv[2]).toBeFalsy());
  });
});

describe('Parse Marked function', () => {
  test('It should be...', () => {
    expect(parseMarked().toBe());
  });
});