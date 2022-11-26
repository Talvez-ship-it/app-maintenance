import React, { useState, useEffect, Fragment } from "react";
import { db } from "../firebase";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { FAB, List, ActivityIndicator, MD2Colors, Divider, Searchbar, Appbar, TextInput } from "react-native-paper";
import {
  ref,
  set,
  update,
  onValue,
  remove,
  push,
  child,
  get,
  orderByValue,
} from "firebase/database";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ListScreen({ navigation }) {
  //floating button variables
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [tickets, setTickets] = useState({});
  const [filter, setFilter] = React.useState('/ticket');

  useEffect(() => {
    onValue(ref(db, filter), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let todoItems = { ...data };
      return setTickets(todoItems);
    });
  }, [filter]);

  // const onChangeSearch = query => setSearchQuery(query);
  // const [searchQuery, setSearchQuery] = React.useState('');

//   return db.ref('ticket').orderByValue().on('value', (snapshot) => {
//   snapshot.forEach((data) => {
//     console.log('The ' + data.key + ' dinosaur\'s score is ' + data.val());
//   });
// });

  return (
    <>
        {Object.keys(tickets).length > 0 ? (
            <SafeAreaView style={styles.container}>
              {/* <Appbar.Header>
              <Searchbar
                placeholder="Search"
                onIconPress={onChangeSearch}
                value={searchQuery}
              />
              </Appbar.Header> */}
                <Appbar.Header>
                  {/* <Appbar.BackAction onPress={() => {}} /> */}
                  <Appbar.Content title="Tickets" />
                  <Appbar.Action icon="clipboard-text" onPress={() => {setFilter('/ticket')}} />
                  <Appbar.Action icon="airplane" onPress={() => {setFilter('/aircraft')}} />
                  <Appbar.Action icon="account-wrench" onPress={() => {setFilter('/mechanic')}} />
                </Appbar.Header>
                <ScrollView>
                    {Object.keys(tickets).length > 0 ? (
                        Object.keys(tickets).map((key) => (
                            <Fragment key={key}>
                                <List.Item style={styles.item}
                                    title={tickets[key].number || tickets[key].name}
                                    description={tickets[key].classification || tickets[key].status}
                                    right={() => {switch(tickets[key].classification || tickets[key].status){
                                      case "Waiting for approval":
                                      return <List.Icon color="green" icon="progress-alert" />
                                      case "Approved":
                                      return <List.Icon color="green" icon="alert-circle-check-outline" />
                                      case "In progress":
                                      return <List.Icon color="blue" icon="progress-check" />
                                      case "Complete":
                                      return <List.Icon color="blue" icon="checkbox-marked-circle-outline" />
                                      case "Canceled":
                                      return <List.Icon color="red" icon="cancel" />

                                      //case to airplane status
                                      case "Active":
                                      return <List.Icon color="blue" icon="airplane" />
                                      case "Inactive":
                                      return <List.Icon color="gray" icon="airplane-off" />

                                      //case to specialit classification
                                      case "Engineering":
                                      return <List.Icon color="blue" icon="account-hard-hat" />
                                      case "Technician":
                                      return <List.Icon color="blue" icon="account-network" />
                                      case "Mechanic":
                                      return <List.Icon color="blue" icon="account-wrench" />                                      
                                    }}
                                  }

                                    onPress={() => 
                                      {switch(filter){
                                        case "/ticket":
                                        return navigation.navigate("Internal", {key: key})
                                        case "/aircraft":
                                        return navigation.navigate("InternalAirplane", {key: key})
                                        case "/mechanic":
                                        return navigation.navigate("InternalMechanic", {key: key})
                                      }
                                      }                                        
                                    }
                                />
                                <Divider style={styles.divider}/>
                            </Fragment>
                        ))
                    ) : (
                    <Text style={styles.error}>No records</Text>
                    )}
                </ScrollView>

                {/* floating button */}
                <FAB
                    icon="plus"
                    
                    // {() => {switch(filter){
                    //   case "/ticket":
                    //   return <FAB.icon icon="plus"/>
                    // }
                    // }}
                    style={styles.fab}
                    onPress={() => {switch(filter){
                      case "/ticket":
                      return navigation.navigate("Create")
                      case "/aircraft":
                      return navigation.navigate("CreateAirplane")
                      case "/mechanic":
                      return navigation.navigate("CreateMechanic")
                    }
                  }
                }
                />
                {/* <FAB.Group
                  open={open}
                  visible
                  icon={open ? 'calendar-today' : 'plus'}
                  actions={[
                    // { icon: 'plus', onPress: () => console.log('Pressed add') },
                    {
                      icon: 'star',
                      label: 'New Specialist',
                      onPress: () => console.log('Pressed star'),
                    },
                    {
                      icon: 'email',
                      label: 'New Airplane',
                      onPress: () => console.log('Pressed email'),
                    },
                    {
                      icon: 'bell',
                      label: 'New Ticket',
                      onPress: () => console.log('Pressed notifications'),
                    },
                  ]}
                  onStateChange={onStateChange}
                  onPress={() => {
                    if (open) {
                      // do something if the speed dial is open
                    }
                  }}
                /> */}

                
            </SafeAreaView>    
        ) : (
            <ActivityIndicator animating={true} style={styles.full}/>
            // <Text style={styles.error}>No records</Text>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
  error: {
    textAlign: "center",
    color: "#F07456",
    paddingTop: 20,
    paddingBottom: 20,
  },
  loading: {
    flex: 1,
    flexDirection: "row"
  },
  full: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: height - 200
  },
  divider: {
    backgroundColor: 'black'
  },
  item: {
    backgroundColor: 'white'
  }
});
