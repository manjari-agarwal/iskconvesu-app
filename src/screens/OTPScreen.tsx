import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import colors from '../utils/colors';
import CustomeHeader from '../components/CustomeHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getMetadataThunk } from '../store/redux/slices/getMetadataSlice';

const { width } = Dimensions.get('window');

const OTPScreen: React.FC<{ navigation: any; route: any }> = ({
  route,
  navigation,
}) => {
  const mobileNumber = route?.params?.mobileNumber || '';
  const otpInputRef = useRef<OTPTextView>(null);

  const [otp, setOtp] = useState('');
  const [isOtpComplete, setIsOtpComplete] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.metadata
  );

  useEffect(() => {
    dispatch(getMetadataThunk());
  }, [dispatch]);

  let apiData: any = {};
  let blobBaseUrl: string | null = null;
  let blobSAS: string | null = null;

  if (Array.isArray(data)) {
    const otpScreen = data.find((item: any) => item.screen === 'otpScreen');
    const blobData = data.find((item: any) => item.screen === 'All');

    if (otpScreen?.data) {
      apiData = otpScreen.data;
    }
    if (blobData?.data) {
      blobBaseUrl = blobData.data.blobBaseUrl;
      blobSAS = blobData.data.blobSAS;
    }
  }

  const decodedSAS = blobSAS ? decodeBase64(blobSAS) : '';

  const imageUrl =
    blobBaseUrl && apiData.backgroundImage
      ? `${blobBaseUrl}${apiData.backgroundImage}${decodedSAS}`
      : undefined;

  const handleOtpChange = (text: string) => {
    setOtp(text);
    setIsOtpComplete(text.length === 6);
  };

  const handleLogin = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    navigation.navigate('PersonalInfo');
    console.log('OTP entered:', otp);
  };

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
      <CustomeHeader title="Enter OTP Below" />

      <ImageBackground
        source={
          imageUrl
            ? { uri: imageUrl }
            : require('../assets/bg.png')
        }
        style={styles.bgImage}
        imageStyle={{ opacity: 0.9 }}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            OTP sent by SMS on {mobileNumber}{' '}
            <Text style={styles.link}>Change Number</Text>
          </Text>

          <OTPTextView
            ref={otpInputRef}
            handleTextChange={handleOtpChange}
            inputCount={6}
            tintColor={colors.white}
            offTintColor="#ccc"
            containerStyle={{ marginVertical: 20 }}
            textInputStyle={styles.otpBox}
          />

          <Text style={styles.resend}>
            OTP not received? <Text style={styles.link}>Resend OTP</Text>
          </Text>
        </View>

        <View style={styles.bottomButtonWrapper}>
          <TouchableOpacity
            style={[
              styles.button,
              isOtpComplete ? styles.buttonEnabled : styles.buttonDisabled,
            ]}
            disabled={!isOtpComplete}
            onPress={handleLogin}
          >
            <Text
              style={[
                styles.buttonText,
                isOtpComplete
                  ? { color: colors.white }
                  : { color: colors.textBlack },
              ]}
            >
              {apiData.buttonText || 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OTPScreen;

const decodeBase64 = (encoded: string) => {
  try {
    return decodeURIComponent(
      atob(encoded)
        .split('')
        .map(c => '%' + c.charCodeAt(0)?.toString(16)?.padStart(2, '0'))
        .join('')
    );
  } catch {
    return '';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textBlack,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '400',
    marginTop: 10,
  },
  link: {
    color: colors.lightOrange,
  },
  otpBox: {
    borderBottomWidth: 2,
    borderColor: colors.white,
    color: colors.white,
    fontSize: 18,
    width: 40,
  },
  resend: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 10,
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
  buttonEnabled: {
    backgroundColor: colors.primaryGreen,
  },
  buttonDisabled: {
    backgroundColor: colors.primaryGrey,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});