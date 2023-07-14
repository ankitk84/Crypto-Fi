import React from 'react'

const register = () => {
  return (
   <>
   <div className="row mt-5">
  <div className="col-md-6 m-auto">
    <div className="card card-body text-center">
      <h1 className="mb-3">
        <img src="#" alt="icon" width="20%" />
      </h1>
      {/* <!-- src="/assets/secure-icon.png"  --> */}
      <h2>
        Register New User
      </h2>
      {/* <%- include ("./messages") %> */}
      <form action="/auth/register" method="POST">
        <div className="form-group">
          <label for="name">Name</label>
          <input type="name" id="name" name="name" className="form-control" placeholder="Enter Name"
            value="<%= typeof name != 'undefined' ? name : '' %>" />
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email"
            value="<%= typeof email != 'undefined' ? email : '' %>" />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" className="form-control" placeholder="Enter Password"
            value="<%= typeof password != 'undefined' ? password : '' %>" />
        </div>
        <div className="form-group">
          <label for="password2">Confirm Password</label>
          <input type="password" id="password2" name="password2" className="form-control" placeholder="Confirm Password"
            value="<%= typeof password2 != 'undefined' ? password2 : '' %>" />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
      <p className="mt-4">Already have an account? <a href="/auth/login">Login</a></p>
    </div>
  </div>
</div>
   </>
  )
}

export default register