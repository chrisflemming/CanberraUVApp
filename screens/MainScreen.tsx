import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, RefreshControl, ScrollView, AppState, AppStateStatus, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainScreen = ({ route, navigation }: Props) => {
  const [uvIndex, setUvIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUVIndex();

    AppState.addEventListener('change', _handleAppStateChange);

    AsyncStorage.getItem('apiKey').then((apiKey) => {
        if (!apiKey) { navigation.navigate('Settings'); }
    });

    const interval = setInterval(() => {
        fetchUVIndex();
      }, 60000);
  
      return () => {
        clearInterval(interval); // Clear interval on component unmount
      }
      
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUVIndex();
      return () => {};
    }, [])
  );


  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      fetchUVIndex();
    }
  };

  const fetchUVIndex = async () => {
    setRefreshing(true);
    const apiKey = await AsyncStorage.getItem('apiKey');
    if (apiKey) {
      try {
        const response = await fetch('https://api.chrisflemming.com', {
          method: 'GET',
          headers: {
            'X-API-Key': apiKey,
          },
        });
        const data = await response.json();
        setUvIndex(data.uvIndex);
      } catch (error) {
        console.error(error);
      }
    }
    setRefreshing(false);
  };

  const getBackgroundColor = () => {
    if (uvIndex === null) return 'gray';
    if (uvIndex === 0) return 'black'
    if (uvIndex < 2.5) return 'green';
    if (uvIndex < 5.5) return '#FFCC00';
    if (uvIndex < 7.5) return 'orange';
    if (uvIndex < 10.5) return 'red';
    return 'purple';
  };

  const getBandName = () => {
    if (uvIndex === null) return "No data";
    if (uvIndex === 0) return 'Nil';
    if (uvIndex < 2.5) return 'Low';
    if (uvIndex < 5.5) return 'Moderate';
    if (uvIndex < 7.5) return 'High';
    if (uvIndex < 10.5) return 'Very high';
    return 'Extreme';
  };

  useLayoutEffect(() => {
    const backgroundColor = getBackgroundColor();
    navigation.setOptions({
      headerStyle: {
        backgroundColor: backgroundColor,
      }
    });
  }, [uvIndex, navigation]); // Dependency array includes uvIndex to update when it changes

  //    <View style={[{backgroundColor: getBackgroundColor()}]}>
  return (
    <View style={[{flex:1, backgroundColor: getBackgroundColor()}]}>
        <ScrollView
        contentContainerStyle={[styles.scrollView, { backgroundColor: getBackgroundColor() }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchUVIndex} tintColor={"white"} />}
        > 
        <Text style={styles.uvIndex}>{uvIndex}</Text>
        <Text style={styles.bandName}>{getBandName()}</Text>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {flex: 1, flexGrow: 1, justifyContent: "center"},
  uvIndex: {textAlign: 'center', fontSize: 148, fontFamily: 'JetBrainsMono-Regular', color: 'white'},
  bandName: {textAlign: 'center', fontFamily: 'JetBrainsMono-Regular', fontSize: 64, color: 'white'},
});

export default MainScreen;
