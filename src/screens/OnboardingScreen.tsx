import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getMetadataThunk } from '../store/redux/slices/getMetadataSlice';
import colors from '../utils/colors';

const { width, height } = Dimensions.get('window');

const staticScreenData = {
  heading: 'Welcome to ISKCON Vesu',
  subHeading: 'Your spiritual journey starts here.',
  buttonText: 'Get Started',
  backgroundImage: '/metadata/defaultBackgroundImage.png',
};

const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.metadata
  );

  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    dispatch(getMetadataThunk());
  }, [dispatch]);

  let screenData: any = null;
  let blobBaseUrl: string | null = null;
  let blobSAS: string | null = null;

  if (Array.isArray(data)) {
    const mainScreen = data.find((item: any) => item.screen === 'mainScreen');
    const blobData = data.find((item: any) => item.screen === 'All');

    if (mainScreen?.data) {
      screenData = mainScreen.data;
    }
    if (blobData?.data) {
      blobBaseUrl = blobData.data.blobBaseUrl;
      blobSAS = blobData.data.blobSAS;
    }
  }

  // const finalScreenData = screenData || staticScreenData;
  const finalScreenData = screenData || staticScreenData;


  const decodedSAS = blobSAS ? decodeBase64(blobSAS) : '';

  console.log('Decoded SAS:', decodedSAS);
  const imageUrl =
    blobBaseUrl && finalScreenData.backgroundImage
      ? `${blobBaseUrl}${finalScreenData.backgroundImage}${decodedSAS}`
      : undefined;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.lightOrange} />
      </View>
    );
  }

  if (error) {
    console.warn('Metadata fetch error:', error);
  }

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, { backgroundColor: '#eee' }]} />
      )}

      <View style={styles.cardWrapper}>
        {isAndroid ? (
          <View style={[styles.blurFallback, styles.blurView]}>
            <CardContent navigation={navigation} screenData={finalScreenData} />
          </View>
        ) : (
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={25}
            reducedTransparencyFallbackColor="white"
          >
            <CardContent navigation={navigation} screenData={finalScreenData} />
          </BlurView>
        )}
      </View>
    </View>
  );
};

const decodeBase64 = (encoded: string) => {
  try {
    return decodeURIComponent(
      atob(encoded)
        .split('')
        .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
  } catch {
    return '';
  }
};

const CardContent = ({
  navigation,
  screenData,
}: {
  navigation: any;
  screenData: {
    heading: string;
    subHeading: string;
    buttonText: string;
  };
}) => (
  <>
    <Text style={styles.title}>{screenData?.heading}</Text>
    <Text style={styles.subtitle}>{screenData?.subHeading}</Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Login')}
    >
      <Text style={styles.buttonText}>{screenData?.buttonText}</Text>
    </TouchableOpacity>
  </>
);

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.45,
    overflow: 'hidden',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  blurView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  blurFallback: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  title: {
    fontFamily: 'Outfit-ExtraBold',
    fontSize: 28,
    textAlign: 'center',
    color: colors.textBlack,
    opacity: 0.9,
    lineHeight: 34,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 60,
    width: width * 0.8,
    height: 52,
    backgroundColor: colors.lightOrange,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textBlack,
    fontSize: 16,
  },
});