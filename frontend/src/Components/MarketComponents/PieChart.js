// import React, { useEffect,useContext, useState } from 'react';
// import ApexCharts from 'apexcharts';
// import { useNavigate } from 'react-router-dom';
// import { TotalContext } from '../MarketComponents/TotalContext'

// // const PieChart = () => {
// //     const { totalBuy, totalSell } = useContext(TotalContext);
    
// //     var totalinvested = totalBuy + totalSell;
// //     var total = 50000- totalinvested
// //   useEffect(() => {
// //     const seriesData = [totalinvested, totalBuy, totalSell, total];
// //     const labelsData = ['Total Invested', 'Buy', 'Sell', 'Remaining Balance'];

// //     const chartOptions = {
// //       chart: {
// //         type: 'pie',
// //         height: 200,
// //         width:500,
// //       },
// //       series: seriesData,
// //       labels: labelsData,
// //       legend: {
// //         formatter: function (seriesName, opts) {
// //           const percent = seriesData[opts.seriesIndex];
// //           return `${seriesName} (${percent.toFixed(2)})`;
// //         },
// //       },
// //       responsive: [
// //         {
// //           breakpoint: 480,
// //           options: {
// //             chart: {
// //               width: 300,
// //             },
// //             legend: {
// //               position: 'bottom'
// //             },
// //           },
// //         },
// //       ],
// //     };

// //     const chart = new ApexCharts(document.querySelector('#chart'), chartOptions);
// //     chart.render();

// //     // Cleanup the chart on component unmount
// //     return () => {
// //       chart.destroy();
// //     };
// //   }, []);

// //   return <div id="chart" />;
// // };

// const PieChart = () =>{
//   const [orderBook, setOrderBook] = useState();
//   const [filteredOrderBook, setFilteredOrderBook] = useState([]);
//   const navigate = useNavigate();
//   const [totalBuy, setTotalBuy] = useState(0);
//   const [totalSell, setTotalSell] = useState(0);
//   const callOrderBook = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/orderbook", {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         credentials: "include"
//       });

//       const data = await res.json();
//       console.log('data orderBook', data);
//       if (Array.isArray(data.data)) {
//         setOrderBook(data.data);
//         setFilteredOrderBook(data.data.reverse());
//       }

//       if (res.status === 401) {
//         navigate('/SignIn');
//         return;
//       }

//       if (!res.status === 200) {
//         const error = new Error(res.error);
//         throw error;

//       }

//     } catch (err) {
//       console.log(err);
//       navigate('/Signin');
//     }
//   }

//   useEffect(() => {
//     callOrderBook();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [setFilteredOrderBook]);
//   useEffect(() => {
//     // Calculate total buy and total sell amounts
//     let totalBuyAmount = 0;
//     let totalSellAmount = 0;
//     filteredOrderBook.forEach(data => {
//       if (data.Type === 'buy') {
//         totalBuyAmount += data.rate * data.quantity;
//       } else if (data.Type === 'sell') {
//         totalSellAmount += data.rate * data.quantity;
//       }
//     });
//     setTotalBuy(totalBuyAmount);
//     setTotalSell(totalSellAmount); 
//      // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filteredOrderBook]);

//       var totalinvested = totalBuy + totalSell;
//     var total = 50000- totalinvested
//     useEffect(() => {
//     const seriesData = [totalinvested, totalBuy, totalSell, total];
//     const labelsData = ['Total Invested', 'Buy', 'Sell', 'Remaining Balance'];

//     const chartOptions = {
//       chart: {
//         type: 'pie',
//         height: 200,
//         width:500,
//       },
//       series: seriesData,
//       labels: labelsData,
//       legend: {
//         formatter: function (seriesName, opts) {
//           const percent = seriesData[opts.seriesIndex];
//           return `${seriesName} (${percent.toFixed(2)})`;
//         },
//       },
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 300,
//             },
//             legend: {
//               position: 'bottom'
//             },
//           },
//         },
//       ],
//     };

//     const chart = new ApexCharts(document.querySelector('#chart'), chartOptions);
//     chart.render();

//     // Cleanup the chart on component unmount
//     return () => {
//       chart.destroy();
//     };
//   }, []);

//   return <div id="chart" />;
// }

// export default PieChart;
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

const PieChart = () => {
  const [orderBook, setOrderBook] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const navigate = useNavigate();

  const callOrderBook = async () => {
    try {
      const res = await fetch("https://crypto-fi.onrender.com/orderbook", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log('data orderBook', data);
      if (Array.isArray(data.data)) {
        setOrderBook(data.data);
        const totalBuyAmount = calculateTotalAmount('buy', data.data);
        const totalSellAmount = calculateTotalAmount('sell', data.data);
        const totalInvested = totalBuyAmount + totalSellAmount;
        const remainingBalance = 50000 - totalInvested;

        const seriesData = [totalInvested, totalBuyAmount, totalSellAmount, remainingBalance];
        const labelsData = ['Total Invested', 'Buy', 'Sell', 'Remaining Balance'];

        const options = {
          chart: {
            type: 'pie',
            height: 200,
            width: 500,
          },
          series: seriesData,
          labels: labelsData,
          legend: {
            formatter: function (seriesName, opts) {
              const percent = seriesData[opts.seriesIndex];
              return `${seriesName} (${percent.toFixed(2)})`;
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: 'bottom'
                },
              },
            },
          ],
          // colors: ['#00E396', '#FF4560', '#008FFB', '#FEB019'],
        };

        setChartOptions(options);
        setChartSeries(seriesData);
      }

      if (res.status === 401) {
        navigate('/SignIn');
        return;
      }

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/Signin');
    }
  };

  const calculateTotalAmount = (type, data) => {
    let totalAmount = 0;
    data.forEach(dataItem => {
      if (dataItem.Type === type) {
        totalAmount += dataItem.rate * dataItem.quantity;
      }
    });
    return totalAmount;
  };

  useEffect(() => {
    callOrderBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {orderBook.length > 0 && (
        <Chart options={chartOptions} series={chartSeries} type="pie" height={200} width={500} />
      )}
    </>
  );
};

export default PieChart;
