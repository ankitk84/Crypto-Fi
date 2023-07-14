import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoContext } from './CryptoContext';

const Currencyconvert = () => {
    let { id } = useParams();
  console.log(id, 'cc');
  let { getCoinData, coinData: data } = useContext(CryptoContext);

  useEffect(() => {
   
    console.log(id, 'cc id2 ');
    getCoinData(id);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const [Coin, setCoin] = useState({
    qty: "",
    rate: "",
    token: ""
  });


  const [conversionRate, setConversionRate] = useState(null);
  const [rate, setrate] = useState('');
  const [qty, setqty] = useState('');

  useEffect(() => {
    if (data) {
      setCoin((prevCoin) => ({
        ...prevCoin,
        token: data.symbol,
        rate: data.market_data.current_price.usd,
        qty:'1'
      }
      ));
      setConversionRate(data.market_data.current_price.usd);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleAmountUsdChange = (e) => {
    const usdAmount = e.target.value;
    setrate(usdAmount);
    const btcAmount = usdAmount / conversionRate;
    setqty(btcAmount.toFixed(8));
  };

  const handleAmountBtcChange = (e) => {
    const btcAmount = e.target.value;
    setqty(btcAmount);
    const usdAmount = btcAmount * conversionRate;
    setrate(usdAmount.toFixed(2));
  }; 
 

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setCoin((prevCoin) => ({
      ...prevCoin,
      [name]: value
    }));  
  };

  const handleBuy = async (qty, rate, token) => {
    // Perform buy action using the buyAmount state variable
    // e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/buyOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Coin)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // POST request successful
        console.log(data.message,'Buycoin data submitted successfully');
        console.log(data); // Response data from the server
      } else {
        // Handle error cases
        console.error('Failed to submit Buycoin data');
        console.error(data); // Error message from the server
      }
    } catch (error) {
      console.error('Error occurred while submitting Buycoin data:', error);
    }
  };

  const handleSell = async(qty, rate, token) => {
    // Perform sell action using the sellAmount state variable
    // e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/SellOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Coin)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // POST request successful
        console.log(data.message,'Sellcoin data submitted successfully');
        console.log(data); // Response data from the server
      } else {
        // Handle error cases
        console.error('Failed to submit Sellcoin data');
        console.error(data); // Error message from the server
      }
    } catch (error) {
      console.error('Error occurred while submitting Sellcoin data:', error);
    }
  };
  return (
    <>
    <div className=" ">
        <div className="card-body ">
          {/* <h5 className="card-title">Sell</h5> */}

          {data && (
            // <form onSubmit={handleSubmit}>
            <div>

        {/* <label style={{ paddingTop: 5 }}>Token</label> */}
             <div style={{display:"flex", marginLeft:"auto", marginRight:"auto",justifyContent:"space-around"}}>
            
             <div>
                <label style={{color:"black",margin:5}} htmlFor="usdInput">USD</label>
                <input
                  id="usdInput"
                  type="text"
                  style={{border:"1px solid silver", borderRadius:5, height:35}}
                  // placeholder="Enter USD"
                  placeholder={` ${data.market_data.current_price.usd}`}
                  value={Coin.rate = rate}
                  onChange={handleAmountUsdChange}
                />
              </div>

              <div>
                <label style={{color:"black", margin:5}} htmlFor="btcInput">{Coin.token.toUpperCase()}</label>
                <input
                  id="btcInput"
                  type="text"
                  // placeholder={'Enter' ${Coin.token}}
                  placeholder=' 1'
                  style={{border:"1px solid silver", borderRadius:5,height:35}}
                  // placeholder= {`Enter ${data.market_data.current_price.usd}`}
                  value={Coin.qty = qty}
                  onChange={handleAmountBtcChange}
                />
              </div>
              <div>
           
           <input
             type="text"
             id="token"
             name="token"
             style={{width:100}}
             className="form-control"
             placeholder="Enter token"
             value={Coin.token.toUpperCase()}
             onChange={handleInputs}
           />
          
         </div>
             </div>

            
              <div className="buttons-container" >
               <div style={{marginLeft:30}}>
               <button
                  type="button"
                  className="btn btn-primary"
                  style={{margin:10, width:100, backgroundColor:"#f7931a", border:"none"}} 
                  onClick={() => handleBuy(Coin.qty, Coin.rate, Coin.token)}
                >
                  Buy
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{margin:10, width:100, backgroundColor:"#f7931a", border:"none"}}
                  onClick={() => handleSell(qty, rate, Coin.token)}
                >
                  Sell
                </button>
               </div>
              </div>
            </div>
            // <button type="submit" className="btn btn-primary">Submit</button>
            // </form>
          )}
        </div>
      </div>
     
    </>
  )
}

export default Currencyconvert