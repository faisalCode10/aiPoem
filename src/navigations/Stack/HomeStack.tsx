import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreatePoem from '../../Screens/CreatePoem/CreatePoem';
import Home from '../../Screens/Home/Home';
import Poem from '../../Screens/PoemGenerator/Poem';
import PrePoem from '../../Screens/PrePoems/PrePoem';
import Library from '../../Screens/Library/Library';
const StackNav = createStackNavigator();

const HomeStack = () => {
  return (
    <StackNav.Navigator initialRouteName={'Home'}>
      <StackNav.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}

      />
      <StackNav.Screen
        name="CreatePoem"
        component={CreatePoem}
        options={{headerShown: false}}
      />
      <StackNav.Screen
        name="Poem"
        component={Poem}
        options={{headerShown: false}}
      />
      <StackNav.Screen
        name="PrePoems"
        component={PrePoem}
        options={{headerShown: false}}
      />
      <StackNav.Screen
        name="LIBRARY"
        component={Library}
        options={{headerShown: false}}
      />
    </StackNav.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
