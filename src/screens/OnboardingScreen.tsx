import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import colors from '../utils/colors';

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const isAndroid = Platform.OS === 'android';

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/krishna-img-splash.png')}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.cardWrapper}>
        {isAndroid ? (
          <View style={[styles.blurFallback, styles.blurView]}>
            <CardContent navigation={navigation} />
          </View>
        ) : (
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={25}
            reducedTransparencyFallbackColor="white"
          >
            <CardContent navigation={navigation} />
          </BlurView>
        )}
      </View>
    </View>
  );
};

const CardContent = ({ navigation }: { navigation: any }) => (
  <>
    <Text style={styles.title}>Connect with the Divine</Text>
    <Text style={styles.subtitle}>
      Experience daily darshan, kirtans, and spiritual updates from ISKCON Vesu.
    </Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Login')}
    >
      <Text style={styles.buttonText}>Login / Sign up Now</Text>
    </TouchableOpacity>
  </>
);

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: '#000',
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