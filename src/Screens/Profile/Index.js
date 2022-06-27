import { View, Text, TextInput, StyleSheet, Button, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import {Courier, TransportationModes} from '../../models/index';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from "@react-navigation/native";
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'

const Profile = () => {

  const {dbCourier,sub, setDbCourier} = useAuthContext();

  const [name, setName] = useState(dbCourier?.name || '');
  const [transportationMode, setTransportationMode] = useState(TransportationModes.DRIVNG);


  const navigation = useNavigation();

  const onSave = async () => {
    if(dbCourier){
      await updateCourier();
    }else{
      await createCourier();
    }
    navigation.goBack();
  };

  const createCourier = async () => {
    try{
      const courier = await DataStore.save(new Courier({
        name,
        lat: 0,
        lng: 0,
        sub,
        transportationMode
      }));
      setDbCourier(courier);
    }
    catch(e){
      Alert.alert('Error occured', e.message);
    }
  }

  const updateCourier = async () => {
    const courier = await DataStore.save(
      Courier.copyOf(dbCourier, (updated) => {
        updated.name = name;
        updated.transportationMode = transportationMode;
      })
    );
    setDbCourier(courier);
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => setTransportationMode(TransportationModes.BYCLING)} style={{
          backgroundColor: transportationMode === TransportationModes.BYCLING 
          ? '#3fc060'
          : 'white', 
          padding: 10, 
          margin: 10, 
          borderWidth: 1,
          borderColor: 'grey',
            borderRadius: 10
          }}>
          <MaterialIcons name='pedal-bike' size={40} color='black'/>
        </Pressable>
        <Pressable onPress={() => setTransportationMode(TransportationModes.DRIVNG)} style={{
          backgroundColor: 
            transportationMode === TransportationModes.DRIVNG 
            ? '#3fc060'
            : 'white', 
          padding: 10, margin: 10,
           borderWidth: 1, 
           borderColor: 'grey',
            borderRadius: 10
            }}>
          <FontAwesome5 name='car' size={40} color='black'/>
        </Pressable>
      </View>
      <Button onPress={onSave} title="Save" />
    </SafeAreaView>
      );
    };

    const styles = StyleSheet.create({
      title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
      },
      input: {
        margin: 10,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 5,
      },
    });
    
    export default Profile;