import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import env from '../env';
import {useDispatch, useSelector} from 'react-redux';
import {ReducerType} from '../store';
import {Introduction} from '../modules/introduction/introduction';
import {customActions} from '../modules/introduction/custom/customSlice';
import glamColors from '../public/glamColors';
import FastImage from 'react-native-fast-image';
import Images from '../assets/images';

interface CustomProps {
  setHasCustom: (hasCustom: boolean) => void;
  hasCustom: boolean;
  setCustomData: (data: any) => void;
}

export function Custom({setHasCustom, hasCustom, setCustomData}: CustomProps) {
  const dispatch = useDispatch();
  const customIntroductionData = useSelector<
    ReducerType,
    Introduction[] | null
  >(state => state.customReducer.data);

  useEffect(() => {
    dispatch(customActions.getCustom());
    setCustomData(customIntroductionData);
  }, [hasCustom]);

  return (
    <View style={s.homeContainer}>
      <TouchableOpacity onPress={() => setHasCustom(true)}>
        <View>
          <Text style={s.titleText}>맞춤 추천</Text>
        </View>
        <View style={s.contentWrapper}>
          <View style={s.contentWrapper}>
            <FastImage
              source={Images.today}
              resizeMode={FastImage.resizeMode.contain}
              style={s.customIcon}
            />
            <Text>글램 추천</Text>
            <HotIcon source={Images.hot} />
          </View>
          <View style={s.selectButton}>
            <Text style={s.selectText}>선택</Text>
          </View>
        </View>
        <View style={s.contentWrapper}>
          <View style={s.contentWrapper}>
            <FastImage
              source={Images.dia}
              resizeMode={FastImage.resizeMode.contain}
              style={s.customIcon}
            />
            <Text>최상위 매력</Text>
            <HotIcon source={Images.hot} />
          </View>
          <View style={s.selectButton}>
            <Text style={s.selectText}>선택</Text>
          </View>
        </View>
        <View style={s.contentWrapper}>
          <View style={s.contentWrapper}>
            <FastImage
              source={Images.glamour}
              resizeMode={FastImage.resizeMode.contain}
              style={s.customIcon}
            />
            <Text>볼륨감 있는 체형</Text>
            <HotIcon source={Images.hot} />
          </View>
          <View style={s.selectButton}>
            <Text style={s.selectText}>선택</Text>
          </View>
        </View>
        <View style={s.contentWrapper}>
          <View style={s.contentWrapper}>
            <FastImage
              source={Images.withpet}
              resizeMode={FastImage.resizeMode.contain}
              style={s.customIcon}
            />
            <Text>반려 동물을 키우는</Text>
            <HotIcon source={Images.hot} />
          </View>
          <View style={s.selectButton}>
            <Text style={s.selectText}>선택</Text>
          </View>
        </View>
        <View style={s.moreButton}>
          <Text style={s.moreText}>24개 항목 모두 보기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function HotIcon({source}: any) {
  return (
    <FastImage
      source={source}
      resizeMode={FastImage.resizeMode.contain}
      style={s.hotIcon}
    />
  );
}

interface CustomCardProps {
  setCustomData: (data: Introduction[]) => void;
  customData: Introduction[] | null;
}

export function CustomCard({setCustomData, customData}: CustomCardProps) {
  const dispatch = useDispatch();
  const customIntroductionData = useSelector<
    ReducerType,
    Introduction[] | null
  >(state => state.customReducer.data);
  const baseUrl = env.baseUrl;
  const [customDataList, setCustomDataList] = useState<any>([]);

  useEffect(() => {
    dispatch(customActions.getCustom());
    setCustomDataList(customIntroductionData);
  }, []);

  const deleteItem = (index: number, isNew: boolean) => {
    var deletedList = customDataList.filter((e: object, eIndex: number) => {
      return eIndex !== index;
    });
    setCustomData(deletedList);
  };

  return (
    <View>
      {customData?.map((item: any, index: number): any => {
        return (
          <ImageBackground
            borderRadius={8}
            key={item.id.toString()}
            source={{uri: baseUrl + item.pictures[0]}}
            resizeMode="cover"
            style={s.cardContainer}>
            <></>
            <View>
              <View style={s.cardContents}>
                <View>
                  <Text style={s.recommendText}>오늘의 추천</Text>
                </View>
                <Text
                  style={{
                    color: 'white',
                    paddingTop: 12,
                    fontSize: 24,
                    fontWeight: '600',
                  }}>
                  {item.name}, {item.age}
                </Text>
                <View style={{paddingTop: 8}}>
                  {item.introduction ? (
                    <Text style={{color: 'white'}}>{item.introduction}</Text>
                  ) : (
                    <View>
                      <Text style={{color: 'white', fontSize: 16}}>
                        {item.job}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          opacity: 0.6,
                          paddingTop: 4,
                          fontSize: 16,
                        }}>
                        {item.height.toString() + 'cm'}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={s.buttonWrapper}>
                  <TouchableOpacity
                    style={s.closeButton}
                    onPress={() => deleteItem(index, false)}>
                    <FastImage
                      source={Images.delete}
                      style={s.xIcon}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={s.likeButton}
                    onPress={() => deleteItem(index, false)}>
                    <Text style={{color: 'white', fontWeight: '500'}}>
                      좋아요
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  homeContainer: {
    borderRadius: 12,
    borderColor: glamColors.Gray2,
    borderWidth: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    alignSelf: 'center',
  },
  titleWrapper: {},
  titleText: {
    paddingTop: 24,
    paddingBottom: 12,
    fontSize: 20,
    fontWeight: '600',
    color: glamColors.black,
  },
  customIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
    marginTop: 11,
    marginBottom: 11,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
  },
  hotIcon: {
    width: 30,
    height: 24,
    marginLeft: 4,
  },
  selectButton: {
    width: 76,
    height: 32,
    backgroundColor: glamColors.Blue,
    borderRadius: 8,
    justifyContent: 'center',
  },
  selectText: {
    alignSelf: 'center',
    color: 'white',
  },
  moreButton: {
    backgroundColor: glamColors.Gray1,
    marginTop: 5,
    marginBottom: 16,
    height: 44,
    justifyContent: 'center',
    borderRadius: 8,
  },
  moreText: {
    alignSelf: 'center',
    color: glamColors.black,
    fontSize: 14,
    fontWeight: '600',
  },
  cardContainer: {
    justifyContent: 'flex-end',
    marginBottom: 24,
    backgroundColor: 'black',
    opacity: 0.5,
    aspectRatio: 1 / 1.4,
    borderRadius: 8,
    padding: 16,
    marginLeft: 32,
    marginTop: 16,
  },
  cardContents: {
    display: 'flex',
  },
  recommendText: {
    fontSize: 14,
    color: 'white',
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignSelf: 'stretch',
  },
  closeButton: {
    width: 48,
    height: 44,
    backgroundColor: 'gray',
    marginRight: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    flex: 1,
    height: 44,
    backgroundColor: glamColors.Blue,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xIcon: {
    width: 24,
    height: 24,
  },
});
