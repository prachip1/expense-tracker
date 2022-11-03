import React, { useState } from "react";
import { auth, database, fire } from "../../config/firebase";
import {ref,set} from "firebase/database";
import './Tracker.css';


export default function Tracker(){

   /* let[state, setState] = useState({
        transactions : [],
        money : 0,

        transName : '',
        transType: '',
        price : '',
        currentUID :auth.currentUser.uid
     } );*/

     
    const[transactions, setTrans] = useState([]);
    const[money, setMoney] = useState(0);
    const[transactionName, setTransName] = useState('');
    const[transType, setTransType] = useState('');
   const[price, setPrice] = useState('');
const currentUID = auth.currentUser.uid;

    

    //adding Transaction

    const NewTransaction = (event) =>{
        event.preventDefault();

        if(transactionName && transType && price){
          const BackData = transactions;
          BackData.push({
            id: BackData.length+1,
            name: transactionName,
            type: transType,
            price:price,
            user_id: currentUID
          });
          console.log(BackData)
          set(ref(database,'Transactions/' + currentUID),{
            id:BackData.length,
            name:transactionName,
            type:transType,
            price:price,
            user_id:currentUID
        }).then((data)=>{
            //success callback
            console.log("success callback")
            setTrans(BackData);
            setMoney(transType === 'deposit' ? money + parseFloat(price): money -parseFloat(price))
            setTransName('');
            setTransType('');
            setPrice('')


        })
        }
   
        
     
      
      
    }


    let currentUser =auth.currentUser; // it gives data of current logged in user
    



//logout
    const logout = () =>{
        auth.signOut();
    }

    return(
        <div className="trackerBlock">
        <div className="header">
            
            <span>Hi, {currentUser.displayName}</span>
            <button className="logout" onClick={logout}>Logout</button>
        </div>
        <div className="totalMoney">
             $145
        </div>
        <div className="newTransBlock">
            <div className="newTrans">
                <form>
                    <input 
                      
                      onChange={event =>setTransName(event.target.value)}
                      placeholder="Transaction Name"
                      type="text"
                      name="transName"
                     
                    />
                    <div className="inputGroup">
                        <select name="type" 
                         
                                onChange={event =>setTransType(event.target.value)}
                               >
                            <option value="0">Type</option>
                            <option value="expense">Expense</option>
                            <option value="deposit">Deposit</option>
                        </select>
                        <input
                             placeholder="Price"
                             type="text"
                             name="price"
                             
                             onChange={event =>setPrice(event.target.value)}
                             
                        />

                    </div>
                   
                </form>
                <button 
                    className="addTrans"
                    onClick ={NewTransaction}>
                        + Add Transaction
                    </button>
            </div>
        </div>

        <div className="latestTransaction">
            <p>Latest Transction</p>
            <ul>
                <li>
                    <div>ATM Deposit</div>
                    <div>+$5</div>
                </li>
            </ul>
        </div>
        </div>
    )
}