
// import React, { useState, useEffect } from 'react';
// import Chart from 'react-apexcharts';
// import { useNavigate } from 'react-router-dom';

// const BuyBarhart = () => {
//   const [orderBook, setOrderBook] = useState([]);
//   const [chartOptions, setChartOptions] = useState({});
//   const [chartSeries, setChartSeries] = useState([]);
//   const navigate = useNavigate();
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
//         const buyData = [];
//         const sellData = [];
//         const xAxisCategories = [];
        
//         data.data.forEach(dataItem => {
//           if (dataItem.Type === 'buy') {
//             buyData.push(dataItem.rate);
//           } else if (dataItem.Type === 'sell') {
//             sellData.push(dataItem.rate);
//           }
//         //   xAxisCategories.push(dataItem.time);
//         xAxisCategories.push(new Date(dataItem.time).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }));
//         });

//         setChartOptions({
//             chart: {
//                 width:500,
//                 toolbar: {
//                   show: false
//                 }
//               },
//               xaxis: {
//                 categories: xAxisCategories,
//               },
//             });
       
//         setChartSeries([
//           {
//             name: 'Buy',
//             data: buyData,
//           },
//         //   {
//         //     name: 'Sell',
//         //     data: sellData,
//         //   },
//         ]);
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
//   };

//   useEffect(() => {
//     callOrderBook();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <>
//       <div>OrderBook</div>
//       {orderBook.length > 0 && (
//         <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
//       )}
//     </>
//   );
// };

// export default BuyBarhart;

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

const BuyBarChart = () => {
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
        const xAxisCategories = [];

        data.data.forEach(dataItem => {
          if (dataItem.Type === 'buy') {
            buyData.push(dataItem.rate);
            xAxisCategories.push(new Date(dataItem.time).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }));
          }
        });

        // setChartOptions({
        //   chart: {
        //     width: '100%',
        //     toolbar: {
        //       show: false
        //     }
        //   },
        //   xaxis: {
        //     categories: xAxisCategories,
        //   },
        // });
        setChartOptions({
            chart: {
              width: '100%',
              toolbar: {
                show: true
              },
              
              animations: {
                enabled: true // Disable animations for smoother scrolling
              },
             
            },
           
            xaxis: {
              categories: xAxisCategories,
              
              labels: {
                offsetX: 10, // Add some offset to prevent label clipping
                offsetY: -5
              },
              
            },
            
            plotOptions: {
              bar: {
                horizontal: false // Display bars horizontally
              }
            },
            dataLabels: {
              enabled: false // Disable data labels for better readability
            },
            yaxis: {
              show: true // Hide the y-axis
            },
            tooltip: {
              enabled: true // Disable tooltip for better scrolling experience
            },
            
            
            colors: ['#00E396'],
           
          });
        setChartSeries([
          {
            name: 'Buy',
            data: buyData,
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
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} width={500} />
      )}
    </>
  );
};

export default BuyBarChart;
