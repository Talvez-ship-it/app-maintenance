import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet, ScrollView} from "react-native";
import { db } from '../firebase';
import {
    TextInput,
    Appbar,
    Text,
    Menu,
    List,
    Checkbox,
    Divider,
    RadioButton,
    Button,
    Dialog,
    Snackbar
} from 'react-native-paper';
import { 
    ref, 
    set, 
    update, 
    onValue, 
    remove, 
    push, 
    child, 
    get
} from "firebase/database";
import { color } from "@mui/system";
// import { DatePickerModal } from "react-native-paper-dates";

//Valores que serao recebidos no input
//DataAbertura 
//HoraAbertura
//TipoManutencao ok 
//Aeronave ok
//Status ok
//Mecanico 
//Severidade
//DataFechamento
//HoraFechamento

export default function CreateAirplaneScreen({ navigation }) {

    function createData() {

        if(number == "")
            return setErro(true);

        push(ref(db, 'aircraft/'), {          
          number: number,    
          status: status,
          description: description,
        }).then(() => {
          // Data saved successfully!
          // alert('data saved!'); 
          navigation.navigate('List') 
      })  
          .catch((error) => {
              // The write failed...
              alert(error);
          });
}

    const [erro, setErro] = React.useState(false);

    //airplane data to save
    const [number, setNumber] = React.useState("");
    const [status, setStatus] = React.useState("Active");
    const [description, setDescription] = React.useState("");


    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);

    return(
        <View style={styles.container}>
            <Appbar.Header>
            <Appbar.Content title="New" />
                <Appbar.Action color="#021F59" icon="checkbox-marked-circle" onPress={() => createData()} />
            </Appbar.Header>

            <List.Accordion
                title={"Status " + status}
                expanded={expanded}
                onPress={handlePress}>

                <RadioButton.Group onValueChange={status => setStatus(status)} value={status}>
                    <RadioButton.Item label="Active" value="Active" />
                    <RadioButton.Item label="Inactive" value="Inactive" />                
                </RadioButton.Group>

            </List.Accordion>


            <TextInput
            label="Airplane Number"
            value={number}
            onChangeText={number => setNumber(number)}
            maxLength={10}
            error={erro}
            />
            <TextInput
            label="Description"
            value={description}
            onChangeText={description => setDescription(description)}
            right={<TextInput.Affix text="/500" />}
            multiline
            numberOfLines={ 5 }
            maxLength={ 500 }
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    dialog: {
        flex: 1,
        paddingTop: 15,
        // paddingTop: 15,
    },
    // desable: {
    //     backgroundColor: 'white',
    // },
});