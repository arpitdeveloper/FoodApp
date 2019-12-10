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
  AsyncStorage,
  
 
} from 'react-native';
//import  from 'tipsi-stripe';
import Stripe, { PaymentCardTextField } from 'tipsi-stripe';
import { Actions, Router, Scene } from "react-native-router-flux";
//import testId from '../src/utils/testId'


Stripe.setOptions({
  publishableKey: 'pk_test_LH4nfN9MSCjGAkaF6IWrazue00C2LoZscP',
  merchantId: '<MERCHANT_ID>',
  androidPayMode: 'test',
})
export default class signUpPage extends Component {

  constructor(props) {
    super(props);
    this.applePayTapped=this.applePayTapped.bind(this);
    this.state ={ errorMessage: null, name: false, 
    valid: false,
    params: {
      number: '',
      expMonth: 0,
      expYear: 0,
      cvc: '',
    },
    loading: false,
    token: null,
    error: null,
    subtotal: 0,
    total: 0,
    tips: 0,
    itemsArray: []
   };
  
  }
  componentDidMount(){
    var totalDict = this.props.allDict.Dict
    var iArray = totalDict.items.result
    
    var sTotal = 0;
    var result = [];
    
    for(var i = 0; i < iArray.length; i++)
     {
     // console.log(iArray[i]);
      sTotal = iArray[i].price + sTotal
      var res0 = {"name":iArray[i].name,'price':iArray[i].price, 'quantity':'1'} 
     // ["name":"\(menuDict["name"]!)","price":"\(menuDict["price"]!)","quantity":"1"]
      result[i] = res0
     }
     this.setState({itemsArray: result})
     this.setState({subtotal: sTotal})
     this.setState({total: sTotal + 50.50})
   
  }
  handleCustomPayPress = async (shouldPass = true) => {
    console.log('did');
    try {
      this.setState({ loading: true, token: null, error: null })

      const params0 = this.state.params
      const token0 = await Stripe.createTokenWithCard(this.state.params)
      //console.log(token0.tokenId);
      this.createCharge(token0.tokenId)
      this.setState({ loading: false, error: undefined, token })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }
  handleFieldParamsChange = (valid, params) => {

    //console.log('param change');
    this.setState({
      valid,
      params,
    })
   // console.log(params);
  }
  saveData() {  
    let usName = true
    AsyncStorage.setItem('user',usName);  
    Actions.HomePage()
  }  
  applePayTapped = () => {
    console.log('apple pay');
    
   
  }
  ContinueBTNTapped = () => {
    //console.log('continue');
    this.handleCustomPayPress();
   
  }
  tipBTNTapped = () => {
    console.log('tip');

   
  }
  createCharge = (tokenid) => {
    console.log(tokenid);
    var dict = {'amount':this.state.total * 100,
    'source':tokenid,
    'currency':'usd',
    'tip':this.state.tips,
    'description':'didiid',
    'delivery_charge':'50.50',
    'items':this.state.itemsArray,
    'restaurent_name':this.props.allDict.Dict.items.restName.restName,
    'restaurent_id':this.props.allDict.Dict.items.restName.id,
    'deliver_address':'Street Number: '+this.props.allDict.addressDict.street_number+' Street Name: '+this.props.allDict.addressDict.street_name+' Zip Code: '+this.props.allDict.addressDict.zip_code,
    'customername':'',
    'deliver_time':this.props.allDict.addressDict.delivery_time,
    'receipt_email':'a@gmail.com',
    'phone':this.props.allDict.addressDict.phone_number,
    'customerid':'',
  }


  fetch('http://geteatsy.com/app/index.php/webservices/stripeCreateCharge', {
    method: 'POST', //Request Type
    //body: formBody, //post body
    body: JSON.stringify(dict),
    headers: {
      'Accept':'application/json,text/plain',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-TOKEN':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyIiwicmFuZG9tIjo5NCwidXNlclR5cGUiOi0yfQ.j49XaZWGU67iklxMSKhIXg9UTlp5baZW-io_uBcBVwo'
    },
  })
    .then(response => response.json())
    //If response is in json then in success
    .then(responseJson => {
      alert(JSON.stringify(responseJson));
      console.log(responseJson);
    })
    //If response is not in json then in error
    .catch(error => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('isLoging', true);
      Actions.HomePage()
    } catch (error) {
      // Error saving data
    }
  };
  onUsernameChange(srt) {
    let s = this.state;
    s.email = srt;
    this.setState(s);   
  }

  onPasswordChange(srt) {
    let s = this.state;
    s.password = srt;
    this.setState(s);   
  }
  render(){
    const { valid, params } = this.state
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={{fontSize:22, padding:15, fontWeight:'600'}}>Summary</Text>

                <View style={{flexDirection:'row', paddingLeft:30, paddingRight:30, marginTop:10}}>
                    <View style={{flex:1}}>
                        <Text style={styles.totalText}>Order SubTotal</Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Text style={styles.totalText}>${this.state.subtotal}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', paddingLeft:30, paddingRight:30, marginTop:5}}>
                    <View style={{flex:1}}>
                        <Text style={styles.totalText}>Delivery Fee</Text>
                    </View>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <Text style={styles.totalText}>$50.50</Text>
                    </View>
                </View>
                
                <View style={{flexDirection:'row', paddingLeft:30, paddingRight:30, paddingTop:10, marginTop:10}}>
                    <View style={{flex:1}}>
                        <Text style={styles.totalText}>Total</Text>
                    </View>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <Text style={styles.totalText}>${this.state.total}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', paddingLeft:15, paddingRight:30, marginTop:20, justifyContent:'center'}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Text style={{fontSize:22,  fontWeight:'600'}}>Tip</Text>
                    </View>
                    <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                      <TouchableOpacity style={styles.tipBTN} onPress={this.tipBTNTapped}>
                        <Text style={{color:'white'}}>Tip</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems:'center',}}>
                  <TouchableOpacity style={styles.applePay} onPress={this.applePayTapped}>
                    <Text style={{color:'white'}}>Apple Pay</Text>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems:'center',marginTop:20}}>
                  <Text>- or pay with card -</Text>
                </View>
                <View style={styles.allView}>
                  <PaymentCardTextField
                    accessible={false}
                    style={styles.field}
                    onParamsChange={this.handleFieldParamsChange}
                    numberPlaceholder="XXXX XXXX XXXX XXXX"
                    expirationPlaceholder="MM/YY"
                    cvcPlaceholder="CVC"
                  />
                </View>
              
            </ScrollView>
            <View style={{marginBottom:10, height:70, width:'100%', alignItems:'center', alignContent:'center',backgroundColor:'white'}}>
          <TouchableOpacity style={styles.buttonTouch0} onPress={this.ContinueBTNTapped}>
              <Text style={{color:'white', fontSize: 20}}>Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  tipBTN:{
    width: 40,
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
    borderRadius:8
  },
  applePay:{
    marginTop:30,
    width: '70%',
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
    borderRadius:8
  
  },
  totalText:{
    fontSize:20,

  },
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
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
  },
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  buttonTouch0:{
    marginTop:10,
    width: '70%',
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
    borderRadius:8
  },
});
