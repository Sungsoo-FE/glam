import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Home} from '../screens/Home';
import {Near} from '../screens/Near';
import {Live} from '../screens/Live';
import FastImage from 'react-native-fast-image';
import Images from '../assets/images';
import {NavigationContainer} from '@react-navigation/native';
import TopNavigation from './navigator';
import BottomNavigation from './bottomNavigation';
import {Station} from '../screens/Station';
import {Connection} from '../screens/Connection';
import {More} from '../screens/More';

const Tab = createMaterialTopTabNavigator();

function TabBar() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBar={props => <TopNavigation {...props} />}
        initialRouteName="Home"
        tabBarPosition="top"
        screenOptions={{
          tabBarActiveTintColor: 'black',
        }}>
        <Tab.Screen
          name="Home"
          component={BottomTabBar}
          options={{
            tabBarLabel: '',
            tabBarLabelStyle: {color: 'black'},
            tabBarIcon: () => (
              <FastImage
                source={Images.logo}
                style={{width: 60, height: 60}}
                resizeMode={FastImage.resizeMode.contain}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Near"
          component={Near}
          options={{
            tabBarLabel: '근처',
          }}
        />
        <Tab.Screen
          name="Live"
          component={Live}
          options={{
            tabBarLabel: '라이브',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function BottomTabBar() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBar={props => <BottomNavigation {...props} />}
        initialRouteName="Home"
        tabBarPosition="bottom"
        screenOptions={{
          tabBarActiveTintColor: 'black',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: '',
            tabBarLabelStyle: {color: 'black'},
            tabBarIcon: () => (
              <FastImage
                source={Images.logo}
                style={{width: 60, height: 60}}
                resizeMode={FastImage.resizeMode.contain}
              />
            ),
          }}
        />
        <Tab.Screen name="Live" component={Live} />
        <Tab.Screen name="Station" component={Station} />
        <Tab.Screen name="Connection" component={Connection} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabBar;
