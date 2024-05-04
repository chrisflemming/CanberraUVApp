import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { StyleSheet, Text, View, Linking } from "react-native";


type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

const AboutScreen = ({ route, navigation }: Props) => {
    const handlePress = (url: string) => {
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
    };

    return (
        <View style={styles.container}>
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
                . UVI readings are real-time, provided by ARPANSA's network of detectors located around Australia.
                See&nbsp;
                <Text style={styles.link} onPress={() => handlePress('https://www.arpansa.gov.au/our-services/monitoring/ultraviolet-radiation-monitoring/ultraviolet-radation-data-information#Disclaimer')}>
                Disclaimer
                </Text>.
                {"\n\n"}
                The UV Index is a measure of the intensity of UV radiation on the Earth's surface that is relevant to effects on the human skin and eyes.
                {"\n\n"}
                The World Health Organization (WHO) recommends using sun protection when outdoors and the UV Index is 3 or above.
                {"\n\n"}
                See&nbsp;
                <Text style={styles.link} onPress={() => handlePress('https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation')}>
                    WHO Fact Sheet on Ultra Violet Radiation
                </Text>.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {backgroundColor: 'white', flex: 1, flexGrow: 1, padding: 10},
    text: {fontSize: 18, fontFamily: 'InterVariable', color: 'black'},
    link: {
        color: 'blue', 
        textDecorationLine: 'underline',
    }
  });
  

export default AboutScreen;