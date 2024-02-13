import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {IMAGES} from '../../assets';
import {MyText} from '../../MyText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {fetchPoemData} from '../../utils/fetchPoem';
import {
  STRUCTURE_DROPDOWN_DATA,
  STYLE_DATA,
  TONE_DATA,
  WORDS_DATA,
} from '../../constants/dropdownData';
import Loader from '../../Components/Loader';
import {useToast} from 'react-native-toast-notifications';


import { useAdContext } from '../../context/AdsContext';
import { containsProhibitedWords } from '../../utils/badWordChecker';



const CreatePoem = () => {
  const [text, setKeyPointText] = useState<string>('');
  const [selctedPoemStructure, setSelctedPoemStructure] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<string>('');
  const [selectedCount, setSelectedCount] = useState<number>();
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  const {showInterstitialAd} = useAdContext()

 

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const navigate = useNavigation();

  const goToHome = () => {
    navigate.navigate('Home' as never);
  };

  const toast = useToast();

 

  const goToPoemGenerator = async () => {
    
    try {
     
      if (
        text === '' &&
        selctedPoemStructure === '' &&
        selectedTone === '' &&
        selectedStyle === ''
      ) {
        toast.show('plase fill all the input field');
        return;
      } else if (text === '') {
        toast.show('KeyPoints cannot be empty');
        return;
      } else if (selctedPoemStructure === '') {
        toast.show('PoemStructure cannot be empty');
        return;
      } else if (selectedTone === '') {
        toast.show('Tone cannot be empty');
        return;
      } else if (typeof selectedCount !== 'number') {
        toast.show('Invalid Word Count Please select a valid word count.');
        return;
      } else if (selectedStyle === '') {
        toast.show(' Poetic Style cannot be empty');
        return;
      }
      const isBadwordsInclude = await containsProhibitedWords(text)
      if(isBadwordsInclude){
        return toast.show("Your poem contain bad words please remove them.")
      }
      
      
      // Set loading to true before making the asynchronous call
      

      // Fetch poem data asynchronously
      const dataObj = {
        keyPoints: text,
        structure: selctedPoemStructure,
        tone: selectedTone,
        wordCount: selectedCount,
        style: selectedStyle,
      };

      await showInterstitialAd(dataObj);

      // // Navigate to 'Poem' screen with retrieved data
      // navigate.navigate('Poem' as never, {
      //   "dataObj": dataObj,
      // });

      
    } catch (error) {
      // Log any errors during the process
      console.log('Error in generate Poem', error);
    } finally {
    }
  };

  return (
        <View style={styles.poemContainer}>
          <TouchableOpacity onPress={goToHome} style={styles.arrowContainer}>
            <Image source={IMAGES.leftArrow} />
          </TouchableOpacity>

          {/* Header Text */}
          <View style={styles.headerText}>
            <MyText
              title="Create Ai Poem"
              h1
              color="black"
              style={styles.text}
            />
          </View>

          {/* KeyPoints container and TextInput */}

          <View style={styles.keypointTextContainer}>
            <MyText
              title="Key points"
              h3
              color="black"
              style={styles.keyPointText}
            />
          </View>
          <View style={styles.inputTextContainer}>
            <TextInput
              placeholder="Write Poem on ......"
              placeholderTextColor="black"
              multiline
              onChangeText={newText => setKeyPointText(newText)}
              style={styles.placeholder}
              textAlignVertical="top"
            />
          </View>

          {/* PoemStructure */}
          <View style={styles.poemStructure}>
            <MyText
              title="Poem Structure"
              h3
              color="black"
              style={styles.keyText}
            />
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={STRUCTURE_DROPDOWN_DATA}
              labelField="label"
              valueField="value"
              value={selctedPoemStructure}
              onChange={(item: any) => {
                setSelctedPoemStructure(item.value);
              }}
              renderItem={renderItem}
              iconStyle={styles.icon}
            />
          </View>

          {/* Tone /Mood  */}

          <View style={styles.poemStructure}>
            <MyText
              title="Tone / Mood"
              h3
              color="black"
              style={styles.keyText}
            />
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={TONE_DATA}
              labelField="label"
              valueField="value"
              value={selectedTone}
              onChange={(item: any) => {
                setSelectedTone(item.value);
              }}
              renderItem={renderItem}
              iconStyle={styles.icon}
            />
          </View>

          {/* Desired word count */}
          <View style={styles.poemStructure}>
            <MyText
              title="Desired word count"
              h3
              color="black"
              style={styles.keyText}
            />
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={WORDS_DATA}
              labelField="label"
              valueField="value"
              value={selectedCount}
              onChange={(item: any) => {
                setSelectedCount(item.value);
              }}
              renderItem={renderItem}
              iconStyle={styles.icon}
            />
          </View>

          {/* Preferred style */}
          <View style={styles.poemStructure}>
            <MyText
              title="Preferred Style"
              h3
              color="black"
              style={styles.keyText}
            />
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={STYLE_DATA}
              labelField="label"
              valueField="value"
              value={selectedStyle}
              onChange={(item: any) => {
                setSelectedStyle(item.value);
              }}
              renderItem={renderItem}
              iconStyle={styles.icon}
            />
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.Button} onPress={goToPoemGenerator}>
            <View style={styles.buttonContainer}>
              <Text style={styles.btnText}>Continue create Poem</Text>
              <MyText
                title=" continue with ads"
                h5
                color="black"
                style={styles.adText}
              />
            </View>
          </TouchableOpacity>
        </View>
  );
};

export default CreatePoem;

const styles = StyleSheet.create({
  poemContainer: {
    backgroundColor: '#F8E9D6',
    flex: 1,
    padding: responsiveWidth(4),
    width: '100%',
  },

  arrowContainer: {
    position: 'absolute',
    left: responsiveWidth(2.5),
    top:responsiveHeight(1)
  },

  headerText: {
    justifyContent: 'center',
    marginTop: responsiveHeight(4),
  },
  text: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '800',
  },
  keypointTextContainer: {
    marginTop: responsiveHeight(3),
  },
  keyPointText: {
    fontWeight: '700',
    marginBottom: responsiveHeight(1),
  },
  keyText: {
    fontWeight: '700',
  },
  inputTextContainer: {
    // width: "100%",
  },
  placeholder: {
    width: responsiveWidth(90),
    height: responsiveHeight(9),
    borderColor: '#CB8538',
    borderWidth: 1,
    color: 'black',
    padding: 10,
    borderRadius: responsiveWidth(3),
  },
  poemStructure: {
    marginTop: responsiveHeight(1.5),
    marginBottom: responsiveHeight(1),
  },
  dropdown: {
    width: responsiveWidth(90),
    height: responsiveHeight(7),
    borderColor: '#CB8538',
    borderWidth: 1,
    color: 'black',
    borderRadius: responsiveWidth(3),
  },
  icon: {
    width: responsiveWidth(7),
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8E9D6',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',

    // textAlign:'center',
    marginLeft: responsiveWidth(2),
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    marginLeft: responsiveWidth(2),
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: responsiveHeight(7),
    width: responsiveWidth(90),
    borderRadius: 8,
    backgroundColor: '#CB8538',
    marginTop: responsiveHeight(3),
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: responsiveFontSize(1.8),
  },
  adText: {
    fontSize: responsiveFontSize(1.4),
    // marginLeft:8,
    marginRight: 14,
  },
  disabledButton: {},
});
