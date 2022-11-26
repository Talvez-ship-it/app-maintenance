import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button, IconButton, ToggleButton } from 'react-native-paper';

export default function SignUpScreen({ navigation }) {
    const [text, setText] = React.useState("");
    const [value, setValue] = React.useState('left')
    return(
        <View style={styles.container}>
            <IconButton
                icon="airplane-cog"
                iconColor="#021F59"
                size={100}
                onPress={() => console.log('Pressed')}
            />

            <TextInput style={styles.TextInput}
            mode="outlined"
            label="Username"
            />
            <TextInput style={styles.TextInput}
            mode="outlined"
            label="Email"
            />
            {/* <TextInput style={styles.TextInput}
            mode="outlined"
            label="Telefone"
            /> */}
            <TextInput style={styles.TextInput}
            mode="outlined"
            label="Password"
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
            />
            <Button style={styles.Button} mode="contained" onPress={() => navigation.navigate('List')}>
                Continue
            </Button>
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