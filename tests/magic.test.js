const fetchSimulator = require('../simulator/fetchSimulator');
const { getMagicCard, fetch } = require('../src/magic.js');
const { card } = require('../simulator/card');

jest.mock('node-fetch');
fetch.mockImplementation(fetchSimulator);

describe('Testa a função getMagicCard', () => {
  it('É uma função', async () => {
    // implemente seus testes aqui
  });
});