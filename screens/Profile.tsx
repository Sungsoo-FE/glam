import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {ReducerType} from '../store';
import {profileActions} from '../modules/profile/profileSlice';
import {Profile as props} from '../modules/profile/profile';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import env from '../env';
import Images from '../assets/images';
import {Division} from '../components/Division';
import glamColors from '../public/glamColors';
import {ProfileTable} from '../components/ProfileTable';

type homeScreenNavigationProp = StackNavigationProp<RootStackParams>;

interface Props {
  navigation: homeScreenNavigationProp;
}

export function Profile({navigation}: Props) {
  const baseUrl = env.baseUrl;
  const [imageList, setImageList] = useState<any>([]);
  const dispatch = useDispatch();
  const profile = useSelector<ReducerType, props | null>(
    state => state.profileReducer.data,
  );

  const imageWidth = Math.floor(useWindowDimensions().width / 3);

  useEffect(() => {
    dispatch(profileActions.getProfile());
  }, []);

  useEffect(() => {
    var filledList: any = profile?.data.pictures;

    var nullLength = 6 - filledList?.length;

    var newImageList = [];
    newImageList.push(...filledList);

    for (var i = 0; i < nullLength; i++) {
      newImageList.push(false);
    }

    setImageList(newImageList);
  }, [profile]);

  return (
    <ScrollView
      bounces={false}
      style={{
        backgroundColor: 'white',
      }}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FlatList
        scrollEnabled={false}
        data={imageList}
        style={{flex: 1}}
        contentContainerStyle={s.listWrapper}
        renderItem={({item, index}) => (
          <TouchableOpacity>
            <FastImage
              source={imageList[index] ? {uri: baseUrl + item} : Images.person}
              style={{aspectRatio: 1 / 1, width: imageWidth}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{
          flexDirection: 'row',
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 12, color: glamColors.Gray4}}>
          다양한 매력을 보여줄 수 있는 사진을 올려주세요.{' '}
        </Text>
        <TouchableOpacity>
          <Text
            style={{fontSize: 12, fontWeight: '600', color: glamColors.Gray1}}>
            더 알아보기
          </Text>
        </TouchableOpacity>
      </View>
      <Division height={1} />
      <ProfileTable data={profile?.data} meta={profile?.meta} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  listWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
