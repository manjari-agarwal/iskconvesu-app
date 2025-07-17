import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import colors from '../utils/colors';
import CustomeHeader from '../components/CustomeHeader';

const { width } = Dimensions.get('window');

const OTPScreen: React.FC<{ navigation: any, route: any }> = ({ route, navigation }) => {
  const mobileNumber = route?.params?.mobileNumber || '';
  const otpInputRef = useRef<OTPTextView>(null);

  const [otp, setOtp] = useState('');
  const [isOtpComplete, setIsOtpComplete] = useState(false);

  const handleOtpChange = (text: string) => {
    setOtp(text);
    if (text.length === 6) {
      setIsOtpComplete(true);
    } else {
      setIsOtpComplete(false);
    }
  };

  const handleLogin = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    
    navigation.navigate('Home', { mobileNumber, otp })

    console.log('OTP entered:', otp);
  };

  return (
    <View style={styles.container}>
      <CustomeHeader title="Enter OTP Below" />

      <ImageBackground
        source={require('../assets/bg.png')}
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
                isOtpComplete ? { color: colors.white } : { color: colors.textBlack },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textBlack,
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
    // marginBottom: 20,
  },
  link: {
    color: colors.lightOrange,
  },
  otpBox: {
    borderBottomWidth: 2,
    borderColor: '#fff',
    color: '#fff',
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

// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   ImageBackground,
// } from 'react-native';
// import OTPTextInput from 'react-native-otp-textinput';
// import colors from '../utils/colors';
// import CustomeHeader from '../components/CustomeHeader';

// const { width } = Dimensions.get('window');

// const OTPScreen: React.FC<{ route: any }> = ({ route }) => {
//   const mobileNumber = route?.params?.mobileNumber || '';
//   const otpInput = useRef<OTPTextInput>(null);

//   const handleLogin = () => {
//     const otp = otpInput.current?.getOTP();
//     console.log('OTP entered:', otp);
//   };

//   return (
//     <View style={styles.container}>

//       <CustomeHeader title="Enter OTP Below" />

//       <ImageBackground
//         source={require('../assets/bg.png')}
//         style={styles.bgImage}
//         imageStyle={{ opacity: 0.9 }}
//       >

//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Enter OTP</Text>
//           <Text style={styles.subtitle}>
//             Please sent by SMS on {mobileNumber}{' '}
//             <Text style={styles.link}>Change Number</Text>
//           </Text>

//           <OTPTextInput
//             ref={otpInput}
//             inputCount={6}
//             tintColor={colors.white}
//             offTintColor="#ccc"
//             textInputStyle={styles.otpBox}
//             handleTextChange={(text) => console.log('Current OTP:', text)}
//           />

//           <Text style={styles.resend}>
//             OTP not received? <Text style={styles.link}>Resend OTP</Text>
//           </Text>
//         </View>

//         <View style={styles.bottomButtonWrapper}>
//           <TouchableOpacity style={styles.button} onPress={handleLogin}>
//             <Text style={styles.buttonText}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// export default OTPScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     backgroundColor: colors.lightOrange,
//     height: 100,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     paddingBottom: 10,
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   bgImage: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     paddingHorizontal: 20,
//   },
//   logoContainer: {
//     marginTop: 20,
//     marginBottom: 20,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: colors.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   formContainer: {
//     marginTop: 50,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   subtitle: {
//     fontSize: 12,
//     color: '#ccc',
//     marginBottom: 20,
//   },
//   link: {
//     color: colors.lightOrange,
//   },
//   otpBox: {
//     borderBottomWidth: 2,
//     borderColor: '#fff',
//     color: '#fff',
//     fontSize: 18,
//     width: 40,
//   },
//   resend: {
//     fontSize: 12,
//     color: '#ccc',
//     marginTop: 10,
//   },
//   bottomButtonWrapper: {
//     position: 'absolute',
//     bottom: 90,
//     left: 20,
//     right: 20,
//   },
//   button: {
//     borderRadius: 8,
//     paddingVertical: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.white,
//   },
//   buttonText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: colors.textBlack,
//   },
// });
