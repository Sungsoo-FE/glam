import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {ReducerType} from '../store';
import {profileActions} from '../modules/profile/profileSlice';
import {Profile} from '../modules/profile/profile';

type homeScreenNavigationProp = StackNavigationProp<RootStackParams>;

interface Props {
  navigation: homeScreenNavigationProp;
}

export function Profile({navigation}: Props) {
  const dispatch = useDispatch();
  const profiles = useSelector<ReducerType, Profile[] | null>(
    state => state.profileReducer.data,
  );
  console.log(profiles);

  useEffect(() => {
    dispatch(profileActions.getProfile());
  }, []);

  return <View style={s.homeContainer}></View>;
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
