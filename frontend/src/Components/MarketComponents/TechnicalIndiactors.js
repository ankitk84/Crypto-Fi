// import React, { useEffect, useState, useLayoutEffect, useRef, useCallback } from 'react';
// import axios from 'axios';
// import ApexCharts from 'apexcharts';
// import { useParams } from 'react-router-dom';

// function TechnicalIndiactors({days}) {
//     const {id} = useParams();
//     console.log(id,'sdcdsfsd')
//     //let {days=7 } = useParams
//     console.log(days)
//   const [chartData, setChartData] = useState(null);
//   const [showRSI, setShowRSI] = useState(true);
//   const [showMACD, setShowMACD] = useState(true);
//   const [showMA, setShowMA] = useState(true);
//   const chartContainerRef = useRef(null);
//   const chartRef = useRef(null); 

//   const calculateEMA = useCallback((data, period) => {
//     const emaData = [];
//     let ema = 0;
//     for (let i = 0; i < data.length; i++) {
//       if (i < period) {
//         ema = ema + data[i];
//       } else if (i === period) {
//         ema = ema / period;
//       } else {
//         ema = (data[i] - emaData[i - 1]) * (2 / (period + 1)) + emaData[i - 1];
//       }
//       emaData.push(ema);
//     }
//     return emaData;
//   }, []);
//   const calculateRSI = useCallback((data, period) => {
//     // RSI calculation logic
//     // ...
//     const rsiData = [];
//     let sumGain = 0;
//     let sumLoss = 0;

//     // Calculate initial average gain and loss
//     for (let i = 1; i <= period; i++) {
//       const priceDiff = data[i] - data[i - 1];
//       if (priceDiff >= 0) {
//         sumGain += priceDiff;
//       } else {
//         sumLoss -= priceDiff;
//       }
//     }

//     let avgGain = sumGain / period;
//     let avgLoss = sumLoss / period;
//     let rs = avgGain / avgLoss;
//     let rsi = 100 - 100 / (1 + rs);
//     rsiData.push(rsi);

//     // Calculate subsequent RSI values
//     for (let i = period + 1; i < data.length; i++) {
//       const priceDiff = data[i] - data[i - 1];

//       if (priceDiff >= 0) {
//         avgGain = (avgGain * (period - 1) + priceDiff) / period;
//         avgLoss = (avgLoss * (period - 1)) / period;
//       } else {
//         avgGain = (avgGain * (period - 1)) / period;
//         avgLoss = (avgLoss * (period - 1) - priceDiff) / period;
//       }

//       rs = avgGain / avgLoss;
//       rsi = 100 - 100 / (1 + rs);
//       rsiData.push(rsi);
//     }

//     return rsiData;
//   }, []);

//   const calculateMovingAverage = useCallback((data, period) => {
//     // Moving average calculation logic
//     // ...
//     const maData = [];
//     let sum = 0;

//     for (let i = 0; i < data.length; i++) {
//       if (i < period) {
//         sum = sum + data[i];
//       } else if (i === period) {
//         sum = sum / period;
//       } else {
//         sum = sum - data[i - period] + data[i];
//       }
//       maData.push(sum / period);
//     }
//     return maData;
//   }, []);

//   const calculateMACD = useCallback((data) => {
//     // MACD calculation logic
//     // ...
//     const ema12 = calculateEMA(data, 12);
//     const ema26 = calculateEMA(data, 26);
//     const macdLine = ema12.map((value, index) => value - ema26[index]);
//     const signalLine = calculateEMA(macdLine, 9);

//     const macdHistogram = macdLine.map((value, index) => value - signalLine[index]);
//     return macdHistogram;
//   }, [calculateEMA]);

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30'
//       );

//       const data = response.data.prices.map(([timestamp, price]) => ({
//         x: new Date(timestamp),
//         y: price,
//       }));

//       if (data.length > 0) {
//         const volumeData = response.data.total_volumes.map(([timestamp, volume]) => ({
//             x: new Date(timestamp),
//             y: volume,
//         }));
//         const rsiData = calculateRSI(data.map((dataPoint) => dataPoint.y), 14);
//         const macdData = calculateMACD(data.map((dataPoint) => dataPoint.y));
//         const maData = calculateMovingAverage(data.map((dataPoint) => dataPoint.y), 50);

//         const formattedVolumeData = volumeData.map((volumePoint) => ({
//             x: volumePoint.x,
//             y: Number(volumePoint.y.toFixed(2)),
//         }));
//         const formattedData = data.map((dataPoint) => ({
//           x: dataPoint.x,
//           y: Number(dataPoint.y.toFixed(2)),
//         }));

//         const formattedRSIData = rsiData.map((value, index) => ({
//           x: data[index].x,
//           y: Number(value.toFixed(2)),
//         }));

//         const formattedMACDData = macdData.map((value, index) => ({
//           x: data[index].x,
//           y: Number(value.toFixed(2)),
//         }));

//         const formattedMAData = maData.map((value, index) => ({
//           x: data[index].x,
//           y: Number(value.toFixed(2)),
//         }));

//         const newChartData = {
//           options: {
//             chart: {
//               type: 'line',
//               height: 400,
//               width: 900,
//               zoom: {
//                 enabled: true,
//               },
//             },
//             xaxis: {
//               type: 'datetime',
//             },
//             yaxis: [
//               {
                
//                 title: {
//                   text: 'Price',
//                 },
//                 labels: {
//                   formatter: (value) => `$${value}`,
//                 },
//               },
//             ],
//             series: [
//               {
//                 name: 'Price',
//                 type: 'line',
//                 data: formattedData,
//               },
//             ],
//           },
//         };

//         if (showRSI) {
//           newChartData.options.yaxis.push({
//             // opposite: true,
//             title: {
//               text: 'RSI',
//             },
//           });

//           newChartData.options.series.push({
//             name: 'RSI',
//             type: 'line',
//             data: formattedRSIData,
//             yaxis: newChartData.options.yaxis.length - 1,
//           });
//         }

//         if (showMACD) {
//           // newChartData.options.yaxis.push({
//           //   opposite: true,
//           //   title: {
//           //     text: 'MACD',
//           //   },
//           // }
//           // );

//           newChartData.options.series.push({
//             name: 'MACD',
//             type: 'line',
//             data: formattedMACDData,
//             yaxis: newChartData.options.yaxis.length - 1,
//           });
//         }

//         if (showMA) {
//           // newChartData.options.yaxis.push({
//           //   opposite: true,
//           //   title: {
//           //     text: 'Moving Average',
//           //   },
//           // });

//           newChartData.options.series.push({
//             name: 'Moving Average',
//             type: 'line',
//             data: formattedMAData,
//             yaxis: newChartData.options.yaxis.length - 1,
//           });
//         }

//         setChartData(newChartData);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }, [showRSI, showMACD, showMA, calculateRSI, calculateMACD, calculateMovingAverage]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

// //   useLayoutEffect(() => {
// //     if (chartData) {
// //       const chart = new ApexCharts(chartContainerRef.current, chartData.options);
// //       chart.render();
// //     }
// //   }, [chartData]);

// useLayoutEffect(() => {
//     if (chartData) {
//       if (!chartRef.current) {
//         // Create the chart instance
//         chartRef.current = new ApexCharts(chartContainerRef.current, chartData.options);
//         chartRef.current.render();
//       } else {
//         // Update the chart data
//         chartRef.current.updateSeries(chartData.options.series);
//       }
//     }
//   }, [chartData]);

 

//   const handleRSICheckboxChange = (event) => {
//     setShowRSI(event.target.checked);
//   };

//   const handleMACDCheckboxChange = (event) => {
//     setShowMACD(event.target.checked);
//   };

//   const handleMACheckboxChange = (event) => {
//     setShowMA(event.target.checked);
//   };

//   return (
//     <div>
//       <div>
//         <label>
//           RSI:
//           <input type="checkbox" style={{border:"1px solid black"}} checked={showRSI} onChange={handleRSICheckboxChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           MACD:
//           <input type="checkbox" checked={showMACD} onChange={handleMACDCheckboxChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Moving Average:
//           <input type="checkbox"  checked={showMA} onChange={handleMACheckboxChange} />
//         </label>
//       </div>
//       <div ref={chartContainerRef} />
//     </div>
//   );
// }

// export default TechnicalIndiactors;

import React, { useEffect, useState, useLayoutEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';

function TechnicalIndicators() {
  const [chartData, setChartData] = useState(null);
  const [showRSI, setShowRSI] = useState(true);
  const [showMACD, setShowMACD] = useState(true);
  const [showMA, setShowMA] = useState(true);
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null); 

  const calculateEMA = useCallback((data, period) => {
    const emaData = [];
    let ema = 0;
    for (let i = 0; i < data.length; i++) {
      if (i < period) {
        ema = ema + data[i];
      } else if (i === period) {
        ema = ema / period;
      } else {
        ema = (data[i] - emaData[i - 1]) * (2 / (period + 1)) + emaData[i - 1];
      }
      emaData.push(ema);
    }
    return emaData;
  }, []);
  const calculateRSI = useCallback((data, period) => {
    // RSI calculation logic
    // ...
    const rsiData = [];
    let sumGain = 0;
    let sumLoss = 0;

    // Calculate initial average gain and loss
    for (let i = 1; i <= period; i++) {
      const priceDiff = data[i] - data[i - 1];
      if (priceDiff >= 0) {
        sumGain += priceDiff;
      } else {
        sumLoss -= priceDiff;
      }
    }

    let avgGain = sumGain / period;
    let avgLoss = sumLoss / period;
    let rs = avgGain / avgLoss;
    let rsi = 100 - 100 / (1 + rs);
    rsiData.push(rsi);

    // Calculate subsequent RSI values
    for (let i = period + 1; i < data.length; i++) {
      const priceDiff = data[i] - data[i - 1];

      if (priceDiff >= 0) {
        avgGain = (avgGain * (period - 1) + priceDiff) / period;
        avgLoss = (avgLoss * (period - 1)) / period;
      } else {
        avgGain = (avgGain * (period - 1)) / period;
        avgLoss = (avgLoss * (period - 1) - priceDiff) / period;
      }

      rs = avgGain / avgLoss;
      rsi = 100 - 100 / (1 + rs);
      rsiData.push(rsi);
    }

    return rsiData;
  }, []);

  const calculateMovingAverage = useCallback((data, period) => {
    // Moving average calculation logic
    // ...
    const maData = [];
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
      if (i < period) {
        sum = sum + data[i];
      } else if (i === period) {
        sum = sum / period;
      } else {
        sum = sum - data[i - period] + data[i];
      }
      maData.push(sum / period);
    }
    return maData;
  }, []);

  const calculateMACD = useCallback((data) => {
    // MACD calculation logic
    // ...
    const ema12 = calculateEMA(data, 12);
    const ema26 = calculateEMA(data, 26);
    const macdLine = ema12.map((value, index) => value - ema26[index]);
    const signalLine = calculateEMA(macdLine, 9);

    const macdHistogram = macdLine.map((value, index) => value - signalLine[index]);
    return macdHistogram;
  }, [calculateEMA]);

  const fetchData = useCallback(async (id= 'bitcoin', days=30 ) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}  `
      );

      const data = response.data.prices.map(([timestamp, price]) => ({
        x: new Date(timestamp),
        y: price,
      }));

      if (data.length > 0) {
        // const volumeData = response.data.total_volumes.map(([timestamp, volume]) => ({
        //     x: new Date(timestamp),
        //     y: volume,
        // }));
        const rsiData = calculateRSI(data.map((dataPoint) => dataPoint.y), 14);
        const macdData = calculateMACD(data.map((dataPoint) => dataPoint.y));
        const maData = calculateMovingAverage(data.map((dataPoint) => dataPoint.y), 50);

        // const formattedVolumeData = volumeData.map((volumePoint) => ({
        //     x: volumePoint.x,
        //     y: Number(volumePoint.y.toFixed(2)),
        // }));
        const formattedData = data.map((dataPoint) => ({
          x: dataPoint.x,
          y: Number(dataPoint.y.toFixed(2)),
        }));

        const formattedRSIData = rsiData.map((value, index) => ({
          x: data[index].x,
          y: Number(value.toFixed(2)),
        }));

        const formattedMACDData = macdData.map((value, index) => ({
          x: data[index].x,
          y: Number(value.toFixed(2)),
        }));

        const formattedMAData = maData.map((value, index) => ({
          x: data[index].x,
          y: Number(value.toFixed(2)),
        }));

        const newChartData = {
          options: {
            chart: {
              type: 'line',
              height: 400,
            //   width: 900,
              zoom: {
                enabled: true,
              },
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: [
              {
                
                title: {
                  text: 'Price',
                },
                labels: {
                  formatter: (value) => `$${value}`,
                },
              },
            ],
            series: [
              {
                name: 'Price',
                type: 'line',
                data: formattedData,
              },
            ],
          },
        };

        if (showRSI) {
          newChartData.options.yaxis.push({
            // opposite: true,
            title: {
              text: 'RSI',
            },
          });

          newChartData.options.series.push({
            name: 'RSI',
            type: 'line',
            data: formattedRSIData,
            yaxis: newChartData.options.yaxis.length - 1,
          });
        }

        if (showMACD) {
          // newChartData.options.yaxis.push({
          //   opposite: true,
          //   title: {
          //     text: 'MACD',
          //   },
          // }
          // );

          newChartData.options.series.push({
            name: 'MACD',
            type: 'line',
            data: formattedMACDData,
            yaxis: newChartData.options.yaxis.length - 1,
          });
        }

        if (showMA) {
          // newChartData.options.yaxis.push({
          //   opposite: true,
          //   title: {
          //     text: 'Moving Average',
          //   },
          // });

          newChartData.options.series.push({
            name: 'Moving Average',
            type: 'line',
            data: formattedMAData,
            yaxis: newChartData.options.yaxis.length - 1,
          });
        }

        setChartData(newChartData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [showRSI, showMACD, showMA, calculateRSI, calculateMACD, calculateMovingAverage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

//   useLayoutEffect(() => {
//     if (chartData) {
//       const chart = new ApexCharts(chartContainerRef.current, chartData.options);
//       chart.render();
//     }
//   }, [chartData]);

useLayoutEffect(() => {
    if (chartData) {
      if (!chartRef.current) {
        // Create the chart instance
        chartRef.current = new ApexCharts(chartContainerRef.current, chartData.options);
        chartRef.current.render();
      } else {
        // Update the chart data
        chartRef.current.updateSeries(chartData.options.series);
      }
    }
  }, [chartData]);

 

  const handleRSICheckboxChange = (event) => {
    setShowRSI(event.target.checked);
  };

  const handleMACDCheckboxChange = (event) => {
    setShowMACD(event.target.checked);
  };

  const handleMACheckboxChange = (event) => {
    setShowMA(event.target.checked);
  };

  return (
    <div>
      <div>
        <label>
          RSI:
          <input type="checkbox" 
          value="true"
          style={{width:15,  border:'1px solid black', padding:7}} checked={showRSI} onChange={handleRSICheckboxChange} />
        </label>
      </div>
      <div>
        <label>
          MACD:
          <input type="checkbox"
          value="true"
           style={{width:15,  border:'1px solid black', padding:7}}  checked={showMACD} onChange={handleMACDCheckboxChange} />
        </label>
      </div>
      <div>
        <label>
          Moving Average:
          <input type="checkbox"
          value="true"
           style={{width:15,  border:'1px solid black', padding:7}} checked={showMA} onChange={handleMACheckboxChange} />
        </label>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
}

export default TechnicalIndicators;