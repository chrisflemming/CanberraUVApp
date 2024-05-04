import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Text, StyleSheet, AppState, AppStateStatus, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, locationsData } from '../App';
import { useFocusEffect } from '@react-navigation/native';
import { XMLParser } from 'fast-xml-parser';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainScreen = ({ route, navigation }: Props) => {
  const [uvData, setUvData] = useState<{id: string, index: number | null}[]>([]);

  const location = route.params?.location;

  useEffect(() => {
    fetchUVIndex();

    AppState.addEventListener('change', _handleAppStateChange);

    const interval = setInterval(() => {
      fetchUVIndex();
    }, 10000);

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    }

  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUVIndex();
      return () => { };
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: location ? locationsData[location].name + " UVI" : "No location set",
      headerStyle: { backgroundColor: getBackgroundColor() }
    });
  });


  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      fetchUVIndex();
    }
  };

  const fetchUVIndex = async () => {
    try {
      const response = await fetch('https://uvdata.arpansa.gov.au/xml/uvvalues.xml', {
        method: 'GET'
      });

      // parse XML response
      const xml = await response.text();

      const parserOptions = {
        ignoreDeclaration: true
      }
      const parser = new XMLParser(parserOptions);
      const jsonObj = parser.parse(xml);

      const data = jsonObj.stations.location.map((loc : any) => ({id : loc.name, index: ((loc.status === 'ok' && loc.index >= 0) ? loc.index : null)}));

      if (!data) {
        console.error('Location not found');
        return;
      }

      // handle loc.staus !== 'ok'
      setUvData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUvIndex = () => {
    return uvData ? uvData.find((loc : any) => loc.id === location)?.index : "--";
  }

  const getBackgroundColor = () => {
    let uvIndex = uvData ? uvData.find((loc : any) => loc.id === location)?.index : null;

    if (uvIndex === null || uvIndex === undefined) return 'gray';
    if (uvIndex === 0) return 'black'
    if (uvIndex < 2.5) return 'green';
    if (uvIndex < 5.5) return '#FFCC00';
    if (uvIndex < 7.5) return 'orange';
    if (uvIndex < 10.5) return 'red';
    return 'purple';
  };

  const getBandName = () => {
    let uvIndex = uvData ? uvData.find((loc : any) => loc.id === location)?.index : null;

    if (uvIndex === null || uvIndex === undefined) return "No data";
    if (uvIndex === 0) return 'Nil';
    if (uvIndex < 2.5) return 'Low';
    if (uvIndex < 5.5) return 'Moderate';
    if (uvIndex < 7.5) return 'High';
    if (uvIndex < 10.5) return 'Very high';
    return 'Extreme';
  };

  return (
    <View style={[{ flex: 1, flexGrow: 1, justifyContent: "center", backgroundColor: getBackgroundColor() }]}>
      <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.uvIndex}>{getUvIndex()}</Text>
      <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.bandName}>{getBandName()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  uvIndex: {textAlign: 'center', fontSize: 148, fontFamily: 'SpaceMono-Regular', color: 'white'},
  bandName: {textAlign: 'center', fontFamily: 'SpaceMono-Regular', fontSize: 64, color: 'white'},
});

export default MainScreen;
