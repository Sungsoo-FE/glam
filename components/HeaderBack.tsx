import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../App';
// import BackIcon from '../assets/images/BackIcon.svg';

type screenNavigationProp = StackNavigationProp<RootStackParams>;

interface props {
  navigation: screenNavigationProp;
}

export default function HeaderBack({navigation}: props) {
  return (
    <TouchableOpacity
      style={s.BackIcon}
      onPress={() => {
        navigation.pop();
      }}>
      {/* <BackIcon /> */}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  BackIcon: {
    width: 40,
    height: 40,
    marginLeft: 24,
    marginTop: 14,
  },
});
