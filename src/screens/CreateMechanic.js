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

export default function CreateMechanicScreen({ navigation }) {

    function createData() {

        if(name == "")
            return setErro(true);

        push(ref(db, 'mechanic/'), {          
          name: name,    
          status: status,
          classification: classification,
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

    //specialist data to save
    const [name, setName] = React.useState("");
    const [status, setStatus] = React.useState("Active");
    const [classification, setClassification] = React.useState("");

    const showClass = () => setClassVisible(true);
    const [classVisible, setClassVisible] = React.useState(false);
    const hideClass = () => setClassVisible(false);


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
            label="Name"
            value={name}
            onChangeText={name => setName(name)}
            maxLength={10}
            error={erro}
            />
            <TextInput
            label="Classification"
            value={classification}
            onChangeText={classification => setClassification(classification)}
            right={<TextInput.Icon icon="chevron-right" onPress={showClass}/>}
            editable={false}
            />

            <Dialog visible={classVisible} onDismiss={hideClass}>
                <Dialog.ScrollArea>
                    <ScrollView>
                    <List.Item
                        title="Engineering"                    
                        right={() => <List.Icon color="blue" icon="account-hard-hat" />}
                        onPress={() => {
                            setClassification("Engineering")
                            hideClass()
                        }
                    }
                    />
                    <List.Item
                        title="Technician"                    
                        right={() => <List.Icon color="blue" icon="account-network" />}
                        onPress={() => {
                            setClassification("Technician")
                            hideClass()
                        }
                    }   
                    />
                    <List.Item
                        title="Mechanic"                    
                        right={() => <List.Icon color="blue" icon="account-wrench" />}
                        onPress={() => {
                            setClassification("Mechanic")
                            hideClass()
                        }
                    }   
                    />
                    </ScrollView>
                </Dialog.ScrollArea>
            </Dialog>

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