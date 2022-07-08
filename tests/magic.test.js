require('../simulator/fetchSimulator');
const { getMagicCard } = require('../src/magic.js');
const { card } = require('../simulator/card');

describe('Testa a função getMagicCard', () => {
  it('Deve possuir a propriedade name com o valor Ancestor\'s Chosen', async () => {
    expect.assertions(1);
    const response = await getMagicCard('130550');
    expect(response.name).toBe("Ancestor's Chosen");
  });
  it('esta definida', async () => {
    expect.assertions(2);
    expect(getMagicCard()).toBeDefined();
    expect(typeof getMagicCard).toBe('function');
  });
  it('se a funcao fetch foi chamada', async () => {
    expect.assertions(1);
    const response = await getMagicCard('130550');
    expect(fetch).toHaveBeenCalledTimes(1)
  });
  it('se a funcao fetch foi chamada com o endpoint https://api.magicthegathering.io/v1/cards/130550', async () => {
    expect.assertions(1);
    const response = await getMagicCard('130550');
    expect(fetch).toHaveBeenCalledWith('https://api.magicthegathering.io/v1/cards/130550')
  });
  it('Deve retornar o objeto correto', async () => {
    expect.assertions(1);
    const response = await getMagicCard('130550');
    const obj = { name: "Ancestor's Chosen",
      manaCost: "{5}{W}{W}",
      types: [ "Creature" ],
      subtypes: [ "Human", "Cleric" ],
      rarity: "Uncommon"
    }
    expect(response).toEqual(obj);
  });
  it('retorna erro "Id is not found!" quando chamado com idDesconhecido', async () => {
    const response = await getMagicCard('idDesconhecido');
    expect(response).toEqual(new Error("Id is not found!"))
  });
});
