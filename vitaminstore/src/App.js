import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.png';
import './App.css';
import Home from './components/Home';
import Card from './components/Card';
import Loading from './components/Loading';
import Navigation from "./components/Navigation";
import Vitamin from './components/Vitamin';
import ProductDetails from "./components/ProductDetails";
import data from './data/data.json';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            toggleLogo: true,
            loading: true,
        };
        this.toggleLogo = this.toggleLogo.bind(this);
        // this.clickCard = this.clickCard.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.showFront = this.showFront.bind(this);
        this.showBack = this.showBack.bind(this);
    }
    componentWillMount() {
        this.setState({
            cards: data,
        });
    }

    componentDidMount() {
        setTimeout(() => this.setState({loading: false}), 3000)
    }

    toggleLogo(event){
        this.setState((prevState => ({
            toggleLogo: !prevState.toggleLogo
        })))

    }

    showBack(card){
        let cards = this.state.cards;
        cards[card.id].animation = "card card-flip";
        console.log(cards);

        this.setState({
            cards,
        });
    }

    showFront(card){
        let cards = this.state.cards;
        cards[card.id].animation = "card";
        console.log(cards);

        this.setState({
            cards,
        });
    }

    openNav(){
        document.getElementById('myNav').style.width = "100%";
    }

    closeNav(){
        document.getElementById('myNav').style.width = "0%";
    }

  render(){
    return(
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo}
                         className={this.state.toggleLogo ? 'static-logo' : 'animated-logo'}
                         alt="logo"
                        // onClick={this.toggleLogo}
                         onMouseEnter={this.toggleLogo}
                         onMouseLeave={this.toggleLogo}
                         onClick={this.openNav}
                    />
                    <h1 className={this.state.toggleLogo ? 'menu-hidden' : "menu animated bounceInDown"}
                        onClick={this.openNav}>
                        Menu
                    </h1>
                    <Navigation closeNav={this.closeNav} />
                </header>
                <Switch>
                    <Route exact path="/" render={(props) => (
                        <Home cards={this.state.cards} />
                    )}/>
                    <Route exact path="/vitamin" component={Vitamin} />
                    <Route exact path="/product/:id" render={(props) => {
                        let cardPosition = props.location.pathname.replace('/product/', '');
                        return(
                            <ProductDetails
                                card={this.state.cards[cardPosition]}
                            />
                        )
                    }}
                    />
                </Switch>
                {/*{*/}
                {/*    this.state.loading ? <Loading /> :*/}
                {/*        <Home />*/}
                {/*}*/}

            </div>
        </Router>

    )
  }
}

export default App;
