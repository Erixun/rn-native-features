import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Button, Image, Pressable, View, Text } from 'react-native';
import { AppColors } from '../../theme/AppColors';

export const ImagePickerElement = () => {
  const [imagePreview, setImage] = useState('');
  const [existentPermission, requestPermission] =
    ImagePicker.useCameraPermissions();

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
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
  };

  const verifyPermissions = async () => {
    const isPermissionUndetermined =
      existentPermission?.status === ImagePicker.PermissionStatus.UNDETERMINED;
    if (isPermissionUndetermined) {
      const permissionResponse = await requestPermission();
      if (!permissionResponse.granted) {
        console.log('Camera permission not granted');
        return;
      }

      return permissionResponse.granted;
    }

    const isPermissionDenied =
      existentPermission?.status === ImagePicker.PermissionStatus.DENIED;
    if (isPermissionDenied) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  };

  return (
    <View
      style={{
        flex: 1,
        gap: 10,
      }}
    >
      <View
        style={{
          borderRadius: 3,
          width: '100%',
          aspectRatio: 2,
          backgroundColor: AppColors.primary100,
          justifyContent: 'center',
        }}
      >
        {imagePreview ? (
          <Image
            source={{ uri: imagePreview }}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Text style={{ textAlign: 'center', fontSize: 16 }}>
            No image taken yet.
          </Text>
        )}
      </View>
      <Button onPress={takeImageHandler} title="Pick an image" />
      {/* style={{backgroundColor: AppColors.primary500}} /> */}
    </View>
  );
};
