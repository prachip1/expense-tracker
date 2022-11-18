import React from "react";

export default function Transactions(props){
    return(
        <div className="trans">
            <li>
            <div>{props.name}</div>
             <div>{props.type === 'deposit' ? (
                <span className="deposit"> +{props.price} </span>
             ): (
                <span className="expense">
                    -{props.price}
                </span>
             )}</div>
            </li>
        </div>
    )
}