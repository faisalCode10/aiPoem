import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {IMAGES} from '../../assets';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {MyText} from '../../MyText';
import {useNavigation} from '@react-navigation/native';
const CustomDrawerNavigation = (props: any) => {
  const openMail = () => {
    const recipientEmail = 'ford9solutions@gmail.com';
    const subject = 'Feedback for Your App';
    const body = 'Hello, I have some feedback for your app.';

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink);
  };

  //Share app
  const shareApp = async () => {
    try {
      const result = (await Share.share({
        message: 'Check out this awesome app!',
        url: 'https://example.com',
      })) as {action: string; activityType?: string};

      if (result.action === Share.sharedAction) {
        // Share was successful
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed by the user
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', (error as Error).message);
    }
  };

  const navigate = useNavigation();
  const goToHome = () => {
    navigate.navigate('Home' as never);
  };
  const goToLiobrary = () => {
    navigate.navigate('LIBRARY' as never);
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.image}>
          <Image source={IMAGES.logo} />
          <MyText title="AI POEM" h1 color="black" style={styles.text} />
          <MyText
            title="Version 1.0 "
            color="black"
            h5
            style={styles.version}
          />
        </View>
        <DrawerItemList {...props} />

        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:responsiveHeight(1)}}>
          <TouchableOpacity onPress={goToLiobrary}>
            <MyText title="LIBRARY" h3 color="black" style={styles.privacyText} />
          </TouchableOpacity>
        </View>

        <View style={styles.drawerItems}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://fordnine.com/apps/ai-poem-writer-and-poetry-maker/terms-of-use.html',
              )
            }>
            <MyText
              title="TERMS"
              color="#301005"
              h3
              style={styles.itemTextSize}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://fordnine.com/apps/ai-poem-writer-and-poetry-maker/privacy-policy.html',
              )
            }>
            <MyText
              title="PRIVACY"
              color="#301005"
              h3
              style={styles.privacyText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.footerItems}>
          <TouchableOpacity onPress={shareApp}>
            <MyText title="TELL A FRIEND" color="#301005" h3 />
          </TouchableOpacity>
          <TouchableOpacity onPress={openMail}>
            <MyText
              title="FEEDBACK"
              color="#301005"
              h3
              style={styles.feedback}
            />
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(9),
    marginRight: responsiveWidth(7),
  },
  text: {
    fontSize: responsiveHeight(3),
    fontWeight: '900',
  },
  version: {
    marginBottom: responsiveHeight(6),
  },
  drawerItems: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
    gap: responsiveHeight(2),
  },
  itemTextSize: {
    fontWeight: 'normal',
    marginRight:responsiveWidth(6)
  },
  privacyText:{
    marginRight:responsiveWidth(2)
  },
  footerItems: {
    marginLeft: responsiveWidth(18),
    marginTop: responsiveHeight(17),
    gap: responsiveHeight(2),
  },
  feedback: {
    marginLeft: responsiveWidth(3),
  },
});
