import React,{useState, useEffect} from "react";
import './Main.css';
import Login from "./Forms/Login";
import Register from "./Forms/Register";

import {auth} from '../config/firebase';
import Tracker from "./Tracker/Tracker";
import Spinner from "../assets/loader.gif";




export default function Main(){
    const [user, setUser] = useState(1);
    const [loading,setLoading] = useState(true);
    var [formSwitchervalue, setFormSwitcherValue] = useState(false);
    console.log(formSwitchervalue);
    console.log(loading);

   
   useEffect(()=>{
     auth.onAuthStateChanged((user)=>{
        if(user){
           setUser(user);
          
        }
        else{
            setUser(null)
        }
    
        })

   }, [user]);
 

const formSwitcher=(action) =>{
        
     setFormSwitcherValue( action === 'register'? true : false);
      
    }

    const form = !formSwitchervalue ? <Login /> : <Register />

     if(user === 1){
        return(
            <div className="main">
                <div className="Spinner">
                    <img src={Spinner} alt="Spinner" className="ImgSpinner" />
                </div>
            </div>
        );
     }

    return(
        <>
        {!user ? 
           (<div className="main">
           {form}
            {!formSwitchervalue ? ( <span className="underLine">
                Not Registered Yet?
                <button onClick={()=>{formSwitcher(!formSwitchervalue ? "register" : "login")}} className="linkBtn">Create an account</button>
            </span>) : 
            (   <span className="underLine">
                Already Have An Account?
                <button onClick={()=>{formSwitcher(!formSwitchervalue ? "register" : "login")}} className="linkBtn">Sign In here</button>
            </span>)
            
            
         
        }
        </div>) : (<Tracker />)
}
        </>
     
    );
}