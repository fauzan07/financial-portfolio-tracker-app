import React, { Component } from 'react';
import Axios from 'axios';

class AlphaCall extends Component {

   state = {
      newcurrentprice: null,
      profit: null
   }

   componentDidMount() {
    const api_key = '0XCP84NVEHMH0GIX';

    var symbol =  this.props.symbol;
    var date = this.props.date;
    var buyprice = this.props.buyprice;
    var numberOfShares = this.props.numberOfShares;

    Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${api_key}`)
    .then(response => {
      //   console.log(response);
        let currentprice = response.data['Time Series (Daily)'][date]['4. close'];
        let profit = ((currentprice - buyprice)*numberOfShares); // profit and loss logic!
        profit = +profit.toFixed(2);
      //   profit = (current price – buy price) * no. of shares
        this.setState({
            newcurrentprice: currentprice,
            profit
        })
    })
    .catch(error => {console.log(error)});

 }

   render() {
      return (
         <>
            <td>{this.state.newcurrentprice}</td>
            <td>{this.state.profit}</td>
         </>
      )
   }
}

export default AlphaCall

