import axios from 'axios'
import React, { useState } from 'react'

const Login = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    // const login = () =>{
    //     if(!email || !password)
    //     return alert("Either field is empty")

    //     axios({
    //         url: `http://localhost:8000/signin`,
    //         method: 'POST',
    //         data: {
    //           email,
    //           password
    //         },
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       }).then(data => {
    //         console.log(data)
    //       }
    //       )
    // }

    return(
        <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body text-center">
                <h1 class="mb-3">
                    <img src="#" alt="icon" width="20%" />
                </h1>
                <h2>
                    Login
                </h2>
                <form>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" class="form-control" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" class="form-control"
                            placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                </form>
                <p class="mt-4">
                    New User? <a href="/register">Register</a>
                </p>
                <p>
                    Forgot Password? <a href="/forgot">Reset</a>
                </p>
            </div>
        </div>
    </div>
    )
}

export default Login