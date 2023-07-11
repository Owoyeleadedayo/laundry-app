import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react';
import LottieView from "lottie-react-native";

const orderScreen = () => {
  return (
    <SafeAreaView>
      <LottieView 
          source={require("../assets/thumbs.json")}
          style={{
               height: 360,
               width: 300,
               alignSelf: 'center',
               marginTop: 40,
               justifyContent: "center"
          }}
      />

      <Text style={{ marginTop: 40, fontSize: 19, fontWeight: "600", textAlign: 'center' }}>Your order has been placed</Text>

     <LottieView 
          source={require("../assets/sparkle.json")}
          style={{
               height: 300,
               position: "absolute",
               top: 100,
               width: 300,
               alignSelf: "center"
          }}
          autoplay
          loop={false}
          speed={0.7}
     />
    </SafeAreaView>
  )
}

export default orderScreen;
const styles = StyleSheet.create({})