import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import WelcomePage from './src/WelcomePage';
import MenuPage from './src/MenuPage';
import CartPage from './src/CartPage';
import DeliveryPage from './src/DeliveryPage';
import PaymentPage from './src/PaymentPage';
import Root from './src/Root';
import { Actions, Router, Scene } from "react-native-router-flux";

export default class App extends Component{
 
  render(){
    return (

      <Router>
          <Scene key="app" hideNavBar>
            <Scene key="WelcomePage" component={WelcomePage} />
            <Scene key="MenuPage" component={MenuPage} hideNavBar={false} />
            <Scene key="CartPage" component={CartPage} hideNavBar={false} title='Cart' backTitle=''/>
            <Scene key="DeliveryPage" component={DeliveryPage} hideNavBar={false} title='Delivery Info' backTitle=''/>
            <Scene key="PaymentPage" component={PaymentPage} hideNavBar={false} title='Payment' backTitle=''/>
            <Scene key="Root" component={Root} hideNavBar={false} />
          </Scene>
        </Router>
    );
  }
  
}
