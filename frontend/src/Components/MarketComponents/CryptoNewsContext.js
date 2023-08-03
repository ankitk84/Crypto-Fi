import { createContext, useState, useEffect } from "react";

export const CryptoNewsContext = createContext({});



export const CryptoNewsProvider = ({ children }) => {

    const [cryptoNews, setCryptoNews] = useState();
    const[category, setCategory] = useState("cryptocurrency");

    const getNewsData = async () => {
        try {
            const data = await fetch(
                `https://bing-news-search1.p.rapidapi.com/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=100`,
                {
                    method: "GET",
                    headers: {
                        "x-bingapis-sdk": "true",

                        'X-BingApis-SDK': 'true',
                        // 'X-RapidAPI-Key': 'd07066cdecmshca19867ad893f8ap18c039jsn5a20eaec524b',
                        // 'X-RapidAPI-Key': process.env.React_X_RapidAPI_Key,
                        // 'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                        'X-RapidAPI-Key': 'b5e09d2dcfmsh2e6968f18e9fb2fp1a53e3jsneafcb4c79d8e',
                        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                    },
                }
            )
                .then((res) => res.json())
                .then((json) => json);
            console.log(data,"news");
            setCryptoNews(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        // eslint-disable-next-line
        getNewsData();
        // eslint-disable-next-line
    }, [category]);

    return (
        <CryptoNewsContext.Provider
            value={{
                cryptoNews,
                setCryptoNews,
                getNewsData,
                category,
                setCategory,

                

            }}
        >
            {children}
        </CryptoNewsContext.Provider>
    );
}