import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../App';
import {Card} from '../components/Card';
import env from '../env';
import {useDispatch, useSelector} from 'react-redux';
import {ReducerType} from '../store';
import {Introduction} from '../modules/introduction/introduction';
import {introductionActions} from '../modules/introduction/introductionSlice';
import {additionalActions} from '../modules/introduction/additional/additionalSlice';

type homeScreenNavigationProp = StackNavigationProp<RootStackParams>;

interface Props {
  navigation: homeScreenNavigationProp;
}

export function Home({navigation}: Props) {
  const dispatch = useDispatch();
  const introductions = useSelector<ReducerType, Introduction[] | null>(
    state => state.introductionReducer.data,
  );

  useEffect(() => {
    dispatch(introductionActions.getIntroductions());
    dispatch(additionalActions.getAdditional());
  }, []);

  return (
    <View style={s.homeContainer}>
      {introductions && <Card introductions={introductions} />}
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
