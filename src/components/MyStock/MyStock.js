import React , {Component}from 'react';
import './MyStock.css';
import AlphaCall from './AlphaCall';


class MyStock extends Component{
    state = {
        myStocks: {},
        isError : false
    }

   
     render(){
        let rows = 
        Object.keys(this.props.myStocks).map(row => {
            let stockData = this.props.myStocks[row];
                        return (
                            <tr  key={stockData.symbol}>
                            <td>{stockData.symbol}</td>
                            <td>{stockData.name}</td>
                            <td>{stockData.numberOfShares}</td>
                            <td>{stockData.closingPrice}</td>
                            <AlphaCall
                              symbol={stockData.symbol}
                              date={stockData.date}
                              buyprice={stockData.closingPrice}
                              numberOfShares={stockData.numberOfShares} />
                            <td><button className="StopTrackingbtn" onClick={() => this.props.stopTracking(stockData.symbol)}>Stop Tracking</button></td>
                        </tr>
                        )})
    
        return (
            <div className="MyStocks">
                <div className="Header">
                    <span className="MyStocksTitle">My Stocks</span>
                </div>
                <div className="body">
                    {
                        this.state.isError   ? 
                        <p>There seems to be a server issue, please try agian later</p> :
                    <table id="MyStocksTable" className="MyStocksTable">
                        <thead>
                            <tr>
                                <th>Stock symbol</th>
                                <th>Stock name</th>
                                <th>No.of shares</th>
                                <th>Buy price</th>
                                <th>Current price</th>
                                <th>Profit/Loss</th>
                                <th>Stop Tracking</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    }
                </div>
                
            </div>
        )
    
}
}
export default MyStock;

