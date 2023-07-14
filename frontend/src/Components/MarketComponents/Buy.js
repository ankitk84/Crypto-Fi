// import React , {useContext, useState, useEffect}  from 'react'
// import { createPortal } from 'react-dom'
// import { useParams } from 'react-router-dom'
// import { CryptoContext } from './CryptoContext'

// const Buy = () => {
//   let { id } = useParams();
//   console.log(id, 'buy ')
//   let { getCoinData, coinData: data, currency } = useContext(CryptoContext);

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     console.log(id, 'buy id2 ');
//     getCoinData(id);
//   }, [id]);



//   const [Buycoin, setBuycoin] = useState({
//     qty:"", rate:"", token:""
//   });

//   let name, value;
//   const handleInputs = (e) => {
//     console.log(e);
//     name = e.target.name;
//     value = e.target.value;
//     console.log(e.target.value,'here is vsalues');
//     setBuycoin({...Buycoin, [name]:value})
//     ;}




//   return (
//    <>
//    {createPortal (
//         <div className="position-fixed top-50 start-50 translate-middle w-75 h-75 m-25   " >
//         <div className="card-body "  >
//         <h5 className="card-title" >Buy</h5>  
 

//     { data &&( 
//       <div>
//              <input type="Name" id="name" name="name" className="form-control" placeholder="Enter name"
//                // value={buy.current_price}
//                onChange={handleInputs}
//              />
//              <label style={{ paddingTop: 5 }} >Your Name</label>
//              <input type="Name" id="name" name="name" className="form-control" placeholder="Enter name"
//                // value={buy.current_price}
//                onChange={handleInputs}
//              />
//         </div>
      
//     )}

//         </div>
//         </div>, 
//         document.getElementById('m-root')
//     )}
   
   
//    </>
//   )
// }

// export default Buy







import React, { useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { CryptoContext } from './CryptoContext';

const Buy = () => {
  let { id } = useParams();
  console.log(id, 'buy ');
  let { getCoinData, coinData: data } = useContext(CryptoContext);

  useEffect(() => {
    console.log(id, 'buy id2 ');
    getCoinData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [Buycoin, setBuycoin] = useState({
    qty: "",
    rate: "",
    token: ""
  });
  // const [amountUsd, setAmountUsd] = useState('');
  // const [amountBtc, setAmountBtc] = useState('');
  const [conversionRate, setConversionRate] = useState(null);
  const [rate, setrate] = useState('');
  const [qty, setqty] = useState('');
  

  useEffect(() => {
    if (data) {
      setBuycoin((prevBuycoin) => ({
        ...prevBuycoin,
        token: data.symbol,
        rate: data.market_data.current_price.usd,
        qty:'1'
      }
      ));
      setConversionRate(data.market_data.current_price.usd);
    //   const rate = 1 * data.market_data.current_price.usd;
    // setrate(rate.toFixed(2));
    // // const qty = 1 / data.market_data.current_price.usd;
    // const qty = 1 ;
    // setqty(qty.toFixed(2));
    }
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
    setBuycoin((prevBuycoin) => ({
      ...prevBuycoin,
      [name]: value
    }));  
    
  };
 
  // useEffect(() => {
  //   if (Buycoin.qty !== "") {
  //     const rate = parseFloat(Buycoin.qty) * parseFloat(Buycoin.rate);
  //     setBuycoin((prevBuycoin) => ({
  //       ...prevBuycoin,
  //       rate: rate.toFixed(2)
  //     }));
  //   }
  // }, [Buycoin.qty]);

  // useEffect(() => {
  //   if (Buycoin.rate !== "") {
  //     const qty = parseFloat(Buycoin.rate) / parseFloat(Buycoin.qty);
  //     setBuycoin((prevBuycoin) => ({
  //       ...prevBuycoin,
  //       qty: qty.toFixed(2)
  //     }));
  //   }
  // }, [Buycoin.rate]);
  // const handleInputs = (e) => {
  //   const { name, value } = e.target;
  //   setBuycoin((prevBuycoin) => ({
  //     ...prevBuycoin,
  //     [name]: value
  //   }));

  //   // Update the other value based on the changed input
  //   if (name === 'qty') {
  //     const rate = parseFloat(value) * parseFloat(prevBuycoin.rate);
  //     setBuycoin((prevBuycoin) => ({
  //       ...prevBuycoin,
  //       rate: rate.toFixed(2)
  //     }));
  //   } else if (name === 'rate') {
  //     const qty = parseFloat(value) / parseFloat(prevBuycoin.rate);
  //     setBuycoin((prevBuycoin) => ({
  //       ...prevBuycoin,
  //       qty: qty.toFixed(2)
  //     }));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/buyOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Buycoin)
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
  

  return (
    <>
      {createPortal(
        <div className="position-fixed top-50 start-50 translate-middle w-75 h-75 m-25   ">
          <div className="card-body ">
            <h5 className="card-title">Buy</h5>

            {data && (
              <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <label htmlFor="usdInput">USD</label>
                  <input
                    id="usdInput"
                    type="text"
                    value={Buycoin.rate = rate}
                    placeholder='enter rate'
                    onChange={handleAmountUsdChange}
                  />
                </div>

                <div>
                  <label htmlFor="btcInput">BTC</label>
                  <input
                    id="btcInput"
                    type="text"
                    value={Buycoin.qty = qty}
                    placeholder='enter qty'
                    onChange={handleAmountBtcChange}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    id="token"
                    name="token"
                    className="form-control"
                    placeholder="Enter token"
                    value={Buycoin.token}
                    onChange={handleInputs}
                  />
                  <label style={{ paddingTop: 5 }}>Token</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              </form>

          

            )}
          </div>
        </div>,
        document.getElementById('m-root')
      )}
    </>
  );
};

export default Buy;
