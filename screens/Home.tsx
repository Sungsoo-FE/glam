import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../App';

type homeScreenNavigationProp = StackNavigationProp<RootStackParams>;

interface Props {
  navigation: homeScreenNavigationProp;
}

export function Home({navigation}: Props) {
  return (
    <View style={s.homeContainer}>
      <TouchableOpacity
        style={s.button}
        onPress={() => {
          navigation.navigate('Card');
        }}>
        <Text style={s.buttonText}>문제 접수 확인하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  homeContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 280,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
  },
});
