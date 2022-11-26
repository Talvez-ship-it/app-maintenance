import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button, IconButton, ToggleButton } from 'react-native-paper';


{/* <Button icon="airplane-cog">
Welcome to Maintenance Ticket
</Button> */}

export default function LoginScreen({ navigation }) {
    const [text, setText] = React.useState("");
    const [value, setValue] = React.useState('left')
    const [showPass, setShowPass] = React.useState(true)

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
            label="Password"
            secureTextEntry = {showPass}
            right={<TextInput.Icon icon="eye" onPress={() => setShowPass(!showPass)}/>}
            />
            <Button style={styles.Button} mode="contained" onPress={() => navigation.navigate('List')}>
                Login
            </Button>
            <Button mode="flat" onPress={() => navigation.navigate('Sign Up')}>
                Don't have an account ? Sign up
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