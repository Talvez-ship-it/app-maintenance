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

export default function CreateScreen({ navigation }) {

    function createData() {

        if(number == "")
            return setErro(true);

        push(ref(db, 'ticket/'), {          
          number: number,
          airplane: airplane,
          status: status,
          type: type,
          description: description,
          mechanic: mechanic,
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
    const [aircraft, setAircraft] = React.useState("");
    useEffect(() => {
        return onValue(ref(db, "/aircraft"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let todoItems = { ...data };
        setAircraft(todoItems);
        });
    }, []);

    const [mechanicList, setMechanicList] = React.useState("");
    useEffect(() => {
        return onValue(ref(db, "/mechanic"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let todoItems = { ...data };
        setMechanicList(todoItems);
        });
    }, []);

    const [typeList, setTypeList] = React.useState("");
    useEffect(() => {
        return onValue(ref(db, "/type"), (querySnapShot) => {
        let data = querySnapShot.val() || {};
        let todoItems = { ...data };
        setTypeList(todoItems);
        });
    }, []);

    const [erro, setErro] = React.useState(false);

    const [number, setNumber] = React.useState("");
    const [airplane, setAirplane] = React.useState("");


    const [mechanic, setMechanic] = React.useState("");
    const [status, setStatus] = React.useState("Waiting for approval");
    const [type, setType] = React.useState("");
    const [description, setDescription] = React.useState("");


    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);

    const [airplaneVisible, setAirplaneVisible] = React.useState(false);
    const [mechanicVisible, setMechanicVisible] = React.useState(false);
    const [typeVisible, setTypeVisible] = React.useState(false);
    const showAirplane = () => setAirplaneVisible(true);
    const showMechanic = () => setMechanicVisible(true);
    const showType = () => setTypeVisible(true);
    const hideAirplane = () => setAirplaneVisible(false);
    const hideMechanic = () => setMechanicVisible(false);
    const hideType = () => setTypeVisible(false);

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
                    <RadioButton.Item label="Waiting for approval" value="Waiting for approval" />
                    <RadioButton.Item label="Approved" value="Approved" />
                    <RadioButton.Item label="In progress" value="In progress" />
                    <RadioButton.Item label="Complete" value="Complete" />
                    <RadioButton.Item label="Canceled" value="Canceled" />
                </RadioButton.Group>

            </List.Accordion>


            <TextInput
            label="Ticket Number"
            value={number}
            onChangeText={number => setNumber(number)}
            maxLength={10}
            error={erro}
            />
            <TextInput
            label="Airplane"
            value={airplane}
            right={<TextInput.Icon icon="magnify" onPress={showAirplane}/>}
            onChangeText={airplane => setAirplane(airplane)}
            editable={false}
            />
            <TextInput
            label="Specialist"
            value={mechanic}
            right={<TextInput.Icon icon="magnify" onPress={showMechanic}/>}
            onChangeText={mechanic => setMechanic(mechanic)}
            editable={false}
            />
            <TextInput
            label="Maintenance Type"
            value={type}
            right={<TextInput.Icon icon="chevron-right" onPress={showType}/>}
            onChangeText={type => setType(type)}
            editable={false}
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

             <Dialog visible={airplaneVisible} onDismiss={hideAirplane} style={styles.dialog}>
             <ScrollView>
                <Dialog.Content>
                {Object.keys(aircraft).length > 0 ? (
                    Object.keys(aircraft).map((key) => (
                        <Fragment key={key}>
                                <List.Item style={styles.item}
                                    title={aircraft[key].number}
                                    description={aircraft[key].status}
                                    right={() => {switch(aircraft[key].status){
                                        case "Active":
                                        return <List.Icon color="blue" icon="airplane" />
                                        case "Inactive":
                                        return <List.Icon color="gray" icon="airplane-off" />
                                      }}
                                    }
                                    onPress={() => {
                                            setAirplane(aircraft[key].number)
                                            hideAirplane()
                                        }
                                    }
                                />
                                <Divider/>
                            </Fragment>
                        ))
                    ) : (
                    <Text style={styles.error}>No records</Text>
                    )}
                </Dialog.Content>
                </ScrollView>
            </Dialog>

            <Dialog visible={mechanicVisible} onDismiss={hideMechanic} style={styles.dialog}>
             <ScrollView>
                <Dialog.Content>
                {Object.keys(mechanicList).length > 0 ? (
                        Object.keys(mechanicList).map((key) => (
                            <Fragment key={key}>
                                <List.Item style={styles.item}
                                    title={mechanicList[key].name}
                                    description={mechanicList[key].status}
                                    right={() => {switch(mechanicList[key].status){
                                        //case sensitive
                                        case "Active":
                                        return <List.Icon color="blue" icon="checkbox-marked-circle-outline" />
                                        case "Inactive":
                                        return <List.Icon color="gray" icon="cancel" />
                                      }}
                                    }
                                    onPress={() => {
                                            setMechanic(mechanicList[key].name)
                                            hideMechanic()
                                        }
                                    }
                                />
                                <Divider/>
                            </Fragment>
                        ))
                    ) : (
                    <Text style={styles.error}>No records</Text>
                    )}
                </Dialog.Content>
                </ScrollView>
            </Dialog>

            <Dialog visible={typeVisible} onDismiss={hideType}>
             <ScrollView>
                <Dialog.Content>
                {Object.keys(typeList).length > 0 ? (
                        Object.keys(typeList).map((key) => (
                            <Fragment key={key}>
                                <List.Item style={styles.item}
                                    title={typeList[key].type}
                                    right={() => {switch(typeList[key].type){
                                        case "Airframe":
                                        return <List.Icon color="blue" icon="access-point" />
                                        case "Check":
                                        return <List.Icon color="blue" icon="clipboard-check-outline" />
                                        case "Engine":
                                        return <List.Icon color="blue" icon="engine-outline" />
                                        case "Overhaul":
                                        return <List.Icon color="blue" icon="ballot-outline" />
                                        case "Tech":
                                        return <List.Icon color="blue" icon="video-input-component" />
                                      }}
                                    }
                                    onPress={() => {
                                            setType(typeList[key].type)
                                            hideType()
                                        }
                                    }
                                />
                                <Divider/>
                            </Fragment>
                        ))
                    ) : (
                    <Text style={styles.error}>No records</Text>
                    )}
                </Dialog.Content>
                </ScrollView>
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