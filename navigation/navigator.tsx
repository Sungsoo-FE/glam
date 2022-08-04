import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Home} from '../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="First" component={Home} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
