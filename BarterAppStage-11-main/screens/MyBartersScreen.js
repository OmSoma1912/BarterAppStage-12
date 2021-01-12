import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyBartersScreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       userName : "",
       allBarters : []
     }
     this.requestRef= null
   }

   getUserDetails = (donorId)=>{
    db.collection("users").where("email_id", "==", donorId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        this.setState({
          "donorName" : doc.data().first_name + " " + doc.data().last_name
        })
      });
    })
  }

  static navigationOptions = {header : null};

   getAllBarters =()=>{
     this.requestRef = db.collection("all_barters").where("user_id" ,'==', this.state.userId)
     .onSnapshot((snapshot)=>{
       var allBarters = snapshot.docs.map(document => document.data());
       this.setState({
         allBarters : allBarters,
       });
     })
   }

   sendItem = (itemDetails)=>{
    if(itemDetails.request_status === "Item Sent"){
      var requestStatus = "User Interested"
      db.collection("all_barters").doc(itemDetails.doc_id).update({
        "request_status" : "User Interested"
      })
      this.sendNotifaction(itemDetails,requestStatus)
     }
    else{
      var requestStatus = "Item Sent"
      db.collection("all_barters").doc(itemDetails.doc_id).update({
        "request_status" : "Item Sent"
      })
      this.sendNotifaction(itemDetails, requestStatus)
    }
   }

   sendNotifaction = (itemDetails, requestStatus)=>{
    var requestId = itemDetails.request_id
    var userId = itemDetails.user_id
    db.collection("all_barters").where("request_id", "==", requestId).where("user_id", "==", userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var message = ""
        if(requestStatus === "Item Sent"){
          message = this.state.userName + " sent you the item"
        }
        else{
          message = this.state.userName + " has shown interest in donating the item"
        }
        db.collection("all_barters").doc(doc.id).update({
          "message" : message,
          "notifaction_status" : "unread",
          "date" : firebase.firestore.FieldValue.serverTimestamp()
        })
      });
    })
  }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item.book_name}
       subtitle={"Requested By : " + item.requested_by +"   Status : " + item.request_status}
       leftElement={<Icon name="barter" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity 
           style = {[styles.button,{
            backgroundColor : item.request_status === "Item Sent" ? "green" : "#ff5722"
          }]}
          onPress = {()=>{
            this.sendItem(item)
          }}
            >
             {item.request_status === "Exchanged" ? "Exchanged" : "Exchange"}
           </TouchableOpacity>
         }
       bottomDivider
     />
   )


   componentDidMount(){
     this.getAllDonations()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Barters"/>
         <View style={{flex:1}}>
           {
             this.state.allBarters.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all Barters</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allDonations}
                 renderItem={this.renderItem}
               />
             )
           }
         </View>
       </View>
     )
   }
   }


const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})