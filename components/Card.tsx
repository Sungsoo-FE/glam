import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Introduction} from '../modules/introduction/introduction';
import {ScrollView} from 'react-native-gesture-handler';
import env from '../env';
import glamColors from '../public/glamColors';
import FastImage from 'react-native-fast-image';
import Images from '../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {ReducerType} from '../store';
import {additionalActions} from '../modules/introduction/additional/additionalSlice';
import {Custom, CustomCard} from './Custom';

interface Introductions {
  introductions: Introduction[] | null;
  additionalData: Introduction[] | null;
}

export function Card({introductions, additionalData}: Introductions) {
  const baseUrl = env.baseUrl;
  const dispatch = useDispatch();
  const scrollViewRef = useRef<any>();
  const [additionalList, setAdditionalList] = useState<any>([]);
  const [itemList, setItemList] = useState<any>([]);
  const [hasCustom, setHasCustom] = useState<boolean>(false);
  const [customData, setCustomData] = useState<any>([]);

  const checkEnd = ({layoutMeasurement, contentOffset, contentSize}: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const fetchAdditionalData = () => {
    if (additionalData) {
      var addedList = [...additionalData];
      var uniqueList = [...new Set(addedList)];
      setAdditionalList(uniqueList);
    }
  };

  useEffect(() => {
    dispatch(additionalActions.getAdditional());
    setItemList(introductions);
  }, []);

  const deleteItem = (index: number, isNew: boolean) => {
    var deletedList;
    if (isNew) {
      deletedList = additionalList.filter((e: object, eIndex: number) => {
        return eIndex !== index;
      });
      setAdditionalList(deletedList);
    } else {
      deletedList = itemList.filter((e: object, eIndex: number) => {
        return eIndex !== index;
      });
      setItemList(deletedList);
    }
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(e): any => {
          if (hasCustom) {
            setHasCustom(true);
          }
          if (checkEnd(e.nativeEvent)) {
            fetchAdditionalData();
          }
        }}>
        {customData && (
          <CustomCard setCustomData={setCustomData} customData={customData} />
        )}
        {itemList?.map((item: any, index: number): any => {
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
        <Custom
          setHasCustom={setHasCustom}
          hasCustom={hasCustom}
          setCustomData={setCustomData}
        />
        {additionalList?.map((item: any, index: number): any => {
          return (
            <ImageBackground
              key={item.id.toString()}
              source={{uri: baseUrl + item.pictures[0]}}
              resizeMode="cover"
              borderRadius={8}
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
                      onPress={() => deleteItem(index, true)}>
                      <FastImage
                        source={Images.delete}
                        style={s.xIcon}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={s.likeButton}
                      onPress={() => deleteItem(index, true)}>
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
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
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
