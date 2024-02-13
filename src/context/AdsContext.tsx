import { useNavigation } from '@react-navigation/native';
import React, {createContext, useContext, useState, useEffect, useRef} from 'react';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
  MobileAds,
  MaxAdContentRating,
  AdsConsentDebugGeography,
  AdsConsent,
  AdsConsentStatus,
} from 'react-native-google-mobile-ads';
// import analytics from '@react-native-firebase/analytics'

interface AdContextProps {
    showInterstitialAd: () => void;
}

const AdContext = createContext<AdContextProps | undefined>(undefined);

const ADS_REQUEST_CONFIGURATION = {
  maxAdContentRating: MaxAdContentRating.T,
  tagForChildDirectedTreatment: false,
  tagForUnderAgeOfConsent: true,
  testDeviceIdentifiers: [''],
};

const INFO_REQUEST_CONFIGURATION = {
  tagForUnderAgeOfConsent: true,
  testDeviceIdentifiers: [''],
  // Always ensure debug information is removed for production apps!
  ...(__DEV__ && {debugGeography: AdsConsentDebugGeography.EEA}),
};

export const useAdContext = (): AdContextProps => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const AdProvider = ({children}) => {

  const [interstitialAd, setInterstitialAd] = useState(null);
  const poemStateData = useRef(null);
  const {navigate} = useNavigation();
  const requestEEAConsent = async () => {
    // const consentInfo = await AdsConsent.requestInfoUpdate(INFO_REQUEST_CONFIGURATION);
    const consentInfo = await AdsConsent.requestInfoUpdate();

    if (
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdsConsentStatus.REQUIRED
    ) {
      const {status} = await AdsConsent.showForm();

      consentInfo.status = status;
    }

    console.log({consentInfo});

    return consentInfo;
  };

  const initializeAdmob = async () => {
    try {
      // Request the respective consent to users in the EEA
      await requestEEAConsent();      
      
      // Configure the ads requests
      await MobileAds().setRequestConfiguration(ADS_REQUEST_CONFIGURATION);

      // Get analytics once consent is approved
    //   await analytics().setAnalyticsCollectionEnabled(true);

      // Initialize the AdMob service
      initializeAds();
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  useEffect(() => {
    initializeAdmob();
  }, []);

  const initializeAds = () =>
    MobileAds()
      .initialize()
      .then(() => {
        console.log('====================================');
        console.log('Ad Initialization complete');
        console.log('====================================');
        loadInterstitialAd();
      });

  const loadInterstitialAd = async () => {
    const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : '';
    const newInterstitialAd = InterstitialAd.createForAdRequest(adUnitId);

    const eventListener = newInterstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log('Course Add has loaded');
      },
    );
    const eventListener2 = newInterstitialAd.addAdEventListener(
      AdEventType.CLOSED,
      async () => {
        await newInterstitialAd.load();
        setInterstitialAd(newInterstitialAd);
        navigate('Poem' as never, {
        "dataObj": poemStateData,
      });
      },
    );

    await newInterstitialAd.load();
    setInterstitialAd(newInterstitialAd);

    return () => {
      // Clean up event listener when the component is unmounted
      eventListener();
      eventListener2();
    };
  };

  const showInterstitialAd = async (dataObj) => {  
    poemStateData.current = dataObj  
    try {
      if (interstitialAd) {
        await interstitialAd.show();
      } else {
        console.warn('Interstitial Ad not loaded yet');
      }
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
    }
  };

  const value = {
    showInterstitialAd,    
  };

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};

export default AdProvider;
