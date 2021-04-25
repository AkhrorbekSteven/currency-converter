const form        = document.querySelector('form'),
    amountInput   = document.querySelector('#amountInput'),
    fromSelect    = document.querySelector('#fromSelect'),
    toSelect      = document.querySelector('#toSelect'),
    swapButton    = document.querySelector('.swap-currencies'),
    convertButton = document.querySelector('.convert-btn'),
    resultsBox    = document.querySelector('.results-box'),
    fromResult    = document.querySelector('.from-result'),
    toResult      = document.querySelector('.to-result'),
    fromTo        = document.querySelector('.from-to'),
    toFrom        = document.querySelector('.to-from')

let isSwapped = true
let currencies = [
    {value: 'USD', text: 'US Dollars', select: 'USD - US Dollar'},
    {value: 'AED', text: 'UAE Dirhams', select: 'AED - UAE Dirham'},
    {value: 'AUD', text: 'Australian Dollars', select: 'AUD - Australian Dollar'},
    {value: 'CAD', text: 'Canadian Dollars', select: 'CAD - Canadian Dollar'},
    {value: 'CHF', text: 'Swiss Francs', select: 'CHF - Swiss Franc'},
    {value: 'CNY', text: 'Danish Krones', select: 'CNY - Danish Krone'},
    {value: 'EGP', text: 'Egyptian Pounds', select: 'EGP - Egyptian Pound'},
    {value: 'EUR', text: 'EUROs', select: 'EUR - EURO'},
    {value: 'GBP', text: 'British Pounds', select: 'GBP - British Pound'},
    {value: 'ISK', text: 'Iceland Krones', select: 'ISK - Iceland Krone'},
    {value: 'JPY', text: 'Japanese Yens', select: 'JPY - Japanese Yen'},
    {value: 'KRW', text: 'South Korean Wons', select: 'KRW - South Korean Won'},
    {value: 'KWD', text: 'Kuwaiti Dinars', select: 'KWD - Kuwaiti Dinar'},
    {value: 'LBP', text: 'Lebanese Pounds', select: 'LBP - Lebanese Pound'},
    {value: 'MYR', text: 'Malaysian Ringgits', select: 'MYR - Malaysian Ringgit'},
    {value: 'NOK', text: 'Norwegian Krones', select: 'NOK - Norwegian Krone'},
    {value: 'PLN', text: 'Polish Zlotys', select: 'PLN - Polish Zloty'},
    {value: 'RUB', text: 'Russian Roubles', select: 'RUB - Russian Rouble'},
    {value: 'SEK', text: 'Swedish Krones', select: 'SEK - Swedish Krone'},
    {value: 'SGD', text: 'Singapore Dollars', select: 'SGD - Singapore Dollar'},
    {value: 'TRY', text: 'New Turkish Liras', select: 'TRY - New Turkish Lira'}
] 

if (amountInput.value < 0) {
    amountInput.value = 0
}

async function getApi(from, to, amount) {
    let response = await fetch(`https://currency-converter13.p.rapidapi.com/convert?from=${from}&to=${to}&amount=${amount}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0540c2b4a1mshfafba11fd229e45p1b9796jsn33b70550180e",
            "x-rapidapi-host": "currency-converter13.p.rapidapi.com"
        }
    })
    let data = await response.json()
    return data
} 

function selectRenderer(array) {
    fromSelect.innerHTML = null
    toSelect.innerHTML = null
    for (let index in array) {
        let option = document.createElement('option')

        option.value     = array[index].value
        option.innerText = array[index].select

        if (isSwapped) {
            if (index == 0) {
                fromSelect.appendChild(option)
            } else {
                toSelect.appendChild(option)
            }
        } else {
            if (index == 0) {
                toSelect.appendChild(option)
            } else {
                fromSelect.appendChild(option)
            }
        }
    }
}
selectRenderer(currencies)

async function getData () {
    let data = await getApi(fromSelect.value, toSelect.value, amountInput.value)

    resultsBox.classList.add('active')
    convertButton.classList.add('hide')

    let found1 = currencies.find(event => event.value == fromSelect.value)
    let found2 = currencies.find(event => event.value == toSelect.value)

    fromResult.innerHTML = `
        <span>${amountInput.value}</span>
        <span>${found1.text} = </span>
    `
    toResult.innerHTML = `
        <span>${data.amount}</span>
        <span>${found2.text}</span>
    `
    fromTo.innerHTML = `
        <span>1 ${data.from} </span>
        <span>= ${data.amount / amountInput.value} ${data.to}</span>
    `
    toFrom.innerHTML = `
        <span>1 ${data.to} </span>
        <span>= ${amountInput.value / data.amount} ${data.from}</span>
    `
}

form.onsubmit = async (event) => {
    event.preventDefault()
    getData()
    amountInput.onkeyup = async () => {
        getData()
    }
}

swapButton.onclick = async () => {
    isSwapped = !isSwapped
    selectRenderer(currencies)
    getData()
}

fromSelect.onchange = () => {
    getData()
}

toSelect.onchange = () => {
    getData()
}