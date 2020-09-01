import React ,{useState} from "react";
import {Link} from 'react-router-dom'

export const Login = () => {

  const [formData,setFormData] = useState({
      email : '',
      password : '',
  })

  const {email,password} = formData

  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value})

  const onSubmit = e =>{
      e.preventDefault()
      console.log('SUCCESS')
  }
  return (
    <div className="beneath">
      <h1 className="large text-primary">Sign in</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email"
            required
            value={email} 
            onChange = {e => onChange(e)}
        />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange = {e => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to ='/register'>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
