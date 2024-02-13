import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../Screens/Home/Home';
import Privacy from '../../Screens/Privacy/Privacy';
import Library from '../../Screens/Library/Library';
import Terms from '../../Screens/Terms/Terms';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import HomeStack from '../Stack/HomeStack';
import CustomDrawerNavigation from '../customDrawerNavigation/CustomDrawerNavigation';

const DrawerNav = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNav.Navigator
      initialRouteName="Home"
      backBehavior="firstRoute"
      drawerContent={props => <CustomDrawerNavigation {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#F8E9D6',
        },
      }}>
      <DrawerNav.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          title: 'HOME',
          drawerLabelStyle: {
            textAlign: 'center',
            color: 'white',
            fontSize: responsiveFontSize(2),
          },
          drawerActiveBackgroundColor: '#302D28',
          drawerInactiveBackgroundColor: 'transparent',
        }}
      />

      {/* <DrawerNav.Screen
        name="LIBRARY"
        component={Library}
        options={{
          headerShown: false,
          title: 'Library',
          drawerLabelStyle: {
            textAlign: 'center',
            color: '#301005',
            fontSize: responsiveFontSize(2),
          },
          drawerActiveBackgroundColor: '#302D28',
          drawerInactiveBackgroundColor: 'transparent',
          headerStyle: {
            backgroundColor: '#F8E9D6',
          },
          headerTitleAlign: 'center',
        }}
      /> */}
    </DrawerNav.Navigator>
  );
};

export default Drawer;

const styles = StyleSheet.create({});
