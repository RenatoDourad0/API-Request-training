const fetchSimulator = require('../simulator/fetchSimulator');
const { getMagicCard } = require('../src/magic.js');
const { card } = require('../simulator/card');

window.fetch = jest.fn(fetchSimulator);

afterEach(jest.clearAllMocks);

describe('Testa a função getMagicCard', () => {
  it('É uma função', () => {

    // implemente seus testes aqui

  });
});