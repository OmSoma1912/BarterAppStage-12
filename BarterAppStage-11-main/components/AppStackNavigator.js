import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import ExchangeScreen from '../screens/ExchangeScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';

export const AppStackNavigator = createStackNavigator({
  ExchangeScreen : {
    screen : ExchangeScreen,
    navigationOptions : {
      headerShown : false
    }
  },
  UserDetailsScreen : {
    screen : UserDetailsScreen,
    navigationOptions : {
      headerShown : false
    }
  },
  },
  {initialRouteName : 'BelongingExchangeList'
})