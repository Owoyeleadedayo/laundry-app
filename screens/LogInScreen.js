import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser){
        setLoading(false);
      }
      if(authUser){
          navigation.navigate("Home");
        }
    });

    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential.user;
      console.log("user details", user);
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Text style>Loading</Text>
          <ActivityIndicator size='large' color={"blue"} />
        </View>
      ) : (
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#005A9C" }}
            >
              Sign In
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 8 }}>
              Sign in to your account
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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

            <Pressable
              onPress={login}
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
              <Text
                style={{ textAlign: "center", fontSize: 18, color: "white" }}
              >
                LogIn
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 17, color: "grey" }}
              >
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({});
