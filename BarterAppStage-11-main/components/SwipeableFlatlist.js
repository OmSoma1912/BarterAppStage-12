import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Dimensions} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableFlatlist extends Component{
  constructor(props){
    super(props)
    this.state = {
      allNotifications : this.props.allNotifications
    }
  }

  updateMarkAsRead = (notification)=>{
    db.collection("all_notifications").doc(notification.doc_id).update({
      "notification_status" : "read"
    })
  }

  onSwipeValueChange = swipeData =>{
    var allNotifications = this.state.allNotifications
    const{key, value} = swipeData;
    if(value < -Dimensions.get('window').width){
      const newData = [...allNotifications];
      const prevIndex = allNotifications.findIndex(item => item.key === key);
      this.updateMarkAsread(allNotifications[prevIndex]);
      newData.splice(prevIndex, 1);
      this.setState({allNotifications : newData})
    };
  };

  closeRow = (item, key)=>{
    if(item[key]){
      item[key].closeRow();
    }
  };

  deleteRow = (item, key)=>{
    var allNotifications = this.state.allNotifications
    this.closeRow(item, key);
    const newData = [...allNotifications];
    const prevIndex = allNotifications.findIndex(item => item.key === key);
    this.updateMarkAsread(allNotifications[prevIndex]);
    newData.splice(prevIndex, 1);
    this.setState({allNotifications : newData})
  };

  onRowDidOpen = key =>{
    console.log('This row opened', key)
  };

  renderItem = data =>(
    <TouchableHighlight>
      <ListItem
        leftElement = {<Icon name = "book" type = "font-awesome" color = '#696969'/>}
        title = {data.item.book_name}
        titleStyle = {{color : 'black', fontWeight : 'bold'}}
        subtitle = {data.item.message}
        bottomDivider
      />
    </TouchableHighlight>
  );

  renderHiddenItem = (data, item) =>{
    <View style = {styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style = {[style.backRightBtn, styles.backRightBtnLeft]}
        onPress =  {()=> this.closeRow(item,data.item.key)}
      >
        <Text style = {styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style = {[style.backRightBtn, styles.backRightBtnLeft]}
        onPress =  {()=> this.deleteRow(item,data.item.key)}
      >
        <Text style = {styles.backTextWhite}>Mark as Read</Text>
      </TouchableOpacity>
    </View>
  }

  render(){
    return(
      <View style = {styles.container}>
        <SwipeListView
          disableRightSwipe
          data = {this.state.allNotifications}
          renderItem = {this.renderItem}
          renderHiddenItem = {this.renderHiddenItem}
          rightOpenValue = {-Dimensions.get(window).width}
          previewkey =  {'0'}
          previewOpenValue = {'-40'}
          previewOpenDelay = {3000}
          onSwipeValueChange = {this.onSwipeValueChange}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      flex: 1,
  },
  backTextWhite: {
      color: '#FFF',
  },
  rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
  },
  backRightBtnLeft: {
      backgroundColor: 'blue',
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  },
});
