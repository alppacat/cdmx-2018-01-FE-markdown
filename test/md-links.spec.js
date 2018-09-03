const { mdLinks} = require('../index');

describe('Function mdLinks', () => {
  test('Debería ser una función', () => {
    expect(mdLinks('.md')).toBe(string);
  });
});