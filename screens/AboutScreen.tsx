import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { StyleSheet, Text, View, Linking, ScrollView } from "react-native";
import Svg, {Circle, G, Path, Rect, Use} from 'react-native-svg';


type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

const sunImage =
    <Svg width="128" height="128" viewBox="-30 -30 60 60" fill="#fcdf03">
        <Rect x="-30" y="-30" width="60" height="60" fill="blue" />
        <G id="x">
            <G id="y">
                <Path id="z" d="m8,0-8,30-8-30 8-30" />
                <Use xlinkHref="#z" transform="rotate(15)" />
                <Use xlinkHref="#z" transform="rotate(30)" />
                <Use xlinkHref="#z" transform="rotate(45)" />
            </G>
            <Use xlinkHref="#y" transform="rotate(60)" />
            <Use xlinkHref="#y" transform="rotate(120)" />
            <Use xlinkHref="#y" transform="rotate(180)" />
            <Use xlinkHref="#y" transform="rotate(240)" />
            <Use xlinkHref="#y" transform="rotate(300)" />
        </G>
        <Circle stroke="blue" strokeWidth="1" r="16" />
    </Svg>

const AboutScreen = ({ route, navigation }: Props) => {
    const handlePress = (url: string) => {
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', paddingBottom: 40 }}>
                {sunImage}
            </View>
            <Text style={styles.text}>
                Developed by Chris Flemming
                {"\n"}
                <Text style={styles.link} onPress={() => handlePress('https://chrisflemming.com')}>
                    https://chrisflemming.com
                </Text>
                {"\n\n"}
                UV Index (UVI) data provided by&nbsp; 
                <Text style={styles.link} onPress={() => handlePress('https://www.arpansa.gov.au/')}>
                ARPANSA
                </Text>
                . UVI readings are real-time, provided by ARPANSA's network of sensors located around Australia.
                See&nbsp;
                <Text style={styles.link} onPress={() => handlePress('https://www.arpansa.gov.au/our-services/monitoring/ultraviolet-radiation-monitoring/ultraviolet-radation-data-information#Disclaimer')}>
                Disclaimer
                </Text>.
                {"\n\n"}
                The UV Index is a measure of the intensity of UV radiation on the Earth's surface that is relevant to effects on the human skin and eyes.
                {"\n\n"}
                The World Health Organization (WHO) recommends using sun protection if you are outdoors and the UV Index is 3 or above.
                {"\n\n"}
                See&nbsp;
                <Text style={styles.link} onPress={() => handlePress('https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation')}>
                    WHO Fact Sheet on Ultra Violet Radiation
                </Text>.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {backgroundColor: 'blue', flex: 1, flexGrow: 1, padding: 10},
    text: {fontSize: 18, fontFamily: 'InterVariable', color: 'white'},
    link: {
        color: 'white', 
        textDecorationLine: 'underline',
    }
  });
  

export default AboutScreen;