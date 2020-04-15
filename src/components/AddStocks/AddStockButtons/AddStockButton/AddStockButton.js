import React from 'react';
import './AddStockButton.css';


const AddStockButton = (props) => {
        return (
            <div className="AddStockButton">
               <button className="StockButton" onClick = {() => props.clicked(props.stock)}>{props.stock.symbol}</button>
                <span className="stockname">{props.stock.name}</span>
            </div>
        )
    
}

export default AddStockButton;

