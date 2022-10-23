import React, { useState, useContext } from 'react'
import userContext from '../Contexts/user/UserContext';
import "../Styles/Login.css"
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    let navigate = useNavigate();
    const { login, success } = useContext(userContext)

    const [details, setDetails] = useState({ email: "", password: "" });

    const loginUser = (e) => {
        e.preventDefault();
        login(details);
        if(success){
            props.showAlert("Login succesfull, you are being redirected", "success");
            setTimeout(()=>{
               navigate("/")
            }, 2000)
            setDetails({ email: "", password: "" })
        }else{
            console.log("invalid credentials provided")
        }
    }
    const changeDetails = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center mt-5 login-form py-5 rounded' >
            <h2 className='mb-4'>Welcome back!</h2>
            <form onSubmit={loginUser} style={{ width: "30%" }}>
                <div className="mb-3" >
                    <label htmlFor="userEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" name="email" value={details.email} onChange={changeDetails} required/>
                    {!success}
                </div>
                <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="userPassword" name="password" minLength={5} value={details.password} onChange={changeDetails} required/>
                </div>
                <button type="submit" className="btn btn-primary " style={{width: "75%", marginLeft: "12%"}}>Login</button>
            </form>
        </div>
    )
}

export default Login
