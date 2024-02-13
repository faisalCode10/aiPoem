import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';
import { MyText } from '../MyText';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Spinner isVisible={true} size={50} type={'Bounce'} color={'#000'} />
      <MyText title='Generating Poem...' h2 color='black' />
    </View>
  );
};

export default Loader;


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F8E9D6',
    }
})