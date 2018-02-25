import React, { Component } from 'react';
import './App.css';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import 'antd/dist/antd.css';
import {List} from 'antd';

class MyModal extends Component{
   render(){
      const { text,onRequestClose } = this.props;
      return (
         <Modal 
            onRequestClose={onRequestClose}
            effect={Effect.Newspaper}>
            <h1>Name : {text.name}</h1>
            <List><b>Rank : </b> {text.rank}</List>
            <List><b>price in usd: </b> {text.price_usd} </List>
            <List><b>price in btc : </b> {text.price_btc} </List>
            <List><b>volume in usd : </b> {text.volume_usd} </List>
            <List><b>market in cap in usd : </b> {text.market_cap_usd} </List>
            <List><b>available in supply : </b> {text.available_supply} </List>
            <List><b>total in supply : </b> {text.total_supply} </List>
            <List><b>max in supply : </b> {text.max_supply} </List>
            <List><b>percent in change in 1h : </b> {text.percent_change_1h} </List>
            <List><b>percent in change in 24h : </b> {text.perrcent_change_24h} </List>
            <List><b>percent in change in 7d : </b> {text.percent_change_7d} </List>
            <List><b>last in updated : </b> {text.last_updated} </List>
             <button onClick={ModalManager.close}>Close Modal</button>
         </Modal>
      );
   }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.openModal = this.openModal.bind(this);
    }
    openModal(g) {
       let text = g;
       ModalManager.open(<MyModal text={text} onRequestClose={() => true}/>);
    }
    componentDidMount() {
        this.timer = setInterval(()=> this.getData())
    }
    getData() {
        fetch('https://api.coinmarketcap.com/v1/ticker/')
            .then (response => response.json())
            .then ((response) => {
                this.setState ({
                    data: response
                })
            })
    }
    componentWillUpdate() {
        this.timer = setInterval(()=> this.getData(),300000)
    }
    render() {
        return (
            <div className="">
                <h1 style={{backgroundColor :"black" ,color: "white", textAlign:"center"}}>
                    All Cryptocurrencies
                </h1>
                <div>
                    {
                        this.state.data.map((data, key) => 
                            <List onClick={() => this.openModal(data)} style= {{backgroundColor: "#a4a7a8", marginTop: "5px", fontSize: "32px"}} key = {data.id}>
                                {data.name}
                            </List>
                        )
                    }
                </div>
            </div>
        );
    }
}
export default App;
