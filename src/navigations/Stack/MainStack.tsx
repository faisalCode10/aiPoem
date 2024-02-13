import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../../Screens/Home/Home';
import Login from '../../Screens/Login/Login';
import CreatePoem from '../../Screens/CreatePoem/CreatePoem';
import {createStackNavigator} from '@react-navigation/stack';
import Poem from '../../Screens/PoemGenerator/Poem';
import Drawer from '../Drawer/Drawer';
import CustomDrawerNavigation from '../customDrawerNavigation/CustomDrawerNavigation';
const StackNav = createStackNavigator();

const MainStack = () => {
  return (
    <StackNav.Navigator initialRouteName={'Home'}>
      {/* <StackNav.Screen
        name="Home"
        component={Home }
        options={{headerShown: false}}
      /> */}
      <StackNav.Screen
        name="Drawer"
        component={Drawer}
        options={{headerShown: false}}
      />
    </StackNav.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
