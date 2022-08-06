import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import glamColors from '../public/glamColors';
import FastImage from 'react-native-fast-image';
import Images from '../assets/images';

type Route = {
  key: string | undefined;
  component: string;
  url: string;
  name: string;
  params?: object | undefined;
};

const routes: Route[] = [
  {
    key: 'Home',
    url: Images.home,
    component: 'Home',
    name: '홈',
  },
  {
    key: 'Live',
    url: Images.live,
    component: 'Live',
    name: '라이브',
  },
  {
    key: 'Station',
    url: Images.station,
    component: 'Station',
    name: '스테이션',
  },
  {
    key: 'Connection',
    url: Images.connection,
    component: 'Connection',
    name: '커넥션',
  },
  {
    key: 'Profile',
    url: Images.more,
    component: 'Profile',
    name: '프로필',
  },
];

const Tab = createMaterialTopTabNavigator();

function BottomTabBar({state, navigation}: MaterialTopTabBarProps) {
  return (
    <View style={s.TabContainer}>
      {routes.map((route: Route, index: number) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.component.toString());
          }
        };
        return (
          <TouchableOpacity
            style={[s.TabButton, isFocused ? s.focusedButton : null]}
            onPress={onPress}
            key={route.key?.toString()}>
            {route.url && (
              <Image
                source={route.url.toString()}
                resizeMode={FastImage.resizeMode.contain}
                style={[s.TabImage, isFocused ? s.focusedImage : null]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomTabBar;

const s = StyleSheet.create({
  TabContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 78,
    backgroundColor: 'white',
  },
  TabButton: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  focusedButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  TabImage: {
    width: 24,
    height: 24,
    tintColor: glamColors.Gray2,
  },
  focusedImage: {
    tintColor: glamColors.black,
  },
  setting: {
    width: 24,
    height: 24,
  },
});
