import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SignupLoginScreen from './screens/SignupLoginScreen';
import HomeScreen from './screens/HomeScreen';
import ExchangeScreen from './screens/ExchangeScreen';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';

export default class App extends React.Component{
  render(){
    return <AppContainer/>;
  }
}

const TabNavigator = createBottomTabNavigator({
  SignupLogin : {screen: SignupLoginScreen},
  Home : {screen: HomeScreen},
  SignupLogin : {screen: ExchangeScreen},
  Drawer : {screen : AppDrawerNavigator}
});

const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "red",
    alignItems : "center",
    justifyContent : "center"
  }
});



