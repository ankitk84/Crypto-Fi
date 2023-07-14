import React, { useState, useEffect, useParams } from 'react';
const CurrencyConverter = () => {
  let {id} = useParams();
  console.log(id, 'cc')
  const [amountUsd, setAmountUsd] = useState('');
  const [amountBtc, setAmountBtc] = useState('');
  const [conversionRate, setConversionRate] = useState(null);

  useEffect(() => {
    fetchConversionRate();
  }, []);

  const fetchConversionRate = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd');
      const data = await response.json();
      const rate = data.bitcoin.usd;
      console.log(rate, 'rate')
      setConversionRate(rate);
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
    }
  };

  const handleAmountUsdChange = (e) => {
    const usdAmount = e.target.value;
    setAmountUsd(usdAmount);
    const btcAmount = usdAmount / conversionRate;
    setAmountBtc(btcAmount.toFixed(8));
  };

  const handleAmountBtcChange = (e) => {
    const btcAmount = e.target.value;
    setAmountBtc(btcAmount);
    const usdAmount = btcAmount * conversionRate;
    setAmountUsd(usdAmount.toFixed(2));
  }; 

  return (
    <div>
      <div>
        <label htmlFor="usdInput">USD</label>
        <input
          id="usdInput"
          type="text"
          value={amountUsd}
          onChange={handleAmountUsdChange}
        />
      </div>

      <div>
        <label htmlFor="btcInput">BTC</label>
        <input
          id="btcInput"
          type="text"
          value={amountBtc}
          onChange={handleAmountBtcChange}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
