import React from 'react';
import Featured from './Featured';
import Footer from '../Footer/Footer';
import homeimg from '../../Components/Assets/homepageimg.png'
import './Home.css';
import world from '../Assets/World'
// import CheckStatus from './CheckStatus';
import ParentComponent from './ParentComponent';
const Home = () => {
  return (
    <>
  <ParentComponent/>
<div className="w-100" style={{zIndex:-1, position:"fixed", opacity:0.15}}>{world("rgba(0,0,0, 0.2)")}</div> 
<div className='d-flex section-container'  >
 
  <div className='left-section text-center' style={{marginLeft:150, marginTop:50}}>
  <div>
    
    
    <div>
    <h3 className="text-center">Welcome to</h3>
    <div className='d-flex'style={{marginTop:10, justifyContent:"center", fontFamily:'Georgia, Times, Times New Roman, serif'}} >
    <h1 >CRYPTO</h1> <h1 style={{color:'#FFD31D', marginLeft:6}}>Fi</h1>
    </div>

    </div>
      
         
      <div className="text-center" style={{maxWidth:450}}>Get ready to ride the wave of success with our 
        cutting-edge Crypto trading platform</div>
      {/* <div>Trade with <span>confidence</span></div> */}


      <div className="text-center" style={{marginTop:30}}>Get Started</div>
      <button style={{width:300, height:40, backgroundColor:'#FFD31D', border:'none', borderRadius:'3px', marginTop:10}}>
        <a href='/signup'>SignUp with email</a>       
      </button>
      <div style={{marginTop:10}}> ----------------------or---------------------</div>
      <div style={{marginTop:8}}>Already have an account? <a style={{color:'#0D63A5'}} href='/SignIn'>Login</a></div>
      
  </div>
  </div>
  <div className='right-section'>
  <img src={homeimg} alt='homeimg' style={{width:'30erem',height:'30rem ', marginLeft:180}}/>

  </div>
</div>

    {/* <div className='d-flex' style={{margin:'0'}}>
      <div className='left' style={{width:'50%'}}>      
      </div>
      <div className='right' style={{margin:'0',alignItems: 'flex-end', display: 'flex', justifyContent: 'flex-end', width:'auto' }}>
        </div>
    </div> */}

    <Featured/>
    <Footer/>
     </>
    )
}

export default Home