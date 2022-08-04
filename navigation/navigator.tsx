import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Home} from '../screens/Home';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createMaterialTopTabNavigator();
// const Tab = createBottomTabNavigator();

function TopNavigation() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Test" component={TestScreen} />
    </Tab.Navigator>
  );
}

function TestScreen() {
  return <Text>test</Text>;
}

export default TopNavigation;

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Tabs />
//     </NavigationContainer>
//   );
// }
