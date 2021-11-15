const cardInfo = require('./card');

const ENDPOINT = {
  CARD: 'https://api.magicthegathering.io/v1/cards/130550',
};

const TIME_IN_MILLISECONDS = 200;

const fetchSimulator = (url) => {
  if (typeof url === undefined || url.endsWith('undefined')) {
    return Promise.reject(new Error('You must provide an url'));
  }

  const validUrl = Object.values(ENDPOINT).includes(url);

  return Promise.resolve({
    status: validUrl ? 200 : 400,
    ok: validUrl,
    json: () => new Promise((resolve) => {
      setTimeout(() => {
        if (url === ENDPOINT.CARD) {
          return resolve(cardInfo);
        }
    
        return resolve({ results: [] });
      }, TIME_IN_MILLISECONDS);
    }),
  });
}

module.exports = fetchSimulator;