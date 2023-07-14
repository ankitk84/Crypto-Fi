import React, {useLayoutEffect, useState, useContext} from 'react'
import ApexCharts from 'apexcharts';
import { CryptoContext } from './CryptoContext';


const LineChartComponent = ({ data, type, chartType }) => {
    const chartRef = React.useRef(null);   
    useLayoutEffect(() => {
      if (chartRef.current && data) {
        const options = {
          chart: {
            type: chartType,
            height: 400,
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
      </div>
    
  };

const FinalChart = ({id, days, type, chartType}) => {
    const [chartData, setChartData] = useState();
    let {currency} = useContext(CryptoContext);

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
       
        {chartData && (
        <LineChartComponent data={chartData} currency={currency} type={type}  chartType={chartType}/>
        
      )}

    </div>   
  )
}

export default FinalChart