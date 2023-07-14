/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";


// create context object
export const CryptoContext = createContext({});

// create provider component

export const CryptoProvider = ({ children }) => {
    const [cryptoData, setCryptoData] = useState();
    const [currency, setCurrency] = useState("usd");
    const [sortBy, setSortBy] = useState("market_cap_desc");
    const [coinData, setCoinData] = useState();

    const getCryptoData = async () => {
      
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortBy}&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`    
        
           
            )

            // if (data.ok) {
            //     const data = await data.json();
            //     console.log(data);
            //     setCryptoData(data);
            //   }
            // } catch (error) {
            //   console.log(error);
            // }
            .then(async (res) => {
                if (res.ok) {
                  return res.json();
                }}).then((json) => json);
            console.log(data);
            setCryptoData(data);
        } catch (error) {
            console.log(error);
        }
    };
        

    const getCoinData = async (id) => {
        setCoinData();
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
          )
            .then((res) => res.json())
            .then((json) => json);
    
          console.log("CoinData", data);
          setCoinData(data);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        
        getCryptoData();
    }, [ currency, sortBy]);  

    return (
        <CryptoContext.Provider value={{ cryptoData,setCryptoData, currency, setCurrency, sortBy, setSortBy, getCoinData, coinData }}>
            {children}
        </CryptoContext.Provider>
    );
}