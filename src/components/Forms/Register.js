import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React,{useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';

import {auth} from '../../config/firebase';
import './Login.css';

export default function Register(){
 const[username, setUsername] = useState("");
   const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[ fireErrors, setFireErrors] = useState("");

    const registerNow=(e)=>{
        e.preventDefault();
      
      if(!username || !email || !password){
        setFireErrors("Fill all fields");
        return;
      }

     setFireErrors("");

     createUserWithEmailAndPassword(auth,email,password)
    .then(async (res) =>{
        const user = res.user;
        await updateProfile(user, {
            displayName: username,
        });
        
    })
    .catch((error)=>{
      setFireErrors(error.message)
    });
      
       
    };
   
   


  

    return(
        <div className="main_login">
            <form>
                
                <input type="text" className="regField"
                placeholder="Enter username" name="username"
                onChange={event =>setUsername(event.target.value)} />

                
                <input type="text" className="regField"
                placeholder="Email" name="email"
                onChange={event => setEmail(event.target.value)} />
   
                <input type="password" className="regField"
                placeholder="Password" name="password" 
                onChange={event => setPassword(event.target.value)}/>
                

                <input onClick={registerNow} type="submit" className="submitBtn" value="Register Now!" />
            </form>
            <div className='error'>
            <p>{fireErrors}</p>
            </div>
           
        </div>
    )
}