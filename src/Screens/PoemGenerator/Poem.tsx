import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Share,
  Platform,
} from 'react-native';
import React, {Children, useEffect, useRef, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {IMAGES} from '../../assets';

import {useNavigation} from '@react-navigation/native';

import {MyText} from '../../MyText/index';

import {ScrollView} from 'react-native-gesture-handler';

import {getSavedData, removeSavedData, storeSavedData} from '../../utils';

import {nanoid} from 'nanoid/non-secure';
import {useToast} from 'react-native-toast-notifications';
import {fetchPoemData} from '../../utils/fetchPoem';
import Loader from '../../Components/Loader';

const Poem = ({route}: {route: any}) => {
  const dataObj = route.params.dataObj;
  const [poemData, setPoemData] = useState([]);
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
   

        const poemData = await fetchPoemData(dataObj);
        setPoemData(poemData);
        console.log(poemData);
      } catch (error) {
        console.log(error);
        // nivigation back
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigation();

  const toast = useToast();

  const goToHome = () => {
    navigate.navigate('Home' as never);
  };

  const [isBookmarked, setIsBookmarked] = useState(false);

  const store_poem = async () => {
    try {
      await storeSavedData({...poemData, uid: nanoid()});
      setIsBookmarked(!isBookmarked);
      toast.show('Poem Saved');
    } catch (error) {
      console.error(error);
    }
  };

  const sharePoem = async () => {
    try {
      let shareOptions: any = {
        message: poemData.content,
      };

      // Check if the platform supports title
      if (Platform.OS === 'android') {
        shareOptions['title'] = poemData.title;
      }

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        // Share was successful
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed by the user
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  console.log('herere4rerere');

  if(loading){
    return <Loader />
  }

  return (
    <View style={styles.poemContainer}>
      <View style={styles.header}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={goToHome}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(2.5),
            }}>
            <Image source={IMAGES.leftArrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconsContainer}>
          {isBookmarked ? (
            <TouchableOpacity style={styles.bookmarkIcon}>
              <Image source={IMAGES.complete} style={{width: 20, height: 20}} />
              <MyText title={'Saved'} h5 color="black" style={styles.save} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.bookmarkIcon} onPress={store_poem}>
              <Image source={IMAGES.bookmark} />
              <MyText title={'Save'} h5 color="black" style={styles.save} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.shareIcon} onPress={sharePoem}>
            <Image source={IMAGES.share} />
            <MyText title="Share" h5 color="black" style={styles.share} />
          </TouchableOpacity>
        </View>
      </View>

      {/* PoemTitle */}
      <View style={styles.poemHeader}>
        <MyText
          title={poemData.title}
          h1
          color="black"
          style={styles.poemHeaderText}
        />
      </View>
      {/* Poem Data */}
      <View>
        <ScrollView>
          <View style={styles.generatedText}>
            <Text style={{textAlign: 'center', color: '#CB8538'}}>
              {poemData.content}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Poem;

const styles = StyleSheet.create({
  poemContainer: {
    backgroundColor: '#F8E9D6',
    flex: 1,
    padding: responsiveWidth(4),
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: responsiveWidth(65),
    marginLeft: responsiveWidth(3),
  },
  arrowContainer: {
    width: responsiveWidth(1),
    height: responsiveHeight(1),
    marginLeft: responsiveWidth(1),
  },

  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: responsiveWidth(4),
    // alignItems: 'flex-end',
    // marginTop: responsiveHeight(),
  },
  bookmarkIcon: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginRight: responsiveWidth(4),
  },
  bookmark: {
    justifyContent: 'center',
    marginLeft: responsiveWidth(12),
  },
  shareIcon: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginRight: responsiveWidth(5),
  },
  poemHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: responsiveWidth(70),
    marginTop: responsiveHeight(4),
    marginLeft: responsiveWidth(5),
  },
  poemHeaderText: {
    fontSize: responsiveFontSize(2.3),
    color: '#000',
    fontWeight: '700',
    fontFamily: 'popins',
    marginLeft: responsiveWidth(5),
  },
  generatedText: {
    marginTop: responsiveHeight(2),
    width: '100%',
  },
  poemText: {
    textAlign: 'justify',
    color: '#CB8538',
  },
  save: {
    textAlign: 'center',
    // marginLeft: responsiveWidth(-1),
    fontSize: responsiveFontSize(1),
    fontWeight: 'bold',
  },
  share: {
    textAlign: 'center',
    // marginLeft: responsiveWidth(-2),
    fontSize: responsiveFontSize(1),
    fontWeight: 'bold',
  },
});
