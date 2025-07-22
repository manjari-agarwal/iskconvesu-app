import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import colors from '../utils/colors';

const { width } = Dimensions.get('window');

interface HeaderProps {
  title: string;
}

const CustomeHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/iskon-logo-rounded.png')}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

export default CustomeHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.lightOrange,
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerText: {
    color: colors.white,
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
});
