import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSidebarMenu from './CustomSidebarMenu';
import SettingsScreen from '../screens/SettingsScreen';
import MyBartersScreen from '../screens/MyBartersScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MyReceivedItemsScreen from '../screens/MyReceivedItemsScreen';

export const AppDrawer = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
  },
  MyBarters : {
    screen : MyBartersScreen
  },
  Settings : {
    screen : SettingsScreen
  },
  Notification : {
    screen : NotificationScreen
  },
  MyReceivedItems : {
    screen : MyReceivedItemsScreen
  }
  },
  {
    contentComponent : CustomSidebarMenu
  },
  {
})