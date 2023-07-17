import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const RealTimeCandlestickChart = () => {
  const [data, setData] = useState([]);
//   const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1s');

    socket.onopen = () => {
      console.log('Connected to WebSocket API');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message && message.e === 'kline') {
        const kline = message.k;
        const time = new Date(kline.t).toLocaleTimeString();
        const open = parseFloat(kline.o);
        const high = parseFloat(kline.h);
        const low = parseFloat(kline.l);
        const close = parseFloat(kline.c);
        const volume = parseFloat(kline.v);

        const newDataPoint = { x: time, y: [open, high, low, close, volume] };

        setData((prevData) => [...prevData, newDataPoint]);
        setStoredData((prevData) => [...prevData, newDataPoint]);
      }
    };

    // Fetch historical data if not already stored
    if (!localStorage.getItem('chartData')) {
      fetchHistoricalData().then((historicalData) => {
        setData(historicalData);
        setStoredData(historicalData);
        localStorage.setItem('chartData', JSON.stringify(historicalData));
      });
    } else {
      const storedChartData = JSON.parse(localStorage.getItem('chartData'));
      setData(storedChartData);
      setStoredData(storedChartData);
    }

    return () => {
      socket.close();
      console.log('Disconnected from WebSocket API');
    };
  }, []);

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=10'
      );
      const json = await response.json();

      const historicalData = json.map((item) => {
        const [time, open, high, low, close, volume] = item;
        return {
          x: new Date(time).toLocaleTimeString(),
          y: [parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close), parseFloat(volume)],
        };
      });

      return historicalData;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  };

  const options = {
    chart: {
      type: 'candlestick',
      width:60,
      zoom: {
        enabled: true,
      },
      toolbar: {
        autoSelected: 'zoom',
        show: true,
      },
      pan: {
        enabled: true,
        type: 'x',
      },
    },
    title: { text: 'BNBBTC Candlestick Chart' },
    xaxis: { type: 'category', labels: { datetimeFormatter: { year: 'yyyy', month: 'MMM dd, HH:mm' } } },
    yaxis: { tooltip: { enabled: true } },
    tooltip: { x: { format: 'dd MMM yyyy HH:mm' } },
  };

  const series = [{ data: data }];

  return <Chart options={options} series={series} type="candlestick" height={500} />;
};

export default RealTimeCandlestickChart;