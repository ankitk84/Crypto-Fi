import React, {useLayoutEffect, useState, useContext} from 'react'
import {  YAxis, Tooltip,  Area, AreaChart } from 'recharts';
import { CryptoContext } from './CryptoContext';

// function CustomTooltip({ payload, label, active, currency= "usd" }) {
//   if (active && payload && payload.length > 0) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat(
//           "en-IN",
//           {
//             style: "currency",
//             currency: currency,
//             minimumFractionDigits: 5,
//           }
//         ).format(payload[0].value)}`}</p>
//       </div>
//     );
//   }

//   return null;
//   }

// const LineChartComponent = ({data, currency, type}) => {
//     return (
//         // <ResponsiveContainer height={"90%"}>
//         // <LineChart width={600} height={300} data={data}>
//         // <Line type="monotone" dataKey="prices" stroke="#8884d8" />
//         // </LineChart>
//         // </ResponsiveContainer>
//         <ResponsiveContainer 
//         // width={50} height={100}
//         >
//         <LineChart data={data}> 
//         <Line
//          type="monotone" 
//         dataKey={type}
//          stroke="#8884d8" />
//         <CartesianGrid stroke="#ccc" />
//         <XAxis
//         //  dataKey="date"
//           />
//         <YAxis  
//         // dataKey={type}
//          hide domain={["auto", "auto"]}
//          />
        
        
//         <Tooltip 
//         currency={currency}/>

//         </LineChart>
//         </ResponsiveContainer>

//     );
// // }

// const AreaChartComponent = ({data}) => {

//     const profit = data?.price_change_percentage_1h>=0;
//     return (
//       <AreaChart width={100} height={35} data={data}
//   margin={{ top: 10, left:0}} >
//   <defs>
//     {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//       <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
//       <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
//     </linearGradient> */}
//     <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
//       <stop offset="5%" stopColor= "#82ca9d"  stopOpacity={0.8}/>
//       <stop offset="95%" stopColor="#82ca9d"  stopOpacity={0}/>
//     </linearGradient>
//   </defs>
//   {/* <XAxis dataKey="date" /> */}
//   <YAxis hide domain={"auto"} />
//   {/* <CartesianGrid strokeDasharray="3 3" /> */}
//   <Tooltip />
//   <Area type="monotone" dataKey="prices" stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)" />

// </AreaChart>
//     )};


const AreaChartComponent = ({ data, profit}) => {
  //
  
//   let profit = data?.price_change_percentage_1h >= 0;
  const chartColor = profit ? '#82ca9d' : 'red';
//   console.log(profit, chartColor, 'profit')
//   console.log(data.price_change_percentage_1h, 'data perc')

  return (
    <AreaChart width={100} height={35} data={data} margin={{ top: 10, left: 0 }}>
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
          <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      <YAxis hide domain="auto" />
      <Tooltip />
      <Area type="monotone" dataKey="prices" stroke="#8884d8" fill={`url(#colorPv)`} />
    </AreaChart>
  );
};





const Chart = ({id, profit}) => {

    const [chartData, setChartData] = useState();
    let {currency} = useContext(CryptoContext);
    // eslint-disable-next-line
    const [days, setDays] = useState(7);
    // eslint-disable-next-line
    const [type, setType] = useState("prices");
    // eslint-disable-next-line no-unused-vars
    // const[valper, setValper] = useState([]);

    useLayoutEffect(() => {
        const getChartData = async (id) => {
          try {
            const data = await fetch(
              `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
            )
              .then((res) => res.json())
              .then((json) => json);
    
            console.log("chart-data", data);

            // setValper(data?.price_change_percentage_1h);
            // console.log(setValper, 'valper')
            console.log(profit, 'profit')
    
            let convertedData = data[type].map((item) => {
              return {
                date: new Date(item[0]).toLocaleDateString(),
                [type]: item[1],
              };
            });
    
            console.log(convertedData);
            setChartData(convertedData);
          } catch (error) {
            console.log(error);
          }
        };
    
        getChartData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id, days, type]);

  return (
    // <div>
    //    {/* <LineChartComponent data={chartData}  currency={currency} type={type} /> */}
      
    //   mn

       
    // </div>
<div style={{margin:0, textAlign: '-webkit-center'}} >
 <AreaChartComponent data={chartData}  currency={currency} profit={profit} /> 
 </div>
  )
}

export default Chart