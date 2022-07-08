const { saveFavoriteMagicCard } = require('../src/magic.js');
const favoriteCards = require('../data/favoriteCards.js');

const retrievesFavoriteCards = (elem) => {
  return elem.map((curr) => curr.name)
}

describe(' Testa a função saveFavoriteMagicCard', () => {
  afterEach(() => {
    favoriteCards.splice(-2, 2)
    return favoriteCards
  })
  it('Testa se um novo card é adicionado a cada execução', async () => {
    expect.assertions(3);
    await saveFavoriteMagicCard('130553');
    expect(favoriteCards.length).toBe(5);
    expect(favoriteCards[favoriteCards.length - 1].name).toBe('Beacon of Immortality');
    await saveFavoriteMagicCard('130554');
    expect(favoriteCards.length).toBe(6);
  });

  it('Deve retornar favoriteCards contendo apenas os cards favoritos iniciais', () => {
    expect.assertions(2);
    expect(favoriteCards).toHaveLength(4);
    expect(retrievesFavoriteCards(favoriteCards)).toEqual([
      "Ancestor's Chosen",
      'Angel of Mercy',
      'Aven Cloudchaser',
      'Ballista Squad'
    ])
  });
});
