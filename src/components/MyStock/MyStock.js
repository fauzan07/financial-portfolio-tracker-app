import React , {Component}from 'react';
import './MyStock.css';
import Axios from 'axios';


class MyStock extends Component{
    state = {
        myStocks: {}
    }

    componentDidMount() {
        const api_key = '0XCP84NVEHMH0GIX';
        let createrow =  
        Object.keys(this.state.myStocks).map(row => {
            let dataRow = this.state.myStocks[row];
            console.log(row);
            // createrow[dataRow.symbol] = {...dataRow};
        Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${dataRow.symbol}&outputsize=full&apikey=${api_key}`)
        .then(response => {
            console.log(response);
            let currentprice = response.data['Time Series (Daily)'];
            console.log(currentprice);
            let profit = ((currentprice - dataRow.buyprice)*dataRow.numberOfShares); // profit and loss logic!
            console.log(profit);
            this.setState({
                newcurrentprice: currentprice,
                profit
            })
        })
        .catch(error => {console.log(error)});

        return(
            <div>
                 <MyStock newcurrentprice = {this.state.newcurrentprice} profit={this.state.profit}/> 
            </div>        
            )
            
      })
      console.log(createrow);
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
                            <td>-</td>
                            <td>-</td>
                            <td><button className="StopTrackingbtn" onClick={() => this.props.stopTracking(stockData.symbol)}>Stop Tracking</button></td>
                        </tr>
                        )})
                        // console.log(rows);
        return (
            <div className="MyStock">
                <div className="Header">
                    <span className="MyStockTitle">My Stocks</span>
                </div>
                <div className="body">
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
                </div>
                
            </div>
        )
    
}
}
export default MyStock;

