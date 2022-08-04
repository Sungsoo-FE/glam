import React from 'react';
import {View, StyleSheet} from 'react-native';

interface heightProps {
  height: number;
  marginTop?: number;
}

export function Division(props: heightProps) {
  return (
    <View
      style={[
        s.division,
        {height: props.height, marginTop: props.marginTop || 0},
      ]}
    />
  );
}

const s = StyleSheet.create({
  division: {
    backgroundColor: '#F4F6F8',
  },
});
