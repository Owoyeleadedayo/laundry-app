import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  TextInput, 
  Alert
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"

const RegisterScreen = () => {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [phone, setPhone] = useState('')
     const navigation = useNavigation()
     const register = () => {
          if(email === "" || password === "" || phone === ""){
               Alert.alert('Invalid Details', 'Please fill out all the details', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);              
          }

          createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
               console.log('user credential',userCredential);
               const user = userCredential._tokenResponse.email;
               const myUserUid = auth.currentUser.uid;
               
               setDoc(doc(db,"users",`${myUserUid}`),{
                    email:user,
                    phone:phone 
               })
          })
     }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 10}}>
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#005A9C" }}>
            Register
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 8 }}>
            Create an account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="black"
              style={{
                width: 300,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                marginLeft: 10,
                marginVertical: 13,
                fontSize: email ? 18 : 18,
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="black"
              style={{
                width: 300,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                marginLeft: 10,
                marginVertical: 20,
                fontSize: password ? 18 : 18,
              }}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
            <Feather name="phone" size={24} color="black" />
            <TextInput
              placeholder="Phone No"
              placeholderTextColor="black"
              style={{
                width: 300,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                marginLeft: 10,
                marginVertical: 20,
                fontSize: phone ? 18 : 18,
              }}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>

          <Pressable
            onPress={register}
            style={{
              width: 200,
              backgroundColor: "#4B9CD3",
              padding: 15,
              marginTop: 40,
              marginRight: "auto",
              marginLeft: "auto",
              borderRadius: 7,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 18, color: "white" }}>
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <Text style={{ textAlign: "center", fontSize: 17, color: "grey" }}>
              Alreay have an Account? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
