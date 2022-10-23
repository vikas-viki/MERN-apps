import React, {useState} from 'react'
import userContext from './UserContext'

const UserState = (props) => {
    const host = "http://localhost:5000";
    const [success, setSuccess] = useState(false)

    const login = async({email,password}) =>{
        const response = await fetch(`${host}/api/auth/login`,{
            method: "POST",
            headers:{
                "content-Type": "application/json",
            },
            body: JSON.stringify({email,password})
        });
        const json = await  response.json();
        if(json.success){
            setSuccess(true)
            localStorage.setItem("token", json.authToken);
        }else{
            alert("Invalid credentials")
        }

    }
    const signUp = async({name, email,password}) =>{
        const response = await fetch(`${host}/api/auth/createuser`,{
            method: "POST",
            headers:{
                "content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await  response.json();
        if(json.success){
            setSuccess(true)
            localStorage.setItem("token", json.authToken);
        }else{
            alert("User already exists")
        }
    }
    

  return (
    <userContext.Provider value={{login, signUp, success}}>
        {props.children}
    </userContext.Provider>
  )
}

export default UserState