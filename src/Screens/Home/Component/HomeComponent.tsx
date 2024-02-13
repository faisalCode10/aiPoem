import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {MyText} from '../../../MyText/index';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {poems} from './dummyPoem/Poems';
import {IMAGES} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const HomeComponent = () => {
  const navigation = useNavigation();

  const goToPoemGenerator = (poemData: any) => {
    navigation.navigate('PrePoems', { poemData });
    // navigation.navigate('Poem', { poemData });
  };

  return (
    <View style={styles.container}>
      <View>
        <MyText
          title="Prescribed poetry"
          h3
          color="black"
          style={styles.header}
        />
      </View>

      {poems.map((val, index) => (
        <React.Fragment key={index}>
          <View style={styles.poetry}>
            <View style={styles.image}>
              <Image source={IMAGES.blackFeather} />
            </View>

            <View style={styles.poemTextContainer}>
              <MyText title={val.title} h3 color="black" style={styles.text} />
            </View>

            <TouchableOpacity
              style={styles.leftarrow}
              onPress={() => goToPoemGenerator(val)}>
              <Image source={IMAGES.RightArrow} />
            </TouchableOpacity>
          </View>

          <View style={styles.borderBottom}></View>
        </React.Fragment>
      ))}
    </View>
  );
};

export default HomeComponent;


const styles = StyleSheet.create({
  container: {
    flex:3,
    backgroundColor: 'rgba(234, 147, 54, 0.13)',
    width: '100%',
    // height: responsiveHeight(70),
    marginTop: responsiveHeight(8),
    borderTopLeftRadius: responsiveWidth(4),
    borderTopRightRadius: responsiveWidth(4),
    padding: responsiveHeight(4),
  },
  header: {
    fontWeight: '800',
  },
  poetry: {
    flexDirection: 'row',
    width: responsiveWidth(64),
    gap: responsiveWidth(2.1),
    marginTop: responsiveHeight(1.2),
  },
  poemTextContainer: {
    width: responsiveWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    lineHeight: responsiveHeight(3.4),
    width: '100%',
    marginTop:responsiveHeight(2)
  },
  image: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    borderColor: 'white',
    borderWidth: 0.9,
    borderRadius: responsiveWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  leftarrow: {
    height: responsiveHeight(4.5),
    width: responsiveWidth(9),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CB8538',
    borderRadius: responsiveWidth(2.5),
    marginTop:responsiveHeight(2)
  },
  borderBottom: {
    width: responsiveWidth(85),
    borderWidth: 1,
    backgroundColor: 'black',
    marginTop: responsiveHeight(2),
  },
});
