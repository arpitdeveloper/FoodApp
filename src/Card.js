import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage
 
} from 'react-native';

import { Actions, Router, Scene } from "react-native-router-flux";




export default class WelcomePage extends Component {

  handleLogin = () => {
   // console.log(this.props.item.id);
   var restDict = {'id':this.props.item.id, 'restName':this.props.item.name};
   Actions.MenuPage({restId: restDict})
 
  }
 
  
  render(){
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
   
           <TouchableOpacity style={styles.buttonTouch0} onPress={this.handleLogin}>
            <ImageBackground style={{ width:'100%', height:'100%', resizeMode:'contain',borderRadius: 15,overflow: 'hidden'}} source= {{uri:this.props.item.image_path}}>
                <View style={styles.textView}>
                  <Text style={{color:'white', fontSize:20, fontStyle:'oblique',textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5}}>{this.props.item.name}</Text>
                  <Text style={{color:'white', fontSize:18,textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5}}>{this.props.item.category}</Text>
                </View>
            </ImageBackground>
          </TouchableOpacity>
     
        </SafeAreaView>
      </Fragment>
    );
  }
  
}

const styles = StyleSheet.create({
  textView:{
    marginLeft:15,
    height:'95%',
    justifyContent:'flex-end',
    marginBottom:10
  },
  allView:{
    // alignItems:'center',
    // justifyContent:'center',
    width:'100%'
  },
    buttonTouch0:{
      marginTop:10,
      marginBottom:10,
        width: '90%',
        height: 250,
        marginLeft:'5%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#000',
        shadowOpacity: 1,
        elevation: 10,
        backgroundColor : "#0000",
        borderRadius: 10,
        

      },
});
