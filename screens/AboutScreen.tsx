import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { StyleSheet, Text, View } from "react-native";


type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

const AboutScreen = ({ route, navigation }: Props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>About Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {backgroundColor: 'white', flex: 1, flexGrow: 1},
    text: {fontSize: 16, fontFamily: 'Inter', color: 'black', }
  });
  

export default AboutScreen;