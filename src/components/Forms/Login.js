import { signInWithEmailAndPassword } from "firebase/auth";
import React,{useState} from "react";
import './Login.css';
import {auth} from '../../config/firebase';

export default function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[ fireErrors, setFireErrors] = useState("");

    const loggingIn=(e)=>{
        e.preventDefault();

        if(!email|| !password)
        {
            setFireErrors("Please Fill all fields");
            return;
        }
        setFireErrors("");

        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) =>{
            //const errorCode = error.code;
            const errorMessage = error.message;
            setFireErrors(errorMessage);
        })
      

    }

    return(
        <div className="main_login">
            <form>
                <input type="text" className="regField"
                placeholder="Email" name="email" onChange={event =>setEmail(event.target.value)}/>
   
                <input type="password" className="regField"
                placeholder="Password" name="password"   onChange={event =>setPassword(event.target.value)} />
                

                <input onClick={loggingIn} type="submit" className="submitBtn" value="Login" />
            </form>
            <div className="errors">
            <p>{fireErrors}</p>
            </div>
        </div>
    )
}