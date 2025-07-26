import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
    Image,
    Alert,
    Linking,
    PermissionsAndroid,
    Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomeHeader from "../components/CustomeHeader";
import { launchImageLibrary } from "react-native-image-picker";
import colors from "../utils/colors";

const PersonalInfoScreen = () => {
    const [maritalStatus, setMaritalStatus] = useState("");
    const [occupation, setOccupation] = useState("");
    const [associationYear, setAssociationYear] = useState("");
    const [initiated, setInitiated] = useState(false);
    const [initiationName, setInitiationName] = useState("");
    const [initiationSuffix, setInitiationSuffix] = useState("Dasa");
    const [spiritualMaster, setSpiritualMaster] = useState("");
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleUpload = async () => {
        if (Platform.OS === "android" && Platform.Version >= 33) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                {
                    title: "Storage Permission",
                    message: "We need access to your photos to let you upload an image.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert(
                    "Permission Denied",
                    "We need access to your gallery. Please enable it in app settings.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Open Settings", onPress: () => Linking.openSettings() }
                    ]
                );
                return;
            }
        }

        launchImageLibrary(
            {
                mediaType: "photo",
                quality: 0.8,
            },
            (response) => {
                if (response.didCancel) {
                    console.log("User cancelled image picker");
                } else if (response.errorCode) {
                    Alert.alert(
                        "Error",
                        response.errorMessage || "Something went wrong while picking the image."
                    );
                } else {
                    const uri = response.assets?.[0]?.uri;
                    if (uri) setUploadedImage(uri);
                }
            }
        );
    };

    return (
        <>
            <CustomeHeader title="Personal Info" />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.sectionTitle}>Personal Info</Text>

                <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} placeholder="" />

                <Text style={styles.label}>Birth Details <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} placeholder="" />

                <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} placeholder="" keyboardType="email-address" />

                <Text style={styles.label}>Address <Text style={styles.required}>*</Text></Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder=""
                    multiline
                    numberOfLines={3}
                />

                <Text style={styles.label}>Marital Status <Text style={styles.required}>*</Text></Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={maritalStatus}
                        onValueChange={(itemValue) => setMaritalStatus(itemValue)}
                    >
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Single" value="single" />
                        <Picker.Item label="Married" value="married" />
                    </Picker>
                </View>

                <Text style={styles.label}>Married On <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} placeholder="" />

                <Text style={styles.label}>Education <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} placeholder="Enter Education" />

                <Text style={styles.label}>Occupation <Text style={styles.required}>*</Text></Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={occupation}
                        onValueChange={(itemValue) => setOccupation(itemValue)}
                    >
                        <Picker.Item label="Select Occupation" value="" />
                        <Picker.Item label="Engineer" value="engineer" />
                        <Picker.Item label="Doctor" value="doctor" />
                        <Picker.Item label="Teacher" value="teacher" />
                    </Picker>
                </View>

                <Text style={styles.label}>Association Year<Text style={styles.required}>*</Text></Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={associationYear}
                        onValueChange={(itemValue) => setAssociationYear(itemValue)}
                    >
                        <Picker.Item label="Select Year" value="" />
                        <Picker.Item label="2025" value="2025" />
                        <Picker.Item label="2024" value="2024" />
                        <Picker.Item label="2023" value="2023" />
                    </Picker>
                </View>

                <Text style={styles.label}>Company Name <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} placeholder="Enter Company Name" />

                <Text style={styles.label}>Upload Image</Text>
                <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
                    {uploadedImage ? (
                        <Image source={{ uri: uploadedImage }} style={styles.uploadedImage} />
                    ) : (
                        <Image
                            source={require("../assets/uploadImage.png")}
                            style={styles.uploadIcon}
                            resizeMode="contain"
                        />
                    )}
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Initiation Info</Text>

                <View style={styles.switchRow}>
                    <Text style={styles.label}>Initiated <Text style={styles.required}>*</Text></Text>
                    <Switch
                        value={initiated}
                        onValueChange={setInitiated}
                    />
                </View>

                {initiated && (
                    <>
                        <Text style={styles.label}>Initiation Name <Text style={styles.required}>*</Text></Text>
                        <View style={styles.initiationRow}>
                            <TextInput
                                style={[styles.input, styles.initiationInput]}
                                placeholder="Enter Name"
                                value={initiationName}
                                onChangeText={setInitiationName}
                            />
                            <View style={[styles.pickerWrapper, styles.initiationPicker]}>
                                <Picker
                                    selectedValue={initiationSuffix}
                                    onValueChange={(val) => setInitiationSuffix(val)}
                                >
                                    <Picker.Item label="Dasa" value="Dasa" />
                                    <Picker.Item label="Devi Dasi" value="Devi Dasi" />
                                </Picker>
                            </View>
                        </View>

                        <Text style={styles.label}>Spiritual Master <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Name"
                            value={spiritualMaster}
                            onChangeText={setSpiritualMaster}
                        />
                    </>
                )}

                <TouchableOpacity style={styles.registerBtn}>
                    <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
        marginTop: 20,
        alignSelf: 'flex-start'
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: "500",
        alignSelf: 'flex-start'
    },
    input: {
        width: '100%',
        height: 46,
        backgroundColor: "#F2F2F2",
        borderRadius: 9,
        paddingHorizontal: 10,
        marginBottom: 12,
        fontSize: 14,
    },
    required: {
        color: "red",
    },
    multilineInput: {
        height: 92,
    },
    pickerWrapper: {
        width: '100%',
        height: 46,
        backgroundColor: "#F2F2F2",
        borderRadius: 9,
        marginBottom: 12,
        justifyContent: 'center',
    },
    uploadBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 20,
        alignSelf: "flex-start",  
    },
    uploadIcon: {
        width: 30,
        height: 30,
    },
    uploadedImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '100%',
        marginBottom: 20,
    },
    initiationRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        marginBottom: 12,
    },
    initiationInput: {
        flex: 1,
        marginRight: 8,
        height: 46,
        backgroundColor: "#F2F2F2",
        borderRadius: 9,
        paddingHorizontal: 10,
    },
    initiationPicker: {
        flex: 1,
        marginLeft: 8,
        height: 46,
        backgroundColor: "#F2F2F2",
        borderRadius: 9,
        justifyContent: 'center',
    },
    registerBtn: {
        width: 338,
        height: 46,
        backgroundColor: colors.primaryGreen,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    registerText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.textBlack,
    },
});

export default PersonalInfoScreen;