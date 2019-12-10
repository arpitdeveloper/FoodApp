import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  AsyncStorage
 
} from 'react-native';

import { Actions, Router, Scene } from "react-native-router-flux";
import Card from "./Card";



export default class WelcomePage extends Component {

  constructor(props) {
    super(props);
   
    this.state ={ items: [] };
  }

 
  componentDidMount(){
    this._get('http://geteatsy.com/app/index.php/webservices/getAllRestaurantList').then(
      data => {
        this.setState({items: data.restaurants});
        //console.log(this.state.items);
      }
    )
  }
  _get = async (endpoint) => {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  }
  
  render(){
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.allView}>
            <Text style={{fontSize:30, fontWeight:'bold'}}>Restaurant</Text>
          </View>
          <View style={this.tableView}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              style={this.table}
              data={this.state.items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <Card item={item}/>}
            />
          </View>
          
        </SafeAreaView>
      </Fragment>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // marginTop: Constants.statusBarHeight,
    //marginHorizontal: 16,
    marginBottom:50
  },
  tableView:{
    marginBottom:10,
    
    
  },
  table:{
    marginBottom:50,
    flex:1
  },
  allView:{
    // alignItems:'center',
    // justifyContent:'center',
    marginLeft:15,
    marginTop:10,
    
  },
    buttonTouch0:{
      marginTop:50,
        width: '70%',
        height: 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black',
      },
});
