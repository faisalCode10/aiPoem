import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigations/Stack/MainStack';
import Poem from './src/Screens/PoemGenerator/Poem';
import {ToastProvider} from 'react-native-toast-notifications';
import AdProvider from './src/context/AdsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  // useEffect(() => {
  //   AsyncStorage.clear()
  // }, [])
  
  return (
    <NavigationContainer>
      <AdProvider>
        <StatusBar
          animated={true}
          backgroundColor="#F8E9D6"
          barStyle="dark-content"
          showHideTransition={'fade'}
          hidden={false}
        />
        <ToastProvider>
          <MainStack />
        </ToastProvider>
      </AdProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E9D6',
  },
});

// {
/* <NavigationContainer>
  {/* <SafeAreaView style={styles.container}>
    <StatusBar
//       animated={true}
//       backgroundColor="#F8E9D6"
//       barStyle="dark-content"
//       showHideTransition={'fade'}
//       hidden={false}
//     /> */
// }

//     <Stack />
//   {/* </SafeAreaView> */}
// </NavigationContainer> */}
