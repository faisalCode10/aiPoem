import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Share,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {IMAGES} from '../../assets';

import {useNavigation} from '@react-navigation/native';

import {MyText} from '../../MyText/index';

import {ScrollView} from 'react-native-gesture-handler';

import {storeSavedData} from '../../utils';

import {nanoid} from 'nanoid/non-secure';
import { BannerAds } from '../../Ads/BannerAds';

const Poem = ({route}: {route: any}) => {
  const poemData = route.params.poemData;

  console.log(poemData.title);

  const navigate = useNavigation();

  const goToHome = () => {
    navigate.navigate('Home' as never);
  };

  const store_poem = async () => {
    try {
      await storeSavedData({...poemData, uid: nanoid()});
      Alert.alert('Poem saved successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const sharePoem = async () => {
    try {
      const result = await Share.share({
        message: poemData.content,
      });
  
      if (result.action === Share.sharedAction) {
        // Share was successful
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed by the user
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  

  return (
    <View style={styles.poemContainer}>
      <View style={styles.header}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={goToHome}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(3),

            }}>
            <Image source={IMAGES.leftArrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.shareIcon} onPress={sharePoem}>
            <Image source={IMAGES.share} />
            <MyText title="Share" h5 color="black"  style={styles.share}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexDirection:'column', gap:responsiveHeight(0), }}>
      <View style={styles.poemHeader}>
        <MyText
          title={poemData.title}
          h1
          color="black"
          style={styles.poemHeaderText}
        />
      </View>
      {/* Poem Data */}
      <View>
        <ScrollView >
          <View style={styles.generatedText} >
            <Text style={{ textAlign: 'center', color: '#CB8538', marginRight:responsiveWidth(12)}}>
              {poemData.content}
            </Text>
          </View>
        </ScrollView>
      </View>
      </View>
      <BannerAds />
    </View>
  );
};

export default Poem;

const styles = StyleSheet.create({
  poemContainer: {
    backgroundColor: '#F8E9D6',
    flex: 1,
    padding: responsiveWidth(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrowContainer: {
    width: responsiveWidth(1),
    height: responsiveHeight(1),
  },

  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: responsiveHeight(0.4),
  },

  shareIcon: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginRight: responsiveWidth(2),
    marginBottom:4
  },
  poemHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(70),
    marginTop: responsiveHeight(1),
    marginLeft: responsiveWidth(10),
  },
  poemHeaderText: {
    fontSize: responsiveFontSize(2.3),
    color: '#000',
    fontWeight: '700',
    fontFamily: 'popins',
    textAlign:'center'
  },
  generatedText: {
    marginTop: responsiveHeight(2),
    width: '100%',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:responsiveWidth(3)
  },
  share: {
    textAlign: 'center',
    // marginLeft: -6,
    marginLeft: responsiveWidth(-2),
    fontSize:responsiveFontSize(1),
    fontWeight:'bold',
    // marginTop:
  },
});
