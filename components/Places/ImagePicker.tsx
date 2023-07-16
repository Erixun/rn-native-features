import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, Pressable, View } from 'react-native';
import { AppColors } from '../../theme/AppColors';

export const ImagePickerElement = () => {
  const [image, setImage] = useState('');
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const verifyPermissions = async () => {};
  const takeImageHandler = async () => {
    const { status } = await requestPermission();
    if (status !== 'granted') {
      console.log('Camera permission not granted');
      return;
    }

    console.log('status is', status);
    // const response = await requestPermission();
    // console.log(response)
    // if (!status || !status.granted) return;
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
        <View style={{ borderWidth: 5, borderColor: AppColors.gray700, margin: 15}}>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View>
      )}
    </View>
  );
};
