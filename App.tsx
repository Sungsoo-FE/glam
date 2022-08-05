import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Home} from './screens/Home';
import {Near} from './screens/Near';
import {Live} from './screens/Live';
import {Provider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HeaderBack from './components/HeaderBack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer, {rootSaga} from './store';
import createSagaMiddleware from '@redux-saga/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from './navigation/tabBar';

export enum RootScreens {
  Home = 'Home',
  Card = 'Card',
  Nav = 'Nav',
  Near = 'Near',
  Live = 'Live',
}

export type RootStackParams = {
  Home: undefined;
  Card: undefined;
  Nav: undefined;
  Near: undefined;
  Live: undefined;
};
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

const RootStack = createStackNavigator<RootStackParams>();

const Tap = createMaterialTopTabNavigator<RootStackParams>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <SafeAreaProvider style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer independent={true}>
          <RootStack.Navigator
            initialRouteName="Nav"
            screenOptions={({navigation}) => ({
              headerStatusBarHeight: 0,
              title: '',
              gestureEnabled: true,
              headerBackTitleVisible: false,
              headerLeft: () => <HeaderBack navigation={navigation} />,
            })}>
            <RootStack.Screen name="Nav" component={TabBar} />
            <RootStack.Screen
              name="Home"
              component={Home}
              options={{headerLeft: () => null}}
            />
            <RootStack.Screen name="Near" component={Near} />
            <RootStack.Screen name="Live" component={Live} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
