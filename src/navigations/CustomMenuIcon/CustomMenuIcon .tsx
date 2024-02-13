import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { IMAGES } from '../../assets';

const CustomMenuIcon  = () => {
    return <Image source={IMAGES.Menu} style={{ width: 24, height: 24 }} />;
}

export default CustomMenuIcon 

const styles = StyleSheet.create({})