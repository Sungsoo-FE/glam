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

interface Introductions {
  introductions: Introduction[] | null;
  additionalData: Introduction[] | null;
}

export function Card({introductions, additionalData}: Introductions) {
  const baseUrl = env.baseUrl;
  const dispatch = useDispatch();
  const scrollViewRef = useRef<any>();
  const [itemList, setItemList] = useState<any>([]);

  const checkEnd = ({layoutMeasurement, contentOffset, contentSize}: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const fetchAdditionalData = () => {
    if (additionalData) {
      var addedList = [...itemList, ...additionalData];
      var uniqueList = [...new Set(addedList)];
      setItemList(uniqueList);
    }
  };

  useEffect(() => {
    dispatch(additionalActions.getAdditional());
    setItemList(introductions);
  }, []);

  const deleteItem = (index: Number) => {
    var deletedList = itemList.filter((e: object, eIndex: number) => {
      return eIndex !== index;
    });

    setItemList(deletedList);
  };

  return (
    <View
      style={{
        flexGrow: 1,
        alignSelf: 'center',
      }}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(e): any => {
          if (checkEnd(e.nativeEvent)) {
            fetchAdditionalData();
          }
        }}>
        {itemList?.map((item: any, index: number): any => {
          return (
            <ImageBackground
              key={item.id.toString()}
              source={{uri: baseUrl + item.pictures[0]}}
              resizeMode="cover"
              style={s.cardContainer}>
              <></>
              <View>
                <View style={s.cardContents}>
                  <View style={s.recommend}>
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
                      onPress={() => deleteItem(index)}>
                      <FastImage
                        source={Images.delete}
                        style={s.xIcon}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={s.likeButton}
                      onPress={() => deleteItem(index)}>
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
  cardScreen: {
    // alignItems: 'center',
  },
  cardContainer: {
    justifyContent: 'flex-end',
    marginBottom: 24,
    backgroundColor: 'black',
    opacity: 0.5,
    // aspectRatio: 1 / 1.4,
    padding: 16,
  },
  cardContents: {
    display: 'flex',
  },
  recommend: {
    // backgroundColor: 'white',
    // opacity: 0.25,
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
