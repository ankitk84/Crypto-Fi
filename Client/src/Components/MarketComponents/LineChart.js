import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';

function LineChart() {
  const [chartData, setChartData] = useState(null);
  const [showRSI, setShowRSI] = useState(true);
  const [showMACD, setShowMACD] = useState(true);
  const [showMA, setShowMA] = useState(true);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30'
        );

        const data = response.data.prices.map(([timestamp, price]) => ({
          x: new Date(timestamp),
          y: price,
        }));

        if (data.length > 0) {
          const rsiData = calculateRSI(data.map((dataPoint) => dataPoint.y), 14);
          const macdData = calculateMACD(data.map((dataPoint) => dataPoint.y));
          const maData = calculateMovingAverage(data.map((dataPoint) => dataPoint.y), 50);

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

          const chartData = {
            options: {
              chart: {
                type: 'line',
                height: 400,
                width: 900,
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
            chartData.options.yaxis.push({
              opposite: true,
              title: {
                text: 'RSI',
              },
            });

            chartData.options.series.push({
              name: 'RSI',
              type: 'line',
              data: formattedRSIData,
              yaxis: chartData.options.yaxis.length - 1,
            });
          }

          if (showMACD) {
            chartData.options.yaxis.push({
              opposite: true,
              title: {
                text: 'MACD',
              },
            });

            chartData.options.series.push({
              name: 'MACD',
              type: 'line',
              data: formattedMACDData,
              yaxis: chartData.options.yaxis.length - 1,
            });
          }

          if (showMA) {
            chartData.options.yaxis.push({
              opposite: true,
              title: {
                text: 'Moving Average',
              },
            });

            chartData.options.series.push({
              name: 'Moving Average',
              type: 'line',
              data: formattedMAData,
              yaxis: chartData.options.yaxis.length - 1,
            });
          }

          setChartData(chartData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [showRSI, showMACD, showMA]);

  useLayoutEffect(() => {
    if (chartData && chartContainerRef.current && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(chartContainerRef.current, chartData.options);
      chart.render();
    }
  }, [chartData]);

  const calculateRSI = (data, period) => {
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

  };

  const calculateMovingAverage = (data, period) => {
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
  };

  const calculateMACD = (data) => {
       // MACD calculation logic
    // ...
    const ema12 = calculateEMA(data, 12);
    const ema26 = calculateEMA(data, 26);
    
    const macdData = [];
    for (let i = 0; i < data.length; i++) {
        const macd = ema12[i] - ema26[i];
        macdData.push(macd);
        }

    return macdData;

    // Return MACD data

    // return []; // Placeholder for MACD data
    };

    const calculateEMA = (data, period) => {
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
    };

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
          <input type="checkbox" checked={showRSI} onChange={handleRSICheckboxChange} />
        </label>
      </div>
      <div>
        <label>
          MACD:
          <input type="checkbox" checked={showMACD} onChange={handleMACDCheckboxChange} />
        </label>
      </div>
      <div>
        <label>
          Moving Average:
          <input type="checkbox" checked={showMA} onChange={handleMACheckboxChange} />
        </label>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
}

export default LineChart;