import React, { Component } from 'react';
import './AddStockButtons.css';

import AddStockButton from './AddStockButton/AddStockButton'

class AddStockButtons extends Component {
   
    render() {
        let button = this.props.allStocks.map(stock => {
            return stock ? <AddStockButton 
            key={stock.symbol}
            stock={stock}
            clicked={(stock) => this.props.addStock(stock)} /> : null
        })
    
        return (
            <div className="AddStockButtons">
                {button}
            </div>
        )
    }
}

export default AddStockButtons;

