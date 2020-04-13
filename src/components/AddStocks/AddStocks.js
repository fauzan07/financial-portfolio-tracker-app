import React, { Component } from 'react';
import './AddStocks.css';

import AddStockButtons from './AddStockButtons/AddStockButtons'


class AddStocks extends Component{

    render(){
        return (
            <div className="AddStocks">
                <div className="AddStocksTitle">Add Stocks to My Stocks</div>
                {
                    this.props.error && 
                    <p>{this.props.error}</p>
                }
                {
                    this.props.allStocks && this.props.allStocks.length > 0 && 
                    <AddStockButtons 
                    addStock = {(stock) => this.props.addStock(stock)}
                    allStocks = {this.props.allStocks} 
                    />
                }
                
            </div>
        )
    }
    
}

export default AddStocks;

