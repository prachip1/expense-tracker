import React from "react";
import { auth } from "../../config/firebase";
import './Tracker.css';


export default function Tracker(){

    const logout = () =>{
        auth.signOut();
    }

    return(
        <>
        <div className="header">
            <h2>Expense Tracker</h2>
            <button className="logout" onClick={logout}>Logout</button>
        </div>
        
        </>
    )
}