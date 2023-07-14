import React, {useLayoutEffect, useState, useContext} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
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

const LineChartComponent = ({data, currency, type}) => {
    return (
        // <ResponsiveContainer height={"90%"}>
        // <LineChart width={600} height={300} data={data}>
        // <Line type="monotone" dataKey="prices" stroke="#8884d8" />
        // </LineChart>
        // </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}> 
        <Line type="monotone" dataKey={type} stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis  dataKey={type} hide domain={["auto", "auto"]} />
        
        
        <Tooltip 
        currency={currency}/>
        <Legend />
        </LineChart>
        </ResponsiveContainer>

    );
}

// const AreaChartComponent = ({data}) => {
//     return (
//       <AreaChart width={730} height={250} data={data}
//   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//   <defs>
//     {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//       <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
//       <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
//     </linearGradient> */}
//     <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
//       <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
//       <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
//     </linearGradient>
//   </defs>
//   {/* <XAxis dataKey="date" /> */}
//   <YAxis hide domain={"auto"} />
//   {/* <CartesianGrid strokeDasharray="3 3" /> */}
//   <Tooltip />
//   <Area type="monotone" dataKey="prices" stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)" />

// </AreaChart>
//     )};




const Chart = ({id}) => {

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
              // let date = new Date(item[0]);
              //  let time =
              //       date.getHours() > 12
              //         ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              //         : `${date.getHours()}:${date.getMinutes()} AM`;
                //   return days === 1 ? time : date.toLocaleDateString();
              // console.log(time, "time")
              return {
                date: new Date(item[0]).toLocaleDateString(),
                

                [type]: item[1],
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

       <LineChartComponent data={chartData}  currency={currency} type={type} />
       {/* <AreaChartComponent data={chartData}  currency={currency}/> */}
        {/* <ApexLineChart data={chartData} />  */}
   
       
    </div>

    
  )
}

export default Chart