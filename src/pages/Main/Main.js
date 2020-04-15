import React, { Component } from 'react';
import './Main.css';
import Axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import MyStock from '../../components/MyStock/MyStock';
import HorizontalLine from '../../components/HorizontalLine/HorizontalLine';
import AddStocks from '../../components/AddStocks/AddStocks';
import Modal from './../../common/Modal/Modal';


class Main extends Component {
    constructor(props){
        super(props);
        this.NoOfShares = React.createRef();
        this.BuyingPrice = React.createRef();
        this.BuyingDate = React.createRef();
    }
    state = {
        myStocks: {},
        allStocks: {},
        showModal : false,
        selectedStock : {},
        dateError : false,
        dateErrorMsg : null,
        formComplete : false,
        formIncompleteError : false
    }

    componentDidMount() {
        Axios.get('https://financial-portfolio-trac-178fd.firebaseio.com/allStocks.json')
            .then(response => {
                // console.log(response);
                let allStocks = response.data;
                    Axios.get('https://financial-portfolio-trac-178fd.firebaseio.com/myStocks.json')
                    .then(response => {
                        // console.log(response);
                    this.setState({
                        myStocks: response.data,
                        allStocks: allStocks
                    })
                })
            
            })
            .catch(error => {console.log(error)});
    }

    addStockHandler = (stock) => {
        let selectedStock = {};
    
        selectedStock.symbol = stock.symbol;
        selectedStock.name = stock.name;

        this.setState({
            showModel : true,
            selectedStock : selectedStock
        })
    }

    modalCloseHandler = () => {this.setState({showModel : false})};
   
    addStockToDBHandler = () => {
        if(this.BuyingPrice.current.value.length === 0 || this.BuyingDate.current.value.length === 0 || this.NoOfShares.current.value.length === 0){
            this.setState({
                formComplete : false,
                formIncompleteError : true
            })
        }else{
            let selectedStock = {...this.state.selectedStock}
            selectedStock.closingPrice = this.BuyingPrice.current.value;
            selectedStock.numberOfShares = this.NoOfShares.current.value;
            selectedStock.date = this.BuyingDate.current.value;
            
            Axios.post('https://financial-portfolio-trac-178fd.firebaseio.com/myStocks.json', selectedStock)
                .then(response => {
                    // console.log(response);
                    let allStocks = {...this.state.allStocks};
                    let newAllStocks = [];
                    for(let value in allStocks){
                        if(allStocks[value].symbol !== this.state.selectedStock.symbol){
                            newAllStocks.push(allStocks[value]);
                        }
                    }

                    let newMystocks = {};

                    Axios.get('https://financial-portfolio-trac-178fd.firebaseio.com/myStocks.json')
                        .then(response => {
                            newMystocks = response.data;
                       Axios.put('https://financial-portfolio-trac-178fd.firebaseio.com/allStocks.json', newAllStocks)
                            .then(response => {
                                this.setState({
                                    selectedStock : {},
                                    showModel : false,
                                    allStocks: newAllStocks,
                                    myStocks : newMystocks
                                })
                        }).catch(error => {console.log(error)});
                    }).catch(error => {console.log(error)});
                }).catch(error => {console.log(error)});
            }
        }


    dateHandler = (event) => {
        if(new Date(event.target.value).getDay() === 0 || new Date(event.target.value).getDay() === 6){
            this.setState({
                dateError : true,
                dateErrorMsg : 'you cannot select a weekend date'
            })
        }else if(new Date(event.target.value).getTime() > new Date().getTime()){
            this.setState({
                dateError : true,
                dateErrorMsg : 'you cannot select a future date'
            })

        }else{
            this.setState({
                dateError : false,
                dateErrorMsg : null
            })
        }
    }

    stopTrackingHandler = (symbol) => {
        let myStocks = this.state.myStocks;
        let newMystocks = {};
        let newAllStocksValue = {};
        for(let stock in myStocks){
            if(myStocks[stock].symbol !== symbol){
                newMystocks[stock] = (myStocks[stock]);
            }else{
                newAllStocksValue.name = myStocks[stock].name;
                newAllStocksValue.symbol = myStocks[stock].symbol;
            }
        }
        let newAllStocks = this.state.allStocks;
        newAllStocks.push(newAllStocksValue);
        Axios.put('https://financial-portfolio-trac-178fd.firebaseio.com/myStocks.json', newMystocks)
        .then(response => {
            Axios.put('https://financial-portfolio-trac-178fd.firebaseio.com/allStocks.json', newAllStocks)
            .then(response => response)
            .catch(error => {console.log(error)})
        }).catch(error => {console.log(error)})
        this.setState({
            allStocks: newAllStocks,
            myStocks: newMystocks
        })
    }
    
    render() {
        let modalContent = this.state.showModel ? 

        (
            <>
            {this.state.formIncompleteError ? <p style={{color : 'red'}}>Kindly complete the form before adding this stock for tracking</p> : null}
            <div className="AddStockForm">
             <div className="FormInput"><span className="Lable">Company Name:</span><span className="cname">{this.state.selectedStock.name}</span></div>
             <div className="FormInput"><span className="Lable">No. of Shares:</span><input id="noShares" type="number" min="1" placeholder="No of Shares" ref={this.NoOfShares}/></div>
             <div className="FormInput"><span className="Lable">Buy Price:</span><input id="buyPrice" type="number" min="1" placeholder="buying Price" ref={this.BuyingPrice}/></div>
             <div className="FormInput"><span className="Lable">Buy Date:</span><input id="buyDate" type="date" onChange={this.dateHandler} ref={this.BuyingDate}/></div>
             {this.state.dateError ? <span style={{color : 'red'}}>{this.state.dateErrorMsg}</span> : null}
            </div>
            <button className="AddButton" disabled={this.state.formComplete} onClick={this.addStockToDBHandler}>Add</button>
            </>
        )
        :null;


        return (
            <div>
                {
                    this.state.showModel ?
                    <Modal  
                        title={`Add ${this.state.selectedStock.name} to My Stocks`}
                        content = {modalContent}
                        close = {this.modalCloseHandler}/> :
                        null
                }
               <Navbar title="Finance Portfolio Tracker" />
               <MyStock myStocks = {this.state.myStocks} stopTracking = {this.stopTrackingHandler}/>
               <HorizontalLine />
               {
                Object.keys(this.state.myStocks).length < 5 ?
               <AddStocks allStocks = {this.state.allStocks} addStock={this.addStockHandler}/> :
               <AddStocks error={'You can add only 5 stocks for tracking!'} />
                }
            </div>
        )
    }
}



export default Main;
