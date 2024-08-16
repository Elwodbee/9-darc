// script.js
document.getElementById('convertButton').addEventListener('click', async () => {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Validate input
    if (!fromCurrency || !toCurrency || isNaN(amount) || amount <= 0) {
        document.getElementById('result').innerText = 'Please enter a valid amount.';
        return;
    }

    // API endpoint and options
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.rates && data.rates[toCurrency]) {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            document.getElementById('result').innerText = `Converted amount: ${convertedAmount} ${toCurrency}`;
        } else {
            document.getElementById('result').innerText = 'Conversion rate not available.';
        }
    } catch (error) {
        console.error(error);
        document.getElementById('result').innerText = 'Error fetching the conversion rate.';
    }
});
