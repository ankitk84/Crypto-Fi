// import React, { useContext, useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { useParams } from 'react-router-dom';
// import { CryptoContext } from './CryptoContext';


// const Sell = () => {
//     let { id } = useParams();
//   console.log(id, 'sell');
//   let { getCoinData, coinData: data } = useContext(CryptoContext);

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     console.log(id, 'Sell id2 ');
//     getCoinData(id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);
//   const [Sellcoin, setSellcoin] = useState({
//     qty: "",
//     rate: "",
//     token: ""
//   });


//   const [conversionRate, setConversionRate] = useState(null);
//   const [rate, setrate] = useState('');
//   const [qty, setqty] = useState('');

  
//   useEffect(() => {
//     if (data) {
//       setSellcoin((prevSellcoin) => ({
//         ...prevSellcoin,
//         token: data.symbol,
//         rate: data.market_data.current_price.usd,
//         qty:'1'
//       }
//       ));
//       setConversionRate(data.market_data.current_price.usd);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }
//   }, [data]);
//   const handleAmountUsdChange = (e) => {
//     const usdAmount = e.target.value;
//     setrate(usdAmount);
//     const btcAmount = usdAmount / conversionRate;
//     setqty(btcAmount.toFixed(8));
//   };

//   const handleAmountBtcChange = (e) => {
//     const btcAmount = e.target.value;
//     setqty(btcAmount);
//     const usdAmount = btcAmount * conversionRate;
//     setrate(usdAmount.toFixed(2));
//   }; 
 

//   const handleInputs = (e) => {
//     const { name, value } = e.target;
//     setSellcoin((prevSellcoin) => ({
//       ...prevSellcoin,
//       [name]: value
//     }));  
    
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch('/SellOrder', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(Sellcoin)
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         // POST request successful
//         console.log(data.message,'Sellcoin data submitted successfully');
//         console.log(data); // Response data from the server
//       } else {
//         // Handle error cases
//         console.error('Failed to submit Sellcoin data');
//         console.error(data); // Error message from the server
//       }
//     } catch (error) {
//       console.error('Error occurred while submitting Sellcoin data:', error);
//     }
//   };

//   return (
//     <>
//     {createPortal(
//       <div className="position-fixed top-50 start-50 translate-middle w-75 h-75 m-25 ">
//         <div className="card-body ">
//           <h5 className="card-title">Sell</h5>

//           {data && (
//             <form onSubmit={handleSubmit}>
//             <div>
//               <div>
//                 <label htmlFor="usdInput">USD</label>
//                 <input
//                   id="usdInput"
//                   type="text"
//                   value={Sellcoin.rate = rate}
//                   onChange={handleAmountUsdChange}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="btcInput">BTC</label>
//                 <input
//                   id="btcInput"
//                   type="text"
//                   value={Sellcoin.qty = qty}
//                   onChange={handleAmountBtcChange}
//                 />
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   id="token"
//                   name="token"
//                   className="form-control"
//                   placeholder="Enter token"
//                   value={Sellcoin.token}
//                   onChange={handleInputs}
//                 />
//                 <label style={{ paddingTop: 5 }}>Token</label>
//               </div>
//             </div>
//             <button type="submit" className="btn btn-primary">Submit</button>
//             </form>

//           )}
//         </div>
//       </div>,
//       document.getElementById('m2-root')
//     )}
//   </>

//   )
// }

// export default Sell
import React from 'react';

const Sell = ({ qty, rate, token }) => {
  const handleSell = async () => {
    // Handle sell action using the qty, rate, and token props
    try {
      const response = await fetch('/SellOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ qty, rate, token })
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
    console.log('Sell:', qty, rate, token);
  };

  return (
    <button type="button" className="btn btn-primary" style={{ margin: 10, width: 100, backgroundColor: '#f7931a', border: 'none' }} onClick={handleSell}>
      Sell
    </button>
  );
};

export default Sell;
