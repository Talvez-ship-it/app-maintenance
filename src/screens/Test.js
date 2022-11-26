import * as React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { Button, TextInput, Searchbar } from 'react-native-paper';
import { DateTimePickerModal } from 'react-native-paper-datetimepicker';
 
export default function SingleDatePage() {
 
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text>Page content</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});