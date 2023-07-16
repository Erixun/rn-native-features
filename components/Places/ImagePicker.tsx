import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Button, Image, Pressable, View } from 'react-native';
import { AppColors } from '../../theme/AppColors';

export const ImagePickerElement = () => {
  const [image, setImage] = useState('');
  const [existingPermission, requestPermission] =
    ImagePicker.useCameraPermissions();

  const verifyPermissions = async () => {
    if (
      existingPermission?.status === ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      const permissionStatus = await requestPermission();
      if (!permissionStatus.granted) {
        console.log('Camera permission not granted');
        return;
      }

      return permissionStatus.granted;
    }
    if (existingPermission?.status === ImagePicker.PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  };
  const takeImageHandler = async () => {
    // }

    const hasPermission = await verifyPermissions();
    // console.log('status is', status);
    // const response = await requestPermission();
    // console.log(response)
    // if (!status || !status.granted) return;
    if (!hasPermission) return;
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      console.log(result);

      if (!result.canceled) {
        console.log(result.assets);
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error launching camera:', error);
    }
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    // if (!result.canceled) setImage(result.assets[0].uri);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.primary500,
        alignItems: 'center',
      }}
    >
      <Button onPress={takeImageHandler} title="Pick an image" />
      {/* style={{backgroundColor: AppColors.primary500}} /> */}
      {image && (
        <View
          style={{ borderWidth: 5, borderColor: AppColors.gray700, margin: 15 }}
        >
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View>
      )}
    </View>
  );
};
