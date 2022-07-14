const currencyContainer = document.querySelector('.currencyContainer');
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const currentSearch = document.querySelector('#curentSearch');
const clearButton = document.querySelector('#clearButton');
const baseCurrencyText = document.querySelector('#baseCurrencyText');

const convertionAmount = document.querySelector('#convertionAmount');
const convertionInput = document.querySelector('#convertionCurrencyInput');
const convertionOutput = document.querySelector('#convertionCurrencyOutput');
const convertionAmountAswr = document.querySelector('#convertionAmountAswr');
const convertionInputAswr = document.querySelector('#convertionCurrencyInputAswr');
const convertionOutputAswr = document.querySelector('#convertionCurrencyOutputAswr');
const aswr = document.querySelector('#aswr');
const convertionText = document.querySelector('#convertionText');
const convertionClearButton = document.querySelector('#convertionClearButton');
const convertionForm = document.querySelector('#convertionForm');
const convertionAswr = document.querySelector('#convertionAswr');

const currencyURLgenerator = (endPoint, extraInfo) => {
  const baseURL = 'https://api.exchangerate.host/';
  return `${baseURL}${endPoint}?${extraInfo}`;
}

const fetchLatestCurrency = async (endPoint, extraInfo) => {
  try {
    const URL = currencyURLgenerator(endPoint, extraInfo)
    const response = await fetch(URL);
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error)
  }
}

const convertToHumanReadble = (CurrencyEntryes) => {
  const namedEntries = CurrencyEntryes.map((currency) => {
    switch (currency[0]) {
      case 'USD':
        currency[0] = 'United States dollar (USD)';
        return currency;
      case 'EUR':
        currency[0] = 'Euro (EUR)';
        return currency;
      case 'JPY':
        currency[0] = 'Japanese yen (JPY)';
        return currency;
      case 'GBP':
        currency[0] = 'Sterling (GBP)';
        return currency;
      case 'AUD':
        currency[0] = 'Australian dollar (AUD)';
        return currency;
      case 'CAD':
        currency[0] = 'Canadian dollar (CAD)';
        return currency;
      case 'CHF':
        currency[0] = 'Swiss franc (CHF)';
        return currency;
      case 'CNY':
        currency[0] = 'Renminbi (CNY)';
        return currency;
      case 'HKD':
        currency[0] = 'Hong Kong dollar (HKD)';
        return currency;
      case 'NZD':
        currency[0] = 'New Zealand dollar (NZD)';
        return currency;
      case 'SEK':
        currency[0] = 'Swedish krona (SEK)';
        return currency;
      case 'KRW':
        currency[0] = 'South Korean won (KRW)';
        return currency;
      case 'SGD':
        currency[0] = 'Singapore dollar (SGD)';
        return currency;
      case 'NOK':
        currency[0] = 'Norwegian krone (NOK)';
        return currency;
      case 'MXN':
        currency[0] = 'Mexican peso (MXN)';
        return currency;
      case 'INR':
        currency[0] = 'Indian rupee (INR)';
        return currency;
      case 'RUB':
        currency[0] = 'Russian ruble (RUB)';
        return currency;
      case 'ZAR':
        currency[0] = 'South African rand (ZAR)';
        return currency;
      case 'TRY':
        currency[0] = 'Turkish lira (TRY)';
        return currency;
      case 'BRL':
        currency[0] = 'Brazilian real (BRL)';
        return currency;
      default:
        return currency;
    }
  });
  return namedEntries;
}

const parseCurrencyData = ({ rates }) => {
  const entries = Object.entries(rates);
  const relevantEntries = entries.filter((currency) => {
    return currency[0] === 'USD' || currency[0] === 'EUR' || currency[0] === 'JPY' || currency[0] === 'GBP' || currency[0] === 'AUD' || currency[0] === 'CAD' || currency[0] === 'CHF' || currency[0] === 'CNY' || currency[0] === 'HKD' || currency[0] === 'NZD' || currency[0] === 'SEK' || currency[0] === 'KRW' || currency[0] === 'SGD' || currency[0] === 'NOK' || currency[0] === 'MXN' || currency[0] === 'INR' || currency[0] === 'RUB' || currency[0] === 'ZAR' || currency[0] === 'TRY' || currency[0] === 'BRL'
  });
  const sortedEntries = relevantEntries.sort((a, b) => a[1] - b[1]);
  const namedEntries = convertToHumanReadble(sortedEntries);
  const roundedEntries = namedEntries.map((entrie) => {
    const roundedNum = parseFloat(entrie[1]).toFixed(3);
    return [entrie[0], roundedNum]
  })
  return roundedEntries
}

const renderCurrencyData = (usefullData) => {
  usefullData.forEach((rate) => {
    const newDiv = document.createElement('div');
    newDiv.className = 'currencyDiv';
    newDiv.innerText = `${rate[0]} - ${rate[1]}`;
    currencyContainer.appendChild(newDiv);
  })
}

window.onload = () => {
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (currencyContainer.innerHTML !== '') {
      currentSearch.innerText = '';
      currencyContainer.innerHTML = '';
      baseCurrencyText.className = 'displayNone';
      clearButton.className = 'displayNone';
    }
    const currency = searchInput.value.toUpperCase();
    baseCurrencyText.className = 'displayView';
    currentSearch.innerText = currency;
    const data = await fetchLatestCurrency('latest', `base=${currency}`);
    const usefullData = parseCurrencyData(data);
    renderCurrencyData(usefullData);
    searchInput.value = '';
    clearButton.className = 'displayView';
  });
  clearButton.addEventListener('click', () => {
    currentSearch.innerText = '';
    currencyContainer.innerHTML = '';
    baseCurrencyText.className = 'displayNone';
    clearButton.className = 'displayNone';
  });
  convertionForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const amount = convertionAmount.value;
    const baseCurrency = convertionInput.value.toUpperCase();
    const desiredCurrency = convertionOutput.value.toUpperCase();
    const data = await fetchLatestCurrency('convert', `from=${baseCurrency}&to=${desiredCurrency}&amount=${amount}`);
    convertionText.className = 'displayView';
    convertionAmountAswr.innerText = amount;
    convertionInputAswr.innerText = baseCurrency;
    aswr.innerText = data.result.toFixed(3);
    convertionOutputAswr.innerText = desiredCurrency;
    convertionClearButton.className = 'displayView';
    convertionAswr.className = 'displayView';
    convertionAmount.value = '';
    convertionInput.value = '';
    convertionOutput.value = '';
  });
  convertionClearButton.addEventListener('click', () => {
    convertionText.className = 'displayNone';
    convertionAmountAswr.innerText = '';
    convertionInputAswr.innerText = '';
    aswr.innerText = '';
    convertionOutputAswr.innerText = '';
    convertionClearButton.className = 'displayNone';
    convertionAswr.className = 'displayNone';
  })
};
