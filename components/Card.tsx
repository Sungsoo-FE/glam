import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Introduction} from '../modules/introduction/introduction';
import {ScrollView} from 'react-native-gesture-handler';
import env from '../env';
import glamColors from '../public/glamColors';
import FastImage from 'react-native-fast-image';
import Images from '../assets/images';

interface Introductions {
  introductions: Introduction[];
}

export function Card({introductions}: Introductions) {
  const baseUrl = env.baseUrl;

  return (
    <View
      style={{
        flexGrow: 1,
        alignSelf: 'center',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {introductions?.map(introduction => {
          return (
            <ImageBackground
              key={introduction.id.toString()}
              source={{uri: baseUrl + introduction.pictures[0]}}
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
                    {introduction.name}, {introduction.age}
                  </Text>
                  <View style={{paddingTop: 8}}>
                    {introduction.introduction ? (
                      <Text style={{color: 'white'}}>
                        {introduction.introduction}
                      </Text>
                    ) : (
                      <View>
                        <Text style={{color: 'white', fontSize: 16}}>
                          {introduction.job}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            opacity: 0.6,
                            paddingTop: 4,
                            fontSize: 16,
                          }}>
                          {introduction.height.toString() + 'cm'}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={s.buttonWrapper}>
                    <TouchableOpacity style={s.closeButton}>
                      <FastImage
                        source={Images.delete}
                        style={s.xIcon}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={s.likeButton}>
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
    aspectRatio: 1 / 1.4,
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
