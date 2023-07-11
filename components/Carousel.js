import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";


const Carousel = () => {
     const images = [
          "https://media.istockphoto.com/id/949190984/photo/empty-washing-machine-with-pile-of-dirty-clothes.jpg?s=612x612&w=0&k=20&c=PzklJRAnFQFn_iBrO7zB93_YhChSIe85xxttqic8krs=",
          "https://media.istockphoto.com/id/1212183532/photo/laundry-room-with-white-wall-wooden-floor-and-flowers-3d-illustration.jpg?s=612x612&w=0&k=20&c=ETYxfjJq8FvdsfWwAXopesdoeG9k7w9hVonpSmUIufU=",
     ]
  return (
    <View>
      <SliderBox 
          images={images} 
          autoPlay
          circleLoop
          dotColor={"#12374F"}
          inactiveDotColor={"#90A4AE"}
          ImageComponentStyle={{
               borderRadius: 6,
               width: 400,
               height: 350,
               resizeMode: 'contain'
          }}
      />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})