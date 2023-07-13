import React, { useEffect, useState, useRef } from 'react';
import ApexCharts from 'apexcharts';

const CandleChart = ({ id, days }) => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${days}`
        );
        const data = await response.json();

        const transformedData = data.map(([timestamp, open, high, low, close]) => ({
          x: timestamp,
          y: [open, high, low, close],
        }));

        setChartData(transformedData);
      } catch (error) {
        console.log('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, [id, days]);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const chartOptions = {
        chart: {
          type: 'candlestick',
          height: 400,
        },
        series: [
          {
            data: chartData,
          },
        ],
        xaxis: {
          type: 'datetime',
        },
      };

      const chart = new ApexCharts(chartRef.current, chartOptions);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  

  return <div ref={chartRef} />;
};

export default CandleChart;
