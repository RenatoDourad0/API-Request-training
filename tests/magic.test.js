const fetchSimulator = require('../simulator/fetchSimulator');
const { getMagicCard, fetch } = require('../src/magic.js');
const { card } = require('../simulator/card');

jest.mock('node-fetch');
fetch.mockImplementation(fetchSimulator);

describe('Testa a função getMagicCard', () => {
  it('Deve possuir a propriedade name com o valor Ancestor\'s Chosen', async () => {
    const response = await getMagicCard('130550');
    // implemente seus testes aqui
  });
});