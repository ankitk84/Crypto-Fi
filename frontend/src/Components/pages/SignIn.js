import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import signinimg from '../../Components/Assets/signin.png'
import logo from '../../Components/Assets/logo.png'
const SignIn = () => {

  const navigate = useNavigate();
  const[User, setUser] = useState({
    email: "",password: ""    
  });


  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    console.log(e.target.value,'here is vsalues');
    setUser({...User, [name]:value});}

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = User;
    const res = await fetch("https://crypto-fi.onrender.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
        secure: true,
        httpOnly: true,
        withCredentials: true,
        sameSite: "lax",
      },
      credentials: "include",
      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json();
    console.log(data,'sdata')
    if (res.status === 422 || !res) {
      window.alert("something went wrong");
      console.log("login failed");
    }else{
      
      console.log(data,'data');
      localStorage.setItem('token',data.token);
      window.alert("login Successfull");
      console.log("login Successfull");
      
      navigate('/');
    }
  };


  return (
    <>
    <div className='d-flex' style={{justifyContent:'center', marginTop:50}}>
     <div style={{ width:500}}>
     <img src={signinimg} alt='signinimg' style={{width:'90%',height:'90%', marginTop:50}}/>
     </div>
     <div className="row mt-5 ">
        <div className="col-md-7 border border-2  m-auto" style={{borderRadius:10, padding:10, marginInline:"auto"}}>
            <div className="carde text-start">
                <div className='d-flex' style={{alignItems:'center'}}>
               
                    <img src={logo} alt="icon" width="15%" />

                <h2 className="text-center" style={{marginLeft:100}}> 
                    Login
                </h2>
                </div>
                <form method='POST'>
                    <div className="form-group mt-2 mb-2" >
                        <label>Email</label>
                        <input type="email" id="email" name="email" className="form-control mt-2" placeholder="Enter Email"
                        value={User.email}
                    
                        onChange={handleInputs}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" id="password" name="password" className="form-control mt-2 mb-4"
                            placeholder="Enter Password"
                            value={User.password}
                            onChange={handleInputs}  />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" style={{width:100}}
                    
                    onClick={login}>Login</button>
                </form>
                <p className="mt-4 text-start">
                    New User? <a href="/SignUp">Register</a>
                </p>
                <p className="text-start">
                    Forgot Password? <a href="/ForgotPassword">Reset</a>
                </p>
            </div>
        </div>
    </div>
    </div>
     
    </>
  )
}

export default SignIn