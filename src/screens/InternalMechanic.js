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

export default function InternalMechanicScreen({ route, navigation }) {

    const {key} = route.params;
    const [mechanicName, setMechanicName] = useState('')
    const [mechanicStatus, setMechanicStatus] = useState('')
    const [mechanicClassification, setMechanicClassification] = useState('')

    
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);

    const showClass = () => setClassVisible(true);
    const [classVisible, setClassVisible] = React.useState(false);
    const hideClass = () => setClassVisible(false);

    useEffect(() => {
        return onValue(ref(db, 'mechanic/' + key), (element) => {
            const data = element.val()

            setMechanicName(data?.name)
            setMechanicStatus(data?.status)
            setMechanicClassification(data?.classification)
        });
    }, []);

    function airplaneSave () {
        update(ref(db, 'mechanic/' + key), {       
            name: mechanicName,
            status: mechanicStatus,
            classification: mechanicClassification,
        }).then(() => {
            // alert('data updated!')
            navigation.navigate('List')
        })
        .catch((error) => {
            alert(error);
        });
    }

    function ticketDelete () {
        remove(ref(db, 'mechanic/' + key))
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
                title={"Status " + mechanicStatus}
                expanded={expanded}
                onPress={handlePress}>

                <RadioButton.Group onValueChange={status => setMechanicStatus(status)} value={mechanicStatus}>
                    <RadioButton.Item label="Active" value="Active" />
                    <RadioButton.Item label="Inactive" value="Inactive" />                
                </RadioButton.Group>

            </List.Accordion>


                <TextInput style={styles.desable}
                label="Airplane Number"
                value={mechanicName}
                onChangeText={number => setMechanicName(number)}
                maxLength={10}
                editable={false}
                />            
                <TextInput
                label="Classification"
                value={mechanicClassification}
                onChangeText={classification => setMechanicClassification(classification)}
                right={<TextInput.Icon icon="chevron-right" onPress={showClass}/>}
                editable={false}
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

            <Dialog visible={classVisible} onDismiss={hideClass}>
                <Dialog.ScrollArea>
                    <ScrollView>
                    <List.Item
                        title="Engineering"                    
                        right={() => <List.Icon color="blue" icon="account-hard-hat" />}
                        onPress={() => {
                            setMechanicClassification("Engineering")
                            hideClass()
                        }
                    }
                    />
                    <List.Item
                        title="Technician"                    
                        right={() => <List.Icon color="blue" icon="account-network" />}
                        onPress={() => {
                            setMechanicClassification("Technician")
                            hideClass()
                        }
                    }   
                    />
                    <List.Item
                        title="Mechanic"                    
                        right={() => <List.Icon color="blue" icon="account-wrench" />}
                        onPress={() => {
                            setMechanicClassification("Mechanic")
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
    desable: {
        backgroundColor: '#F5F5F5',
    },
});