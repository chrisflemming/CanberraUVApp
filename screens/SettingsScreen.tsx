import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ route, navigation }: Props) => {
  let [apiKey, setApiKey] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('apiKey').then((value) => {
            if (value) {
                setApiKey(value);
            }
        });
    });

  const saveApiKey = async () => {
    await AsyncStorage.setItem('apiKey', apiKey);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>API Key</Text>
      <TextInput style={styles.input} onChangeText={setApiKey} value={apiKey} placeholder="Paste API Key" multiline={true} selectTextOnFocus={true} />
      <Button title="Save" onPress={saveApiKey} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1, flexGrow: 1, justifyContent: 'flex-start'},
  label: {fontFamily: 'JetBrainsMono-Regular', fontSize: 24},
  input: {textAlign: 'center', fontFamily: 'JetBrainsMono-Regular', fontSize: 24, color: 'black'},
});

export default SettingsScreen;
