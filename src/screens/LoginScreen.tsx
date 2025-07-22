import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import PhoneNumberInput from '../components/PhoneNumberInput';
import colors from '../utils/colors';
import CustomeHeader from '../components/CustomeHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getMetadataThunk } from '../store/redux/slices/getMetadataSlice';

const LoginScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.metadata
  );

  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  });

  useEffect(() => {
    dispatch(getMetadataThunk());
  }, [dispatch]);

  let screenData: any = {};
  let blobBaseUrl: string | null = null;
  let blobSAS: string | null = null;

  if (Array?.isArray(data)) {
    const loginScreen = data?.find((item: any) => item.screen === 'loginScreen');
    const blobData = data?.find((item: any) => item.screen === 'All');

    if (loginScreen?.data) {
      screenData = loginScreen?.data;
    }
    if (blobData?.data) {
      blobBaseUrl = blobData?.data?.blobBaseUrl;
      blobSAS = blobData?.data?.blobSAS;
    }
  }

  const decodedSAS = blobSAS ? decodeBase64(blobSAS) : '';

  const imageUrl =
    blobBaseUrl && screenData?.backgroundImage
      ? `${blobBaseUrl}${screenData?.backgroundImage}${decodedSAS}`
      : undefined;

  const isValid = mobileNumber?.length === 10;

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

  const openModal = (type: 'terms' | 'privacy') => {
    if (type === 'terms' && screenData.termsAndConditionData) {
      setModalContent({
        title: screenData.termsAndConditionData.heading,
        description: screenData.termsAndConditionData.description,
      });
    } else if (type === 'privacy' && screenData.privacyPolicyData) {
      setModalContent({
        title: screenData.privacyPolicyData.heading,
        description: screenData.privacyPolicyData.description,
      });
    }
    setModalVisible(true);
  };

  const renderDescription = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={index} style={{ fontWeight: 'bold', color: '#333' }}>
            {part.slice(2, -2)}
          </Text>
        );
      } else {
        return (
          <Text key={index} style={{ color: '#333' }}>
            {part}
          </Text>
        );
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <CustomeHeader title="Login to move forward" />
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
                By proceeding, you agree with Iskcon Vesu’s{' '}
                <Text style={styles.link} onPress={() => openModal('terms')}>
                  Terms and Conditions
                </Text>{' '}
                and{' '}
                <Text style={styles.link} onPress={() => openModal('privacy')}>
                  Privacy Policy
                </Text>.
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.bottomButtonWrapper}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isValid
                    ? colors.primaryGreen
                    : colors.primaryGrey,
                },
              ]}
              disabled={!isValid}
              onPress={() => navigation.navigate('OTP', { mobileNumber })}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isValid ? colors.white : colors.textBlack,
                  },
                ]}
              >
                {screenData.buttonText || 'Login'}
              </Text>
            </TouchableOpacity>
          </View>

          <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{modalContent.title}</Text>
                <ScrollView>
                  <Text style={styles.modalDescription}>
                    {renderDescription(modalContent.description)}
                  </Text>
                </ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    marginTop: 60,
    backgroundColor: 'transparent',
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 10,
    marginBottom: 10,
  },
  terms: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 20,
  },
  link: {
    color: colors.lightOrange,
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#333',
    flexWrap: 'wrap',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: colors.lightOrange,
    fontWeight: 'bold',
  },
});