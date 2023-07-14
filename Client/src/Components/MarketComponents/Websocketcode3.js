import React, { useState, useEffect } from 'react';

const Websocketcode3 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcbusd@ticker_1h');

    ws.onopen = () => {
      console.log('Connected to the WebSocket API');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const {
        s: symbol,
        p: priceChange,
        P: priceChangePercent,
        o: openPrice,
        h: highPrice,
        l: lowPrice,
        c: lastPrice,
        w: weightedAvgPrice,
        v: baseVolume,
        q: quoteVolume,
        O: openTime,
        C: closeTime,
        F: firstTradeId,
        L: lastTradeId,
        n: tradeCount,
      } = message;

      const newDetail = {
        symbol,
        priceChange:formatValue(priceChange),
        priceChangePercent,
        openPrice,
        highPrice,
        lowPrice,
        lastPrice,
        weightedAvgPrice,
        baseVolume,
        quoteVolume,
        openTime:convertToLocalTime( openTime),
        closeTime:convertToLocalTime( closeTime),
        firstTradeId,
        lastTradeId,
        tradeCount,
        profitloss : (priceChangePercent > 0) ? "profit" : "loss"
      };

      setData((prevData) => [newDetail, ...prevData.slice(0, 18)]);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    ws.onclose = () => {
      console.log('Disconnected from the WebSocket API');
    };

    return () => {
      ws.close();
    };
  }, []);

  const convertToLocalTime = (utcTime) => {
    const localTime = new Date(utcTime).toLocaleString();
    return localTime;
  };
  const formatValue = (value) => {
    return parseFloat(value).toFixed(2);
  };

  return (
    <div>
      {/* <h1>Binance WebSocket API 3</h1> */}
      {data.length > 0 && (
        <div>
          {/* <h3>Top 10 Recent Details</h3> */}
          <table style={{color:"black"}}>
            <thead>
              <tr class="border border-white"  >
                <th>Symbol</th>
                <th>price Change</th>
                <th>price Change %age</th>
                {/* <th>Open Price</th>
                <th>High Price</th>
                <th>Low Price</th>
                <th>Last Price</th>
                <th>Weighted Average Price</th>
                <th>Base Volume</th>
                <th>Quote Volume</th>
                <th>Open Time</th> */}
                {/* <th>Close Time</th> */}
                {/* <th>First Trade ID</th>
                <th>Last Trade ID</th>
                <th>Trade Count</th> */}
              </tr>
            </thead>
            <tbody >
              {data.map((detail, index) => (
                <tr class="border border-white"  key={index}  style={{backgroundColor: detail.profitloss === 'profit' ? 'green': detail.profitloss === 'loss' ? 'red': 'white',}}>
                  <td class="border border-white" >{detail.symbol}</td>
                  <td class="border border-white px-4" >{detail.priceChange}</td>
                  <td class="border border-white px-4" >{detail.priceChangePercent}</td>
                  {/* <td>{detail.openPrice}</td>
                  <td>{detail.highPrice}</td>
                  <td>{detail.lowPrice}</td>
                  <td>{detail.lastPrice}</td> */}
                  {/* <td>{detail.weightedAvgPrice}</td> */}
                  {/* <td>{detail.baseVolume}</td> */}
                  {/* <td>{detail.quoteVolume}</td> */}
                  {/* <td>{detail.openTime}</td> */}
                  {/* <td>{detail.closeTime}</td> */}
                  {/* <td>{detail.firstTradeId}</td>
                  <td>{detail.lastTradeId}</td>
                  <td>{detail.tradeCount}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Websocketcode3;
// import React, { useState, useEffect } from 'react';

// const Websocketcode3 = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker_1d@arr');

//     ws.onopen = () => {
//       console.log('Connected to the WebSocket API');
//     };

//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       const newDetails = message.map((item) => {
//         const {
//           s: symbol,
//           p: priceChange,
//           P: priceChangePercent,
//           o: openPrice,
//           h: highPrice,
//           l: lowPrice,
//           c: lastPrice,
//           w: weightedAvgPrice,
//           v: baseVolume,
//           q: quoteVolume,
//           O: openTime,
//           C: closeTime,
//           F: firstTradeId,
//           L: lastTradeId,
//           n: tradeCount,
//         } = item;

//         return {
//           symbol,
//           priceChange: formatValue(priceChange),
//           priceChangePercent,
//           openPrice,
//           highPrice,
//           lowPrice,
//           lastPrice,
//           weightedAvgPrice,
//           baseVolume,
//           quoteVolume,
//           openTime: convertToLocalTime(openTime),
//           closeTime: convertToLocalTime(closeTime),
//           firstTradeId,
//           lastTradeId,
//           tradeCount,
//           profitLoss: priceChangePercent > 0 ? 'profit' : 'loss',
//         };
//       });

//       setData(newDetails);
//     };

//     ws.onerror = (event) => {
//       console.error('WebSocket error:', event);
//     };

//     ws.onclose = () => {
//       console.log('Disconnected from the WebSocket API');
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const convertToLocalTime = (utcTime) => {
//     const localTime = new Date(utcTime).toLocaleString();
//     return localTime;
//   };

//   const formatValue = (value) => {
//     return parseFloat(value).toFixed(2);
//   };

//   return (
//     <div>
//       <h1>Binance WebSocket API 3</h1>
//       {data.length > 0 && (
//         <div>
//           <h2>Recent Details</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Symbol</th>
//                 <th>Price Change</th>
//                 <th>Price Change %age</th>
//                 <th>Close Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((detail, index) => (
//                 <tr
//                   key={index}
//                   style={{
//                     backgroundColor:
//                       detail.profitLoss === 'profit'
//                         ? 'green'
//                         : detail.profitLoss === 'loss'
//                         ? 'red'
//                         : 'white',
//                   }}
//                 >
//                   <td>{detail.symbol}</td>
//                   <td>{detail.priceChange}</td>
//                   <td>{detail.priceChangePercent}</td>
//                   <td>{detail.closeTime}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Websocketcode3;
