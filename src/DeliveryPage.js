import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  AsyncStorage
 
} from 'react-native';


import { Actions, Router, Scene } from "react-native-router-flux";




export default class signUpPage extends Component {

  constructor(props) {
    super(props);
    this.handleLogin=this.handleLogin.bind(this);
    this.state ={ deliverTime: '', streetNum: '', streetName: '', zipCode: '',phone:'' };
  }
  saveData() {  
    let usName = true
    AsyncStorage.setItem('user',usName);  
    Actions.HomePage()
  }  
  handleLogin = () => {
    console.log('hrere');
    //Actions.Root();
    var addressDict = {
      'street_number':this.state.streetNum,
      'street_name':this.state.streetName,
      'delivery_time':this.state.deliverTime,
      'phone_number':this.state.phone,
      'zip_code':this.state.zipCode,
    };

    if (( this.state.streetNum == '' ) && ( this.state.streetName == '' ) && ( this.state.deliverTime == '' ) && ( this.state.phone == '' ) && ( this.state.zipCode == '' )){
      console.log('all epty');
    }
    else{
      if ( this.state.zipCode == '78746' ){
        var Dict = this.props.mainData
        var mainDict ={ Dict, addressDict};
        //console.log(mainDict.Dict);
        Actions.PaymentPage({allDict: mainDict});
      }
      else{
        console.log('zipcocde not avleliable');
      }
    }
  
   
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('isLoging', true);
      Actions.HomePage()
    } catch (error) {
      // Error saving data
    }
  };
  
 _storeData = async (name) => {
  try {
    await AsyncStorage.setItem('isLogin', name);
    Actions.HomePage()
  } catch (error) {
    // Error saving data
  }
};
 onDeliveryTime(srt) {
  let s = this.state;
  s.deliverTime = srt;
  this.setState(s);   
}
onStreetNumber(srt) {
  let s = this.state;
  s.streetNum = srt;
  this.setState(s);   
}
onStreetName(srt) {
  let s = this.state;
  s.streetName = srt;
  this.setState(s);   
}
onZipCode(srt) {
  let s = this.state;
  s.zipCode = srt;
  this.setState(s);   
}
onPhoneNumber(srt) {
  let s = this.state;
  s.phone = srt;
  this.setState(s);   
}
  render(){
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
         <View style={styles.allView}>
           <TextInput style={styles.textView} placeholder='Delivery Time' onChangeText={(time)=>this.onDeliveryTime(time)} />
           <TextInput style={styles.textView} placeholder='Street Number' onChangeText={(number)=>this.onStreetNumber(number)} />
           <TextInput style={styles.textView} placeholder='Street Name'  onChangeText={(name)=>this.onStreetName(name)} />
           <TextInput style={styles.textView} placeholder='Phone Number'  onChangeText={(phone)=>this.onPhoneNumber(phone)}/>
           <TextInput style={styles.textView} placeholder='Zip Code'  onChangeText={(code)=>this.onZipCode(code)}/>
           <TouchableOpacity style={styles.buttonTouch0} onPress={this.handleLogin}>
            <Text style={{color:'white', fontSize:20}}>N E X T</Text>
          </TouchableOpacity>
          <Text>{this.state.errorMessage}</Text>
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
    marginBottom:0,
    backgroundColor:'white'
  },
  textView:{
    width: '70%',
    height:40,
    paddingLeft:10,
    paddingRight:10,
    borderBottomWidth:1,
    marginTop:20,

  },
  allView:{
    alignItems:'center',
    justifyContent:'center',
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
