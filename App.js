import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login';
import CreateScreen from './src/screens/Create';
import CreateAirplaneScreen from './src/screens/CreateAirplane';
import CreateMechanicScreen from './src/screens/CreateMechanic';
import ListScreen from './src/screens/List';
import InternalScreen from './src/screens/Internal';
import InternalAirplaneScreen from './src/screens/InternalAirplane';
import InternalMechanicScreen from './src/screens/InternalMechanic';
import SignUpScreen from './src/screens/Signup';
import OptionsScreen from './src/screens/Options';
import SingleDatePage from './src/screens/Test';


import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    "primary": "#021F59",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "#021F59",
    "onPrimaryContainer": "white",
    "secondary": "rgb(109, 88, 105)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(247, 218, 239)",
    "onSecondaryContainer": "rgb(39, 22, 36)",
    "tertiary": "rgb(130, 83, 69)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 219, 209)",
    "onTertiaryContainer": "rgb(50, 18, 8)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "white", 
    "onBackground": "rgb(30, 26, 29)",
    "surface": "white",
    "onSurface": "rgb(30, 26, 29)",
    "surfaceVariant": "white",
    "onSurfaceVariant": "black",
    "outline": "##010E28",
    "outlineVariant": "rgb(209, 194, 203)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(52, 47, 50)",
    "inverseOnSurface": "rgb(248, 238, 242)",
    "inversePrimary": "rgb(255, 170, 243)",
    "elevation": {
      "level0": "transparent",
      "level1": "white",
      "level2": "white",
      "level3": "white",
      "level4": "white",
      "level5": "white"
    },
    "surfaceDisabled": "rgba(30, 26, 29, 0.12)",
    "onSurfaceDisabled": "rgba(30, 26, 29, 0.38)",
    "backdrop": "rgba(55, 46, 52, 0.4)"
  } 
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
              {/* <Stack.Screen name="Thisnotwork" component={SingleDatePage} options={{header: () => null} }/> */}


          <Stack.Screen name="Login" component={LoginScreen} options={{header: () => null}}/>
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{header: () => null}}/>
          {/* <Stack.Screen name="Options" component={OptionsScreen} options={{header: () => null}}/> */}
          <Stack.Screen name="List" component={ListScreen} options={{header: () => null}}/>
          <Stack.Screen name="Internal" component={InternalScreen} options={{header: () => null}}/>
          <Stack.Screen name="InternalAirplane" component={InternalAirplaneScreen} options={{header: () => null}}/>
          <Stack.Screen name="InternalMechanic" component={InternalMechanicScreen} options={{header: () => null}}/>
          <Stack.Screen name="Create" component={CreateScreen} options={{header: () => null}}/>
          <Stack.Screen name="CreateAirplane" component={CreateAirplaneScreen} options={{header: () => null}}/>
          <Stack.Screen name="CreateMechanic" component={CreateMechanicScreen} options={{header: () => null}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}