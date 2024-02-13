import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {MyText} from '../../MyText';
import {deleteSavedData, getSavedData, removeSavedData} from '../../utils';
import { BannerAds } from '../../Ads/BannerAds';

interface PoemItem {
  uid: string;
  title: string;
}

const Library = () => {
  const navigation = useNavigation();
  const [storedData, setStoredData] = useState<PoemItem[]>([]);

  const fetchData = async () => {
    const data = await getSavedData();
    setStoredData(data);
  };

  const goToHome = () => {
    navigation.navigate('Home' as never);
  };

  const deleteIndividual = async (uidToRemove: string) => {
    try {
      await removeSavedData(uidToRemove);
      const updatedData = storedData.filter(item => item.uid !== uidToRemove);
      setStoredData(updatedData);
    } catch (error) {
      console.error('Error deleting saved data: ', error);
    }
  };

  // const goToPoemGenerator = (poemItem: PoemItem) => {
  //   navigation.navigate('Poem' as never, {poemData: poemItem});
  // };
  const goToPoemGenerator = (poemData: any) => {
    navigation.navigate('PrePoems', {poemData});
    // navigation.navigate('Poem', { poemData });
  };

  // const deleteAllData = async () => {
  //   try {
  //     // Remove all saved data
  //     await Promise.all(storedData.map(item => removeSavedData(item.uid)));
  //     // Update storedData state
  //     setStoredData([]);
  //   } catch (error) {
  //     console.error('Error deleting all saved data: ', error);
  //   }

  // };
  const deleteAllData = async () => {
    await deleteSavedData();
    setStoredData([])
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const renderPoem = ({item}: {item: PoemItem}) => (
    <View style={styles.poemContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.image}>
          <Image source={IMAGES.blackFeather} />
        </View>
        <View style={styles.poemTitleText}>
          <MyText
            title={item.title}
            h3
            color="black"
            style={styles.poemTitle}
          />
        </View>

        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => deleteIndividual(item.uid)}>
          <Image source={IMAGES.delete} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToPoemGenerator(item)} style={styles.leftarrow}>
          <Image source={IMAGES.RightArrow}  />
        </TouchableOpacity>
      </View>
      <View style={styles.borderBottom}></View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={goToHome}
        style={{marginTop: responsiveHeight(1)}}>
        <Image source={IMAGES.leftArrow} style={styles.leftarrowImage} />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <MyText title="Library" color="black" h1 style={styles.headerText} />
        <TouchableOpacity style={styles.deleteIcons} onPress={deleteAllData}>
          <Image source={IMAGES.delete} style={{width:14, height:18, marginTop:responsiveHeight(2)}} />
          <MyText title="Delete All" h5 color="black" style={styles.share} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={storedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPoem}
      />
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E9D6',
    padding: responsiveWidth(4),
  },
  leftarrowImage: {
    position: 'absolute',
    // left: responsiveWidth(-1.2),
    // top: responsiveHeight(-1),
    
  },
  headerText: {
    fontWeight: '900',
    justifyContent: 'center',
    marginTop: responsiveHeight(5),
  },
  poemContainer: {
    marginTop: responsiveHeight(1),
  },
  poemTitle: {
    fontSize: responsiveFontSize(2),
  },
  borderBottom: {
    width: responsiveWidth(90),
    borderBottomColor: 'black',
    borderBottomWidth: responsiveWidth(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(0.6),
  },
  contentContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent:'space-around',
    // gap:responsiveWidth(5.4),
    padding: responsiveHeight(0.5),
  },
  image: {
    height: responsiveHeight(4.5),
    width: responsiveWidth(8.3),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  leftarrow: {
    height: responsiveHeight(4),
    width: responsiveWidth(7.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CB8538',
    borderRadius: responsiveWidth(2.5),
    marginTop: responsiveHeight(0.9),
  },
  poemTitleText: {
    width: responsiveWidth(50),
    justifyContent: 'center',
    marginLeft:responsiveWidth(-3)
    // alignItems:'center'
  },

  deleteIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(4),
    width: responsiveWidth(6),
    borderRadius: responsiveWidth(2.5),
    marginTop: responsiveHeight(0.9),
    // marginRight:responsiveWidth(-2)
  },
  deleteIcons: {
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(4),
    width: responsiveWidth(8),
    borderRadius: responsiveWidth(2.5),
    marginTop: responsiveHeight(-7.2),
    marginRight: responsiveWidth(3),
  },
  share: {
    textAlign: 'center',
    fontSize:responsiveFontSize(1),
    fontWeight:'bold'
  },
});
