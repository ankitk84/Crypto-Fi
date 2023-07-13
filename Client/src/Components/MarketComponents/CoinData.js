import React, {useContext}from 'react'
import { useParams } from 'react-router-dom'
import { CryptoContext } from '../MarketComponents/CryptoContext';


const CoinData = () => {
    let {id} = useParams();
    console.log(id, 'coindata')

    let { cryptoData, currency } = useContext(CryptoContext);
  return (
    <>

    {
        cryptoData?cryptoData.map((data)=> {
            return (
                <>
                 <p>{data.name}</p>
                <img src={data.image} alt={data.name}></img>
                </>
                );

    }):""
}
    
        {/* <div className="coinlist">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Coin</th>
                        <th scope="col">Price</th>
                        <th scope="col">24h</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">24h Vol</th>
                        <th scope="col">Total Vol</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData.map((coin) => (
                        <tr key={coin.id}>
                            <td>
                                <img src={coin.image} alt={coin.name} className="coinlist-image" />
                                <span className="coinlist-name">{coin.name}</span>
                                <span className="coinlist-symbol">{coin.symbol}</span>
                            </td>
                            <td>{coin.current_price}</td>
                            <td className={coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>{coin.price_change_percentage_24h}</td>

                            </tr>

                    ))}
                </tbody>
            </table>
        </div> */}

{/* 
       
            {
                cryptoData.length>0?
                cryptoData.map((data) => {
                    return (
                        <>
                         <p>{data.name}</p>
                        <img src={data.image} alt={data.name}></img>
                        </>
                        );
                    })
                     
            }):"" */}




    </>

  )
}

export default CoinData