import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import Navigation from './src/components/navigation/Index';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import {withAuthenticator} from 'aws-amplify-react-native'

Amplify.configure({
  ...awsconfig,
Analytics: { 
  disabled: true,
},
});

 function App() {
  return (

    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <Navigation />
      </GestureHandlerRootView>
        <StatusBar style="auto" />
    </NavigationContainer>

  );
}


export default App;
