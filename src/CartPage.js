import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  TextInput
 
} from 'react-native';

import { Actions, Router, Scene } from "react-native-router-flux";




export default class WelcomePage extends Component {

  constructor(props) {
    super(props);
    //this.handleLogin=this.handleLogin.bind(this);
    this.state ={ noteData: '',  items: [] };
  }
  
  tappedContinue = () => {
    console.log('hrere');
    var dataDict = {
      'note_data':this.state.noteData,
      'items':this.props.canada
    }
    console.log(dataDict);
    Actions.DeliveryPage({mainData: dataDict })
  }
  componentDidMount(){
    console.log(this.props.canada);
 
  }
  _get = async (endpoint) => {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  }
  onAddNote(srt) {
    let s = this.state;
    s.noteData = srt;
    this.setState(s);   
  }
  render(){
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          
            <View style={{flexDirection: 'column', flex:1}}>
              <View style={{flex:1, backgroundColor:'white'}}>
                <ScrollView >
                  <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={this.table}
                    data={this.props.canada.result}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <View style={{flexDirection: 'row', flex:1, height:40, justifyContent:'center'}}>
                      <View style={{flex:1,  justifyContent:'center'}}>
                        <Text style={{fontSize:20, paddingLeft:15}}>{item.name}</Text>
                      </View>
                      <View style={{flex:0.2,  justifyContent:'center'}}>
                        <Text>{item.price}</Text>
                      </View>
                    </View>}
                  />
                  <View style={{flex:1, marginTop:50, marginRight:15, marginLeft:15}}>
                    <Text style={{fontSize:18, fontWeight:'bold' }}>How would you like your food?</Text>
                    <View style={{flexDirection: 'row', flex:1, marginTop:5}}>
                      <View style={{backgroundColor:'blue', height:100, width:2}}/>
                      <View style={{flexDirection: 'row', flex:1}}>
                        <TextInput style={styles.TextView} placeholder='Medium rare steak, gluten free...' onChangeText={(note)=>this.onAddNote(note)}/>
                      </View>
                      
                    </View>
                    
                  </View>
                </ScrollView>
              </View>
              
              <View style={styles.buttonView}>
                <TouchableOpacity style={styles.buttonTouch0} onPress={this.tappedContinue}>
                  <Text style={{color:'white',fontSize:20}}>Continue</Text>
                </TouchableOpacity>
              </View>
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
  TextView:{
    height:100,
    padding:10,
    
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
    marginTop:5,
    width: '70%',
    height: 45,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
    borderRadius:8
  },
  buttonView:{
    flex:0.12,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
});
