import React, {Component} from 'react';
import {Header, Icon, Badge} from 'react-native-elements';
import {View, Text, StyleSheet, Alert} from 'react-native';

const MyHeader = props =>{

  BellIconWithBadge=()=>{
    return(
      <View>
        <Icon 
          name = 'bell' 
          type = 'font-awesome' 
          color = '#696969' 
          size = {25}
          onPress = {()=> this.props.navigation.navigate('Notification')}
        />
      </View>
    )
  }
  return(
    <Header
      centerComponent = {{text : props.title, style : {color : '#90A5A9', fontSize : 20, fontWeight : "bold"}}}
      backgroundColor = '#eaf8fe'
    />
  );
};

export default MyHeader;