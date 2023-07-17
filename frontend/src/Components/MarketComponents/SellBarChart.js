import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

const SellBarChart = () => {
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
        const buyData = [];
        const sellData = [];
        const xAxisCategories = [];
        
        // data.data.forEach(dataItem => {
        //   if (dataItem.Type === 'buy') {
        //     buyData.push(dataItem.rate);
        //   } else if (dataItem.Type === 'sell') {
        //     sellData.push(dataItem.rate);
        //   }
        // //   xAxisCategories.push(dataItem.time);
        // xAxisCategories.push(new Date(dataItem.time).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }));
        // });

        const dateBuyMap = new Map();
        const dateSellMap = new Map();
  
        data.data.forEach(dataItem => {
          const date = new Date(dataItem.time).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
        if (dataItem.Type === 'buy') {
          const cumulativeBuyValue = dateBuyMap.get(date) ;
          dateBuyMap.set(date, cumulativeBuyValue + dataItem.rate);
        } else if (dataItem.Type === 'sell') {
          const cumulativeSellValue = dateSellMap.get(date) || 0;
          dateSellMap.set(date, cumulativeSellValue + dataItem.rate);
        }

        if (!xAxisCategories.includes(date)) {
          xAxisCategories.push(date);
        }
      });

      xAxisCategories.forEach(date => {
        buyData.push(dateBuyMap.get(date) || 0);
        sellData.push(dateSellMap.get(date) );
      });

      
        setChartOptions({
          xaxis: {
            categories: xAxisCategories,
          },
          colors: ['#FF4560'],
        });
        setChartSeries([
        //   {
        //     name: 'Buy',
        //     data: buyData,
        //   },
          {
            name: 'Sell',
            data: sellData,
          },
        ]);
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

  useEffect(() => {
    callOrderBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {orderBook.length > 0 && (
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} width={500}/>
      )}
    </>
  );
};

export default SellBarChart;

// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';

// const SellBarChart = () => {
//   const [sellData, setSellData] = useState([]);
//   const [xAxisCategories, setXAxisCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("https://crypto-fi.onrender.com/orderbook", {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//           credentials: "include"
//         });

//         const data = await res.json();
//         console.log('data orderBook', data);
//         if (Array.isArray(data.data)) {
//           processData(data.data);
//         }

//         if (res.status === 401) {
//           // navigate('/SignIn');
//           return;
//         }

//         if (!res.status === 200) {
//           const error = new Error(res.error);
//           throw error;
//         }
//       } catch (err) {
//         console.log(err);
//         // navigate('/Signin');
//       }
//     };

//     const processData = (data) => {
//       const sellValuesByDate = {};
//       const xAxisCategories = [];

//       data.forEach(dataItem => {
//         if (dataItem.Type === 'sell') {
//           const date = new Date(dataItem.time).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
//           if (!sellValuesByDate[date]) {
//             sellValuesByDate[date] = [];
//             xAxisCategories.push(date);
//           }
//           sellValuesByDate[date].push(dataItem.rate);
//         }
//       });

//       const sellData = Object.values(sellValuesByDate).map(sellValues => {
//         const averageRate = sellValues.reduce((sum, rate) => sum + rate, 0);
//         return averageRate.toFixed(2);
//       });

//       setSellData(sellData);
//       setXAxisCategories(xAxisCategories);
//     };

//     fetchData();
//   }, []);

//   const chartOptions = {
//     chart: {
//       type: 'bar',
//       height: 400,
//       toolbar: {
//         show: false
//       }
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: '40%',
//         endingShape: 'rounded'
//       },
//     },
//     dataLabels: {
//       enabled: false
//     },
//     xaxis: {
//       categories: xAxisCategories,
//     },
//     yaxis: {
//       title: {
//         text: 'Sell Values',
//       }
//     },
//   };

//   const chartSeries = [
//     {
//       name: 'Sell Values',
//       data: sellData
//     }
//   ];

//   return (
//     <>
//       <div className="mt-5 mx-5" style={{ justifyContent: "center" }}>
//         <div>OrderBook</div>

//         <Chart options={chartOptions} series={chartSeries} type="bar" height={400} />
//       </div>
//     </>
//   );
// };

// export default SellBarChart;
