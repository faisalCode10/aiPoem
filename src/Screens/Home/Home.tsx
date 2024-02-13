import {Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native'; // Import DrawerActions
import {IMAGES} from '../../assets';
import {MyText} from '../../MyText';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import HomeComponent from './Component/HomeComponent';
import DrawerHeader from '../../Components/DrawerHeader';
import { BannerAds } from '../../Ads/BannerAds';


const Home = () => {
  const navigation = useNavigation();

  const goToCreatePoem = () => {
    // Ad 
    navigation.navigate('CreatePoem' as never);
  };
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.homeContainer}>
      <DrawerHeader />

      <View style={styles.homeText}>
        <MyText
          title="Get People Inspired By Your Writing!"
          h2
          color="black"
          style={styles.text}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={goToCreatePoem}>
        <View style={styles.buttonContainer}>
          <Image source={IMAGES.Feather} style={{height:20, width:20, marginLeft:15}} />
          <MyText title="Create Poem" h3 color="black" style={styles.btnText} />
        </View>
         
          
      </TouchableOpacity>

      <HomeComponent />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#F8E9D6',
  },
  DrawerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(29),
  },
  homeText: {
    width: responsiveWidth(50),
    marginTop: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(5),
  },
  text: {
    fontWeight: '700',
    color: '#301005',
    lineHeight: 28,
  },
  createPoem: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: responsiveHeight(6),
    width: responsiveWidth(81),
    borderRadius: 8,
    backgroundColor: '#CB8538',
    marginLeft: responsiveWidth(11),
    marginTop: responsiveHeight(3),
  },
  button: {
    marginLeft: responsiveWidth(6.7),
    width: responsiveWidth(85),
    height:responsiveHeight(6.5),
    backgroundColor: '#CB8538',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:responsiveWidth(2),
    marginTop:responsiveHeight(2)
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
  
  btnText:{
    marginRight:19
  },
  bannerAd:{
    width:'90%',
    height:responsiveHeight(1),
    marginTop:responsiveHeight(2),
    marginLeft:responsiveWidth(12),
  }
});
