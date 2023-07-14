import React, {useLayoutEffect, useState, useContext,useEffect, useRef} from 'react'
import ApexCharts from 'apexcharts';
import { CryptoContext } from './CryptoContext';

// const CandlestickChartComponent = ({ data, currency }) => {
//     const chartRef = useRef(null);
  
//     useEffect(() => {
//       if (chartRef.current && data) {
//         const options = {
//           chart: {
//             type: 'candlestick',
//             // other chart options
//           },
//           // other options
//           series: [{
//             data: data.map(item => ({
//               x: new Date(item.date).getTime(),
//               y: [item.open, item.high, item.low, item.close]
//             }))
//           }],
//           xaxis: {
//             type: 'datetime'
//           }
//         };
  
//         const chart = new ApexCharts(chartRef.current, options);
//         chart.render();
  
//         return () => {
//           chart.destroy();
//         };
//       }
//     }, [data]);
  
//     return <div ref={chartRef} />;
//   };

const LineChartComponent = ({ data, currency, type }) => {
  const chartRef = React.useRef(null);
  const [chartType, setChartType] = useState("line");
 
  useLayoutEffect(() => {
    if (chartRef.current && data) {
      const options = {
        chart: {
          type: chartType,
          height: 300,
        },
        series: [
          {
            name: type,
            data: data.map((item) => item[type]),
          },
        ],
        xaxis: {
          type: 'category',
          categories: data.map((item) => item.date),
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data, type, chartType]);

  return <div>
    <div ref={chartRef} />


  

    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
      </button> 
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li> <button onClick={() => setChartType('line')}>Line</button></li>
        <li> <button onClick={() => setChartType('area')}>Area</button></li>
        <li><button onClick={() => setChartType('bar')}>Bar</button></li>
      </ul>
    </div>
    <button onClick={() => setChartType('line')}>Line</button>
    <button onClick={() => setChartType('area')}>Area</button>
    <button onClick={() => setChartType('bar')}>Bar</button>
    </div>
  
};



const NewChart = ({id}) => {

    const [chartData, setChartData] = useState();
    let {currency} = useContext(CryptoContext);
    const [days, setDays] = useState(7);
    const [type, setType] = useState("prices");
   

    useLayoutEffect(() => {
        const getChartData = async (id) => {
          try {
            const data = await fetch(
              `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
            )
              .then((res) => res.json())
              .then((json) => json);
    
            console.log("chart-data", data);
    
            let convertedData = data[type].map((item) => {
              return {
                date: new Date(item[0]).toLocaleDateString(),
                

                // [type]: item[1],
               [type]: Number(item[1]).toFixed(2)
              };
            });
    
            console.log(convertedData, "convertedData");
            setChartData(convertedData);
          } catch (error) {
            console.log(error);
          }
        };
    
        getChartData(id);
      }, [id, days, type]);

  return (
    <div>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "prices"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("prices")}
        >
          Price
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "market_caps"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("market_caps")}
        >
          market caps
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "total_volumes"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("total_volumes")}
        >
          total volumes
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 1 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(1)}
        >
          1d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 7 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(7)}
        >
          7d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 14 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(14)}
        >
          14d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 30 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(30)}
        >
          30d
        </button>

        {chartData && (
        <LineChartComponent data={chartData} currency={currency} type={type} />
        
      )}
 {/* {chartData && (
        <CandlestickChartComponent data={chartData} currency={currency} type={type} />
      )}
        */}
    </div>

    
  )
}

export default NewChart