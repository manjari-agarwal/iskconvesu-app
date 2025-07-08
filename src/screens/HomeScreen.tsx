import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PhoneNumberInput from '../components/PhoneNumberInput';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hare Krishna 🙏🏻</Text>
      <Text style={styles.text}>Welcome to Iskon Vesu App - Test!</Text>
      <PhoneNumberInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default HomeScreen;
