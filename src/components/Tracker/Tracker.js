import React, { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import {ref,set, child,push,get,getDatabase, onValue} from "firebase/database";
import './Tracker.css';

import Transactions from "./Transactions/Transactions";


export default function Tracker(){
const database = getDatabase();
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
    const NewTransaction = () =>{

        if(transactionName && transType && price)
        {
          const BackData = transactions;

          BackData.push({
            id: BackData.length + 1,
            name: transactionName,
            type: transType,
            price:price,
            user_id: currentUID
          });
          
      

      set(push(ref(database,'Transactions/'+ currentUID)), {
        id:BackData.length,
        name:transactionName,
        type: transType,
        price:price,
        user_id:currentUID
      }).then((data)=>{
        //success callback

        console.log("success callback");
        setTrans(BackData);
        console.log("Checking stetrrans")
        setMoney(
            transType === 'deposit' 
            ? money + parseFloat(price) :
             money - parseFloat(price)
        );
        setTransName('');
        setTransType(' ');
        setPrice('');
    
       
      }).catch((error)=>{
        //error callback

        console.log('error', error)
      });
    }


   
}

    

let currentUser =auth.currentUser; // it gives data of current logged in user
   

//show data

  useEffect(()=>{ 

   
  
    let totalMoney = money;
    let BackUpState = transactions;
    //const BackUpState = transactions;

   // const dbRef = ref(database, 'Transactions/'+currentUID);
   const dbRef =ref(database,'Transactions/'+ currentUID);
    onValue(dbRef,(snapshot) =>{
        
        console.log(snapshot.val());
        snapshot.forEach((child)=>{
            console.log(child.val());
            totalMoney = child.val().type === 'deposit' ?
            parseFloat(child.val().price) + totalMoney
            : totalMoney - parseFloat(child.val().price);

            BackUpState.push({
                id:child.val().id,
                name: child.val().name,
                type: child.val().type,
                price: child.val().price,
                user_id: child.val().user_id
            });
            
        });

        setTrans(BackUpState);
        setMoney(totalMoney)
        setTransType();
    
    
    /*console.log("checking the backupstate", BackUpState);
    console.log("snapshot", snapshot)
    snapshot.forEach((child) => {

        totalMoney = child.val().type === 'deposit' ?
        parseFloat(child.val().price) + totalMoney
        : totalMoney - parseFloat(child.val().price);
        
        BackUpState.push({
            id:child.val().id,
            name: child.val().name,
            type: child.val().type,
            price: child.val().price,
            user_id: child.val().user_id
        });

        console.log(child.val().name);*/
        
        
       
    });
   
    setTransName();
   
    setPrice("");
    setMoney(totalMoney)
   




},[])
   



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
             Rs.{money}
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
                { 
                   Object.keys(transactions).map((id)=>(
                    <Transactions key={id}
                        type= {transactions[id].type}
                        name={transactions[id].name}
                        price={transactions[id].price}
                    
                    />

                   ))
                    
                }
                
            </ul>
        </div>
        </div>
    )
    }