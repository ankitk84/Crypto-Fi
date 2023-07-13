import React, { useEffect, useState , useContext} from 'react'
import  {createPortal} from 'react-dom';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CryptoContext } from './CryptoContext';
import Chart from './Chart';
import NewChart from './NewChart';
import CandleChart from './CandleChart';
import Buy from './Buy';
import { Sidebar2 } from '../sidebarcom/Sidebar2';
import NavbarWrapper from '../pages/NavbarWrapper';

const HighLowIndicator = ({ currentPrice, high, low }) => {
    const [green, setGreen] = useState();
  
    useEffect(() => {
      let total = high - low;
      let greenZone = ((high - currentPrice) * 100) / total;
      setGreen(Math.ceil(greenZone));
    }, [currentPrice, high, low]);
    return (
        <>
          <span
            className=" "
            style={{ width: `${100 - green}%`,  height:8, backgroundColor: "#ff0000" }}
          >
            &nbsp;
          </span>
          <span
            className=" "
            style={{ width: `${green}%`,height:8, backgroundColor: "#00ff00" }}
          >
            &nbsp;
          </span>
        </>
      );
    };
  

const CoinsInfo = () => {
    let {id} = useParams();
    let navigate = useNavigate();
    let {getCoinData, coinData:data, currency} = useContext(CryptoContext);

    

    useEffect(() => {
         // eslint-disable-next-line react-hooks/exhaustive-deps
       console.log(id, 'coininfo');    
        getCoinData(id);
      //  console.log(getCoinData,'id getcoin coininfo')
    }, [id]);

    // const close = () => {
    //     navigate("..");
    // };
  return (
    <>
        {/* <Sidebar2 /> */}
        {/* {!id?<NavbarWrapper/>:""}  */}
            <div style={{ marginTop:20}}>
                    {
                        data && (   
                // <div className="" style={{maxWidth:700}} >
                  <div className="card-body "  >
                    <div style={{display:"flex"}}>
                    <h5 className=""  style={{paddingTop:10, margin:5}}>{data.name}</h5>
                    <img src={data.image.large} alt={data.name} style={{height:50}}></img>

                    </div>

                    {/* <h5 className="card-title" >{data.name}</h5> */}
                    {/* <h6 className="card-subtitle mb-2 text-muted">{data.symbol}</h6> */}
                    {/* <img src={data.image.large} alt={data.name} style={{height:70}}></img> */}
                    {/* <p className="card-text">{data.description.en}</p> */}
                    {/* <p className="card-text">Hashing Algorithm: {data.hashing_algorithm}</p> */}
                    <p className="card-text">Market Cap Rank: {data.market_cap_rank}</p>
                    <p className="card-text">Total Supply: {data.market_data.total_supply}</p>
                    {/* <p className="card-text">Circulating Supply: {data.market_data.circulating_supply}</p> */}
                    {/* <p className="card-text">Max Supply: {data.market_data.max_supply}</p> */}
                    <p className="card-text">Total Volume: {data.market_data.total_volume[currency]}</p>
                    <p className="card-text">High 24h: {data.market_data.high_24h[currency]}</p>
                    <p className="card-text">Low 24h: {data.market_data.low_24h[currency]}</p>
                    <p className="card-text">Price Change 24h: {data.market_data.price_change_24h}</p>
                    <p className="card-text">Price Change Percentage 24h: {data.market_data.price_change_percentage_24h}</p>
                    <p className="card-text">Price Change Percentage 7d: {data.market_data.price_change_percentage_7d}</p>
                    {/* <p className="card-text">Price Change Percentage 14d: {data.market_data.price_change_percentage_14d}</p>
                    <p className="card-text">Price Change Percentage 30d: {data.market_data.price_change_percentage_30d}</p>
                    <p className="card-text">Price Change Percentage 60d: {data.market_data.price_change_percentage_60d}</p>
                    <p className="card-text">Price Change Percentage 200d: {data.market_data.price_change_percentage_200d}</p>
                    <p className="card-text">Price Change Percentage 1y: {data.market_data.price_change_percentage_1y}</p> */}
                    <p className="card-text">Market Cap: {data.market_data.market_cap[currency]}</p>
                    <p className="card-text">Market Cap Change 24h: {data.market_data.market_cap_change_24h}</p>
                    <p className="card-text">Market Cap Change Percentage 24h: {data.market_data.market_cap_change_percentage_24h}</p>
                    {/* <p className="card-text">Market Cap Change Percentage 7d: {data.market_data.market_cap_change_percentage_7d}</p> */}
                    {/* <p className="card-text">Market Cap Change Percentage 14d: {data.market_data.market_cap_change_percentage_14d}</p>
                    <p className="card-text">Market Cap Change Percentage 30d: {data.market_data.market_cap_change_percentage_30d}</p>
                    <p className="card-text">Market Cap Change Percentage 60d: {data.market_data.market_cap_change_percentage_60d}</p>
                    <p className="card-text">Market Cap Change Percentage 200d: {data.market_data.market_cap_change_percentage_200d}</p>
                    <p className="card-text">Market Cap Change Percentage 1y: {data.market_data.market_cap_change_percentage_1y}</p> */}
                  
                    <div className="d-flex w-25   mt-4 ">
                      <HighLowIndicator
                        currentPrice={data.market_data.current_price[currency]}
                        high={data.market_data.high_24h[currency]}
                        low={data.market_data.low_24h[currency]}
                      />
                    </div>
                    {/* <button className="btn btn-primary" style={{width:70}} onClick={close}>Close</button> */}
                  {/* </div> */}
                  <div>
                    {/* <NewChart id={data.id} />
                    <CandleChart id={data.id} /> */}
                    {/* <Buy /> */}
                    {/* <Link to={`/${data.id}/buy`}
                    className="btn btn-primary" style={{width:70, border:3, backgroundColor:"chocolate"}}  >Buy</Link>    */}
                  </div>
                 </div>       
                        )
                    }
            </div>
    
    </>
   
    );
}

export default CoinsInfo