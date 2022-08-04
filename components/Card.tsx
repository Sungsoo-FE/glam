import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Division} from './Division';
import {useDispatch, useSelector} from 'react-redux';
import {introductionActions} from '../modules/introduction/introductionSlice';
import {ReducerType} from '../store';
import {Introduction} from '../modules/introduction';

export function Card() {
  const dispatch = useDispatch();
  const introductions = useSelector<ReducerType, Introduction[] | null>(
    state => state.introductionReducer.data,
  );
  useEffect(() => {
    dispatch(introductionActions.getIntroductions());

    console.log(introductions);
  }, []);
  return (
    <View></View>
    // <ImageBackground
    //   source={require('')}
    //   resizeMode="cover"
    //   style={s.infoContainer}>
    //   <View></View>
    // </ImageBackground>
  );
}

const s = StyleSheet.create({
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 24,
  },
  subTitle: {
    width: 327,
    height: 28,
    marginTop: 40,
    marginBottom: 24,
  },
  subTitleText: {
    fontSize: 20,
    fontWeight: '700',
  },
  date: {
    height: 24,
    marginTop: 24,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700',
  },
  dateInfoBox: {
    height: 48,
    marginTop: 8,
  },
  dateInfo: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  addressBox: {
    marginTop: 16.5,
  },
  addressText: {
    marginTop: 8,
  },
});
