import React from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import colors from "../utils/colors";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const PhoneNumberInput: React.FC<Props> = ({ value, onChangeText }) => {
  const error =
    value.length === 0
      ? ""
      : value.length < 10
      ? "Phone number must be 10 digits"
      : value.length > 10
      ? "Phone number cannot exceed 10 digits"
      : "";

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          source={require("../assets/india-flag.png")}
          style={styles.flag}
        />
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          maxLength={10}
          value={value}
          onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9]/g, "");
            onChangeText(cleaned);
          }}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.textBlack,
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 8,
  },
  flag: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 8,
  },
  countryCode: {
    width: 30,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: colors.textBlack,
    marginRight: 8,
    lineHeight: 20,
  },
  input: {
    flex: 1,
    height: "100%",
    color: colors.textBlack,
    fontSize: 16,
    paddingVertical: 0,
  },
  errorText: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
});

export default PhoneNumberInput;
