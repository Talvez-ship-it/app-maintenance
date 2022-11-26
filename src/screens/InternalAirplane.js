import React, {useState, useEffect, Fragment} from "react";
import { db } from '../firebase';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { 
    FAB,
    Button,
    Provider,
    Appbar,
    Divider,
    TextInput,
    Dialog,
    Paragraph,
    List,
    Checkbox,
    RadioButton
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

export default function InternalAirplaneScreen({ route, navigation }) {
    
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

    const {key} = route.params;
    const [airplaneNumber, setAirplaneNumber] = useState('')
    const [airplaneStatus, setAirplaneStatus] = useState('')
    const [ticketAirplane, setTicketAirplane] = useState('')
    const [ticketType, setTicketType] = useState('')
    const [airplaneDescription, setAirplaneDescription] = useState('')
    const [ticketMechanic, setTicketMechanic] = useState('')

    
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);

    useEffect(() => {
        return onValue(ref(db, 'aircraft/' + key), (element) => {
            const data = element.val()

            setAirplaneNumber(data?.number)
            setTicketAirplane(data?.airplane)
            setAirplaneStatus(data?.status)
            setTicketType(data?.type)
            setAirplaneDescription(data?.description)
            setTicketMechanic(data?.mechanic)
        });
    }, []);

    function airplaneSave () {
        update(ref(db, 'aircraft/' + key), {       
            number: airplaneNumber,
            status: airplaneStatus,
            description: airplaneDescription,
        }).then(() => {
            // alert('data updated!')
            navigation.navigate('List')
        })
        .catch((error) => {
            alert(error);
        });
    }

    function ticketDelete () {
        remove(ref(db, 'aircraft/' + key))
        navigation.navigate('List')
    }

    return(
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Edit Airplane" />
                    <Appbar.Action color="#021F59" icon="checkbox-marked-circle" onPress={() => airplaneSave()} />
                    <Appbar.Action color="#021F59" icon="close-circle" onPress={() => showDialog()} />
            </Appbar.Header>
            <ScrollView>
            <List.Accordion
                title={"Status " + airplaneStatus}
                expanded={expanded}
                onPress={handlePress}>

                <RadioButton.Group onValueChange={status => setAirplaneStatus(status)} value={airplaneStatus}>
                    <RadioButton.Item label="Active" value="Active" />
                    <RadioButton.Item label="Inactive" value="Inactive" />                
                </RadioButton.Group>

            </List.Accordion>


                <TextInput style={styles.desable}
                label="Airplane Number"
                value={airplaneNumber}
                onChangeText={number => setAirplaneNumber(number)}
                maxLength={10}
                editable={false}
                />            
                <TextInput
                label="Description"
                value={airplaneDescription}
                onChangeText={description => setAirplaneDescription(description)}
                right={<TextInput.Affix text="/500" />}
                multiline
                numberOfLines={ 5 }
                maxLength={ 500 }
                />

            </ScrollView>

            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                <Paragraph>Are you sure to delete this record ?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                <Button onPress={hideDialog}>Close</Button>
                <Button onPress={ticketDelete}>Delete</Button>
                </Dialog.Actions>
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
    desable: {
        backgroundColor: '#F5F5F5',
    },
});