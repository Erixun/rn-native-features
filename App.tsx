import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AllPlaces } from './screens/AllPlaces';
import { AddPlace } from './screens/AddPlace';
import { IconButton } from './components/UI/IconButton';
import { AppColors } from './theme/AppColors';
import { Map } from './screens/Map';
import { LatLng } from 'react-native-maps';
import { Place } from './models/Place';
import { useEffect, useState } from 'react';
import { initDb } from './data/db';
import { ActivityIndicator } from 'react-native';

export type RootScreens = {
  AddPlace: undefined | { pickedLocation: LatLng };
  AllPlaces: undefined | { place: Place };
  Map: undefined;
  PlaceDetails: undefined;
};

const RootStack = createNativeStackNavigator<RootScreens>();

export default function App() {
  const [hasDbInitialized, setHasDbInitialized] = useState(false);

  useEffect(() => {
    if (!hasDbInitialized) initDb().then(setHasDbInitialized);
  });

  if (!hasDbInitialized) return <ActivityIndicator size="large" />;

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: AppColors.primary500,
            },
            headerTintColor: AppColors.gray700,
            contentStyle: {
              backgroundColor: AppColors.gray700,
            },
          }}
        >
          <RootStack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({
              navigation,
            }: {
              navigation: NavigationProp<RootScreens>;
            }) => ({
              title: 'Your Favorite Places',
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
          <RootStack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: 'Add your place' }}
          />
          <RootStack.Screen name="Map" component={Map} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}
