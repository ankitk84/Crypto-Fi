import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import signupimg from '../../Components/Assets/signup.png'
// import logo from '../../Components/Assets/logo.png'

const SignUp = () => {

  const navigate = useNavigate();
  const[User, setUser] = useState({
    name: "",email: "",password: "",cpassword: ""
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    console.log(e.target.value,'here is vsalues');
    setUser({...User, [name]:value});}

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = User;
    const res = await fetch("signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },  
      body: JSON.stringify({
        name, email, password, cpassword
      })
    }); 

    if (res.status === 422 || !res) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }else{
      window.alert("Registration Successfull");
      console.log("Registration Successfull");
      setUser({...User, name: "", email: "", password: "", cpassword: ""});
      navigate('/SignIn');
    }

  };

  return (
    <> 
    <div className='d-flex' style={{marginTop:100, marginRight:100, justifyContent:"space-evenly", marginBottom:100}}  >
      <div style={{ width:500}}>
        <img src={signupimg} alt="signup" width="100%" height="100%" />
      </div>
    <div 
    // className="row mt-5" 
    className="border  "
    // align="right"
    style={{marginLeft:80, width:400,borderRadius:10,  padding:20}}
    >
   
            <div className="cardy  card-body text-start " style={{width:300, marginInline:"auto"}}>
                {/* <div className='d-flex ' style={{alignItems:'center', justifyContent:'center'}} >
               
                
                    <img src={logo} alt="icon" width="20%" />
                <h2>CRYPTOO FI</h2>
                </div> */}
                <h2 style={{textAlign:"center"}}>
                    
                    Register
                </h2>
                <form method='POST'>
                <div className="form-group">
                        <label style={{paddingTop:5}} >Your Name</label>
                        <input  type="Name" id="name" name="name" className="form-control" placeholder="Enter name"
                          value={User.name}
                          onChange={handleInputs}
                 />
                    </div>
                    <div className="form-group">
                        <label style={{paddingTop:5}}>Email</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email"
                          value={User.email}
                          onChange={handleInputs}
                 />
                    </div>
                    <div className="form-group">
                        <label style={{paddingTop:5}} >Password</label>
                        <input type="password" id="password" name="password" className="form-control"
                            placeholder="Enter Password"
                            value={User.password}
                            onChange={handleInputs}
                           />
                    </div>
                    <div className="form-group">
                        <label style={{paddingTop:5}}>Re-Enter Password</label>
                        <input type="password" id="cpassword" name="cpassword" className="form-control"
                            placeholder="re-Enter Password"
                            value={User.cpassword}
                            onChange={handleInputs}
                            />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" style={{
                      // backgroundColor:"#ffb300",
                       border:'none', marginTop:20, width:130

                      //  mix-blend-mode: difference;
                      }}
                    onClick={PostData}
                    >Register</button>
                </form>
                <p className="mt-3 text-start">
                    Already have an account? <a href="/SignIn">Login</a>
                </p>
                <p className="text-start">
                    Forgot Password? <a href="/ForgotPassword">Reset</a>
                </p>
            </div>
       
    </div>
    </div>
      </>
  )
}

export default SignUp