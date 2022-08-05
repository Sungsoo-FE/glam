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
  key: String | undefined;
  component: String;
  name: String;
  params?: object | undefined;
};

const routes: Route[] = [
  {
    key: 'Home',
    component: 'Home',
    name: '홈',
  },
  {
    key: 'Near',
    component: 'Near',
    name: '근처',
  },
  {
    key: 'Live',
    component: 'Live',
    name: '라이브',
  },
];

const Tab = createMaterialTopTabNavigator();

function TopNavigation({state, navigation}: MaterialTopTabBarProps) {
  return (
    <View style={s.TabWrapper}>
      <View style={s.TabContainer}>
        {routes.map((route: Route, index: Number) => {
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
              {route.component === 'Home' ? (
                <Image
                  source={Images.logo}
                  resizeMode={FastImage.resizeMode.contain}
                  style={[s.TabImage, isFocused ? s.focusedImage : null]}
                />
              ) : (
                <Text style={[s.TabText, isFocused ? s.focusedText : null]}>
                  {route.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity onPress={() => {}}>
        <FastImage source={Images.setting} style={s.setting} />
      </TouchableOpacity>
    </View>
  );
}

export default TopNavigation;

const s = StyleSheet.create({
  TabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 12,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  TabContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 78,
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
  TabText: {
    fontSize: 20,
    fontWeight: '600',
    color: glamColors.Gray2,
  },
  TabImage: {
    width: 60,
    height: 44,
    tintColor: glamColors.Gray2,
  },
  focusedImage: {
    tintColor: glamColors.black,
  },
  focusedText: {
    color: glamColors.black,
  },
  setting: {
    width: 24,
    height: 24,
  },
});
