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

export default function InternalScreen({ route, navigation }) {
    
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
    const [ticketAirplane, setTicketAirplane] = useState('')
    const [ticketState, setTicketState] = useState('')
    const [ticketType, setTicketType] = useState('')
    const [ticketNumber, setTicketNumber] = useState('')
    const [ticketDescription, setTicketDescription] = useState('')
    const [ticketMechanic, setTicketMechanic] = useState('')

    
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    //lookups for airplane, techinician, maintenance type
    const [airplaneVisible, setAirplaneVisible] = React.useState(false);
    const [mechanicVisible, setMechanicVisible] = React.useState(false);
    const [typeVisible, setTypeVisible] = React.useState(false);
    const showAirplane = () => setAirplaneVisible(true);
    const showMechanic = () => setMechanicVisible(true);
    const showType = () => setTypeVisible(true);
    const hideAirplane = () => setAirplaneVisible(false);
    const hideMechanic = () => setMechanicVisible(false);
    const hideType = () => setTypeVisible(false);

    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);

    useEffect(() => {
        return onValue(ref(db, 'ticket/' + key), (element) => {
            const data = element.val()

            setTicketNumber(data?.number)
            setTicketAirplane(data?.airplane)
            setTicketState(data?.status)
            setTicketType(data?.type)
            setTicketDescription(data?.description)
            setTicketMechanic(data?.mechanic)
        });
    }, []);

    function ticketSave () {
        update(ref(db, 'ticket/' + key), {       
            number: ticketNumber,
            airplane: ticketAirplane,
            status: ticketState,
            type: ticketType,
            mechanic: ticketMechanic,
            description: ticketDescription
        }).then(() => {
            // alert('data updated!')
            navigation.navigate('List')
        })
        .catch((error) => {
            alert(error);
        });
    }

    function ticketDelete () {
        remove(ref(db, 'ticket/' + key))
        navigation.navigate('List')
    }

    return(
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Edit" />
                    <Appbar.Action color="#021F59" icon="checkbox-marked-circle" onPress={() => ticketSave()} />
                    <Appbar.Action color="#021F59" icon="close-circle" onPress={() => showDialog()} />
            </Appbar.Header>
            <ScrollView>
            <List.Accordion
                title={"Status " + ticketState}
                expanded={expanded}
                onPress={handlePress}>

                <RadioButton.Group onValueChange={status => setTicketState(status)} value={ticketState}>
                    <RadioButton.Item label="Waiting for approval" value="Waiting for approval" />
                    <RadioButton.Item label="Approved" value="Approved" />
                    <RadioButton.Item label="In progress" value="In progress" />
                    <RadioButton.Item label="Complete" value="Complete" />
                    <RadioButton.Item label="Canceled" value="Canceled" />
                </RadioButton.Group>

            </List.Accordion>


                <TextInput style={styles.desable}
                label="Ticket Number"
                value={ticketNumber}
                onChangeText={number => setTicketNumber(number)}
                maxLength={10}
                editable={false}
                />
                <TextInput
                label="Airplane"
                value={ticketAirplane}
                right={<TextInput.Icon icon="magnify" onPress={showAirplane}/>}
                onChangeText={airplane => setTicketAirplane(airplane)}
                editable={false}
                />
                <TextInput
                label="Specialist"
                value={ticketMechanic}
                right={<TextInput.Icon icon="magnify" onPress={showMechanic}/>}
                onChangeText={mechanic => setTicketMechanic(mechanic)}
                editable={false}
                />
                <TextInput
                label="Maintenance Type"
                value={ticketType}
                right={<TextInput.Icon icon="chevron-right" onPress={showType}/>}
                onChangeText={type => setTicketType(type)}
                editable={false}
                />
                <TextInput
                label="Description"
                value={ticketDescription}
                onChangeText={description => setTicketDescription(description)}
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
                                        // case sensitive
                                        case "Active":
                                        return <List.Icon color="blue" icon="airplane" />
                                        case "Inactive":
                                        return <List.Icon color="gray" icon="airplane-off" />
                                      }}
                                    }
                                    onPress={() => {
                                            setTicketAirplane(aircraft[key].number)
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
                                    description={mechanicList[key].classification}
                                    right={() => {switch(mechanicList[key].classification){
                                        case "Engineering":
                                        return <List.Icon color="blue" icon="account-hard-hat" />
                                        case "Technician":
                                        return <List.Icon color="blue" icon="account-network" />
                                        case "Mechanic":
                                        return <List.Icon color="blue" icon="account-wrench" />    
                                      }}
                                    }
                                    onPress={() => {
                                            setTicketMechanic(mechanicList[key].name)
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
                                            setTicketType(typeList[key].type)
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
    desable: {
        backgroundColor: '#F5F5F5',
    },
});