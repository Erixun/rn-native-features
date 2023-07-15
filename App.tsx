import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AllPlaces } from './screens/AllPlaces';
import { AddPlace } from './screens/AddPlace';
import { IconButton } from './components/UI/IconButton';

type RootScreens = {
  AddPlace: undefined;
  AllPlaces: undefined;
  Map: undefined;
  PlaceDetails: undefined;
};

const RootStack = createNativeStackNavigator<RootScreens>();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({
              navigation,
            }: {
              navigation: NavigationProp<RootScreens>;
            }) => ({
              headerRight: ({ tintColor }) => {
                return (
                  <IconButton
                    icon="add"
                    size={28}
                    color={tintColor}
                    onPress={() => navigation.navigate('AddPlace')}
                  />
                );
              },
            })}
          />
          <RootStack.Screen name="AddPlace" component={AddPlace} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}
