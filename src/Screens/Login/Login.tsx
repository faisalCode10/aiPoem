import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { IMAGES } from '../../assets';
import { MyText } from '../../MyText';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

  const navigate = useNavigation();

  useEffect(() =>{
   setTimeout(() =>  navigate.navigate('Drawer' as never), 2000)
  },[])

  return (
    <View style={{ backgroundColor: '#F8E9D6', flex:1 }}>     
      <View style={styles.welcomeText}>
        <MyText
          title="Take your first step, unveiling a realm of untold potential"
          h2
          color="black"
          style={styles.text}
        />
      </View>
      <View style={styles.Image}>
        <Image source={IMAGES.Quill} />
      </View>
     
    </View>
  );
};

export default Login;


const styles = StyleSheet.create({
  headerCross: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: responsiveHeight(4),
  },
  welcomeText: {
    marginTop: responsiveScreenHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(10),
    width: responsiveWidth(100),
  },
  text: {
    width: '100%',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 28,
  },
  Image: {
    height: responsiveHeight(50),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:responsiveScreenHeight(5)
  },
  loginBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: responsiveHeight(6),
    width: responsiveWidth(70),
    borderRadius: 8,
    backgroundColor: '#CB8538',
    marginLeft: responsiveWidth(14),
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveWidth(3),
  },
});
