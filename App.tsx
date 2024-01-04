import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import Svg, {Path} from 'react-native-svg';
import { StyleSheet, TouchableOpacity } from 'react-native';

export type RootStackParamList = {
  Main: undefined,
  Settings: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const gearIcon = <Svg height="16" width="16" viewBox="0 0 512 512"><Path opacity="1" fill="#FFFFFF" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></Svg>

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Main" component={MainScreen} options={({ route, navigation }) => ({
            title: 'Canberra UV', 
            headerShadowVisible: false, 
            headerTitleStyle: {fontFamily: 'JetBrainsMono-Regular', fontSize: 32, color: 'white'},
            headerRight: () => (
              <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
                {gearIcon}
              </TouchableOpacity>
            )}
          )}
          />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{title: 'Settings', headerShadowVisible: false, headerBackTitleVisible: false, headerTitleStyle: {fontFamily: 'JetBrainsMono-Regular', fontSize: 32}}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({ 
  settingsButton: {padding: 1}
});

export default App;
