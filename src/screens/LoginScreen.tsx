import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import PhoneNumberInput from '../components/PhoneNumberInput';
import colors from '../utils/colors';
import CustomeHeader from '../components/CustomeHeader';

const { width } = Dimensions.get('window');

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [mobileNumber, setMobileNumber] = useState<string>('');

  const isValid = mobileNumber.length === 10;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <CustomeHeader title="Login to move forward" />
          <ImageBackground
            source={require('../assets/bg.png')}
            style={styles.bgImage}
            imageStyle={{ opacity: 0.9 }}
          >
            <View style={styles.formContainer}>
              <Text style={styles.title}>Fill your Mobile Number</Text>
              <Text style={styles.subtitle}>
                6 Digit OTP Will be sent to this Number
              </Text>

              <PhoneNumberInput
                value={mobileNumber}
                onChangeText={(text: string) =>
                  setMobileNumber(text.replace(/[^0-9]/g, '').slice(0, 10))
                }
              />

              <Text style={styles.terms}>
                By proceeding, you agree with Iskon Vesu’s{' '}
                <Text style={styles.link}>Terms and Conditions</Text> And{' '}
                <Text style={styles.link}>Privacy Policy</Text>.
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.bottomButtonWrapper}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isValid ? colors.primaryGreen : colors.primaryGrey },
              ]}
              disabled={!isValid}
              onPress={() => navigation.navigate('OTP', { mobileNumber })}
            >
              <Text style={[styles.buttonText, { color: isValid ? colors.white : colors.textBlack },]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: colors.lightOrange,
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 25,
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    left: width / 12,
    zIndex: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 60,
    backgroundColor: 'transparent',
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 20,
  },
  terms: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 20,
  },
  link: {
    color: '#F58220',
  },
  bottomButtonWrapper: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.textBlack,
  },
});
