import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ListView,
  AsyncStorage,
  SectionList,
  TouchableOpacity
 
} from 'react-native';

import { Actions, Router, Scene } from "react-native-router-flux";
// import { isExpressionWrapper } from '@babel/types';
// import { Action } from 'rxjs/internal/scheduler/Action';


export default class WelcomePage extends Component {

  constructor(props) {
    super(props);
    
    this.state ={  items: []  };
  }
 
  selectItem = data => {
    
    data.isSelect = !data.isSelect;
    data.selectedClass = data.isSelect
     ? styles.selected: styles.list;

     console.log("outside");
     var SectionId = 0;
     var RowId = 0;
     for(var i = 0; i < this.state.items.length; i++)
     {
     // console.log("i");
      for(var j = 0; j < this.state.items[i].data.length; j++)
      {
        //console.log("j");
       // console.log(this.state.items[i].data[j].id);
        if (this.state.items[i].data[j].id === data.id){
          console.log("trueeeeeeeee");
          SectionId = i;
          RowId = j;
        }
      }
     }

   this.state.items[SectionId].data[RowId] = data;
   this.setState({
     items: this.state.items
   });
  

  };
  componentDidMount(){
    this._get('http://geteatsy.com/app/index.php/webservices/getRestaurantDetail?restaurantid='+this.props.restId.id).then(
      data => {
    
       const dict = data.detail;
       //console.log(dict);
       const keys = Object.keys(dict);
       const value = Object.values(dict);
       value.isSelect = false;
       value.selectedClass = styles.list;
       this.setState({
        dataSource: value
      });
       var result = [];
        
      for(var i = 0; i < keys.length; i++)
      {
          var res0 = {"title":keys[i], "data":value[i]} 
          result[i] = res0
      }
      //console.log(result);
      this.setState({items: result});
      //console.log(this.state.items);

        }
    )
  }
  _get = async (endpoint) => {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  }
  handleLogin = () => {
    console.log('hrere');
    var result = [];
    for(var i = 0; i < this.state.items.length; i++)
     {
     // console.log("i");
      for(var j = 0; j < this.state.items[i].data.length; j++)
      {

        if (this.state.items[i].data[j].isSelect){
          result.push(this.state.items[i].data[j])
          
        }else{
         // console.log("is selected false");
        }
      }
     }
     var restName = this.props.restId
     var menuDict = {result, restName}
    console.log(menuDict);
    Actions.CartPage({canada: menuDict })
  }
  render(){
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <View style={{height:'90%'}}>
          <SectionList 
            style={{marginBottom:10}}
              sections={this.state.items}  
              renderItem={({item}) => 
              <TouchableOpacity style={[styles.list, item.selectedClass]} onPress={() => this.selectItem(item)}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}>
                  <Text style={styles.item}>{item.name}</Text>
                  <Text style={styles.item0} numberOfLines={5}>{item.description}</Text>
                </View>
                <View style={{flex:0.3}}>
                  <Text style={styles.item0} numberOfLines={5}>{item.price}</Text>
                </View>

              </View>
              </TouchableOpacity>
              }  
              renderSectionHeader={({section}) => 
              <View style={styles.sectionView}>
                <Text style={styles.sectionHeader}>{section.title}</Text>
              </View>
                
            }  
              keyExtractor={(item, index) => index}  
          />  
          
          </View>
          <View style={{marginBottom:10, height:50, width:'100%', alignItems:'center', alignContent:'center',backgroundColor:'white'}}>
          <TouchableOpacity style={styles.buttonTouch0} onPress={this.handleLogin}>
              <Text style={{color:'white', fontSize:20}}>Continue</Text>
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
  sectionView:{
    justifyContent:'center',
    alignContent:'center',
    backgroundColor: 'white',  
    width:'100%',
    height:50
  },
  sectionHeader: {  
    paddingTop: 2,  
    paddingLeft: 10,  
    paddingRight: 10,  
    paddingBottom: 2,  
    fontSize: 22,  
  
    fontWeight: 'bold',  
    // color: "#fff",  
     backgroundColor: 'white', 
    
   
},  
item: {  
    paddingTop: 5,  
    paddingLeft:15,
    fontSize: 20,  
   
},
item0: {  
  padding: 5,  
  fontSize: 15, 
  paddingLeft:15, 
  //height: 44,  
  color:'gray',
  
  
},
 
  allView:{
    // alignItems:'center',
    // justifyContent:'center',
    marginLeft:15,
    marginTop:10
  },
  // buttonTouch0:{
  //   marginTop:5,
  //     width: '70%',
      
  //     // alignItems:'center',
  //     // justifyContent:'center',
      
  // },
  selected: {backgroundColor: "#E5E5E5"},
  list: {
    paddingVertical: 5,
    marginTop: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1
  },
  buttonTouch0:{
    marginTop:10,
    marginBottom:10,
    width: '70%',
    height: 45,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
    borderRadius:8,
  },
});
