import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import colors from '../utils/colors';

const { width, height } = Dimensions.get('window');


const BootScreen = ({ navigation }: any) => {
  // navigate to onboardingScreen after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/mandala.png')}
        style={styles.mandala}
        resizeMode="contain"
      />

      <View style={styles.centerContent}>
        <Image
          source={require('../assets/prabhujiimage.png')}
          style={styles.founderImage}
        />
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.titleText}>ISKCON VESU</Text>
      </View>

      <View style={styles.flowerContainer}>
        <Image
          source={require('../assets/flower.png')}
          style={styles.sunflower}
          resizeMode="cover"
        />

        <Image
          source={require('../assets/iskonlogo.png')}
          style={styles.overlayLogo}
          resizeMode="contain"
        />

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            International Society for Krishna Consciousness
          </Text>
          <Text style={styles.subFooterText}>
            Founder Acharya His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
          </Text>
          <Text style={styles.hindiText}>
            हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे, हरे राम हरे राम राम राम हरे हरे
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  mandala: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.6,
    height: width * 0.6,
    zIndex: 0,
  },
  centerContent: {
    marginTop: height * 0.27,
    alignItems: 'center',
  },
  founderImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 32,
    color: '#000',
    letterSpacing: 1,
    fontWeight: '700',
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E97340',
    marginTop: 4,
  },
  flowerContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    alignItems: 'center',
  },
  sunflower: {
    width: width * 1.0535,
    height: height * 0.43,
  },
  overlayLogo: {
    position: 'absolute',
    // bottom: height * 0.17,
    width: width * 0.636,
    height: height * 0.3225
  },
  footerContainer: {
    position: 'absolute',
    bottom: 40,
    width: width,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  subFooterText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  hindiText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default BootScreen;
