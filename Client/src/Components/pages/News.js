import React, {useContext} from 'react'
import { CryptoNewsContext } from '../MarketComponents/CryptoNewsContext'

const News = () => {

  const {cryptoNews} = useContext(CryptoNewsContext);
  console.log(cryptoNews);


  
  return (
    <>
   


   <div class="row row-cols-1 row-cols-md-4 g-4 mx-2">
   {cryptoNews?.value.map((news, i) => (

<div class="col "key={i}>
<div class="card h-100 ">
<img src={news.image?.thumbnail?.contentUrl || news?.image?.thumbnail?.url} style={{width:100, height:100}}  className="card-img-top" alt="..." />
               
  <div class="card-body">
  <h5 className="card-title">{news.name}</h5>
                  <p className="card-text">{news.description}</p>
                  <a href={news.url} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a> 
  </div>
</div>
</div>



))}
   </div>
    {/* <div className="container ">
      <div className="row row-cols row-cols-md-3 ">
        <div className="col-md-3">
          <div className="card-columns"> */}
            {/* {cryptoNews?.value.map((news, i) => (
              <div className="card" key={i}>
                <img src={news.image?.thumbnail?.contentUrl || news?.image?.thumbnail?.url} style={{width:100, height:100}}  className="card-img-top" alt="..." />
               
                <div className="card-body">
                  <h5 className="card-title">{news.name}</h5>
                  <p className="card-text">{news.description}</p>
                  <a href={news.url} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a> 
                </div>
              </div>
            ))} */}
          {/* </div>
        </div>
      </div>
    </div> */}


    {/* <div className="d-flex p-2 justify-content-center align-content-start flex-wrap">
    <div className="card mb-3 m-2" style={{maxWidth:350}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src="..." className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>




</div> */}
    </>
  )
}

export default News