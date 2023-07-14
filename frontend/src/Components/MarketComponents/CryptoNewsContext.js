import { createContext, useState, useEffect } from "react";

export const CryptoNewsContext = createContext({});



export const CryptoNewsProvider = ({ children }) => {

    const [cryptoNews, setCryptoNews] = useState();
    const[categoy, setCategory] = useState("cryptocurrency");

    const getNewsData = async () => {
        try {
            const data = await fetch(
                `https://bing-news-search1.p.rapidapi.com/news/search?q=${categoy}&safeSearch=Off&textFormat=Raw&freshness=Day&count=100`,
                {
                    method: "GET",
                    headers: {
                        "x-bingapis-sdk": "true",

                        'X-BingApis-SDK': 'true',
                        // 'X-RapidAPI-Key': 'd07066cdecmshca19867ad893f8ap18c039jsn5a20eaec524b',
                        'X-RapidAPI-Key': process.env.React_X_RapidAPI_Key,
                        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                    },
                }
            )
                .then((res) => res.json())
                .then((json) => json);
            console.log(data);
            setCryptoNews(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        //eslint-disable-next-line
        getNewsData();
    }, [categoy]);

    return (
        <CryptoNewsContext.Provider
            value={{
                cryptoNews,
                setCryptoNews,
                getNewsData,
                categoy,
                setCategory,

                

            }}
        >
            {children}
        </CryptoNewsContext.Provider>
    );
}