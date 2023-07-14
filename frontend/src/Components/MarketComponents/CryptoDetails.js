import React, { useEffect, useState , useContext} from 'react'
import  {createPortal} from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { CryptoContext } from './CryptoContext';
import Chart from './Chart';


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

const CryptoDetails = () => {

    let {id} = useParams();
    let navigate = useNavigate();
    let {getCoinData, coinData:data, currency} = useContext(CryptoContext);

    useEffect(() => {
         // eslint-disable-next-line react-hooks/exhaustive-deps
       // console.log(id);    
        getCoinData(id);
    }, [id]);

    const close = () => {
        navigate("..");
    };
  return (
    <>
        {createPortal(
            <div className="position-fixed top-50 start-50 translate-middle w-75 h-75 m-25 bg-black bg-opacity-50" >
                    {
                        data && (   
                <div className="" style={{maxWidth:700, backgroundColor:"yellow"}} >
                  <div className="card-body "  >
                    <h5 className="card-title" >{data.name}</h5>
                    <div className="d-flex w-25   mt-4 ">
                      <HighLowIndicator
                        currentPrice={data.market_data.current_price[currency]}
                        high={data.market_data.high_24h[currency]}
                        low={data.market_data.low_24h[currency]}
                      />
                    </div>
                    <button className="btn btn-primary" style={{width:70}} onClick={close}>Close</button>
                  </div>
                  <div>
                    <Chart id={data.id} />
                  </div>
                </div>       
                        )


                    }
             
            </div>,
            document.getElementById('modal-root')
        )}
    </>
   
    );

};

export default CryptoDetails