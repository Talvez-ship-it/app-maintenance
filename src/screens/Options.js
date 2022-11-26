import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button, IconButton, ToggleButton } from 'react-native-paper';


{/* <Button icon="airplane-cog">
Welcome to Maintenance Ticket
</Button> */}

export default function OptionsScreen({ navigation }) {
    const [text, setText] = React.useState("");
    const [value, setValue] = React.useState('left')

    return(
        <View style={styles.container}>
            <IconButton
                icon="airplane-plus"
                iconColor="#021F59"
                size={100}
                onPress={() => navigation.navigate('ListAirplane')}
            />
            <Text>Airplane</Text>

            <IconButton
                icon="text-box-plus-outline"
                iconColor="#021F59"
                size={100}
                onPress={() => navigation.navigate('List')}
            />
            <Text>Ticket</Text>

            <IconButton
                icon="account-plus"
                iconColor="#021F59"
                size={100}
                onPress={() => navigation.navigate('List')}
            />
            <Text>Specialist</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    TextInput: {
        width: '75%',
        margin: 10,
    },
    Button: {
        margin: 15,
    }
});