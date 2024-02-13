import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native'; // Import DrawerActions
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { IMAGES } from '../assets';
import { MyText } from '../MyText';
const DrawerHeader = () => {
    const navigation = useNavigation();
    
    const openDrawer = () => {
      navigation.dispatch(DrawerActions.openDrawer());
    };
  return (
    <View>
      <View style={styles.DrawerIcon}>
        <TouchableOpacity onPress={() => openDrawer()}>
          <Image
            source={IMAGES.Menu}
            style={{marginLeft: responsiveWidth(6)}}
          />
        </TouchableOpacity>
        <MyText title="Home" h3 color="black" style={styles.header}/>
      </View>
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
    DrawerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(29),
        marginTop:responsiveHeight(1)
      },
      header:{
        fontWeight:'bold',
      }
});
