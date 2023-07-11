import { StyleSheet, Text, View, SafeAreaView, Alert, Pressable, Image, TextInput, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Location from "expo-location"
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


const HomeScreen = () => {
     const cart = useSelector((state) => state.cart.cart);
     const [items, setItems] = useState([]);
     const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev,0);
     const navigation = useNavigation();
     const [displayCurrentAddress, setDisplayCurrentAddress] = useState("we are loading your location");
     const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

     useEffect(() => {
          checkIfLocationEnabled();
          getCurrentLocation();
     }, []);

     const checkIfLocationEnabled = async () => {
          let enabled = await Location.hasServicesEnabledAsync();
          if(!enabled){
               Alert.alert('Location services not enabled', 'Please enable your location services', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
               ]);
          }else{
               setLocationServicesEnabled(enabled)
          }
     }

     const getCurrentLocation = async () => {
          let {status} = await Location.requestForegroundPermissionsAsync();

          if(status !== "granted"){
               Alert.alert('Alert Title', 'My Alert Msg', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
               ]);
          };

          const {coords} = await Location.getCurrentPositionAsync(); 
          if(coords){
               const {latitude, longitude} = coords;
               let response = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude
               })

               for(let item of response){
                    let address = `${item.name} ${item.street} ${item.country}`;
                    setDisplayCurrentAddress(address)
               }
          }
     }

     const product = useSelector((state) => state.product.product);
     const dispatch = useDispatch();
     useEffect(() => {
          if(product.length > 0) return;

          const fetchProducts = async () => {
               const colRef = collection(db, "types");
               const docsSnap = await getDocs(colRef);
               docsSnap.forEach((doc) => {
                    items.push(doc.data())
               });
               items?.map((service) => dispatch(getProducts(service)));
          }
          fetchProducts();
     }, []);
     console.log(product);
const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/2161/2161117.png",
      name: "Shirt",
      quantity: 0,
      price: 700,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/6232/6232684.png",
      name: "T-shirt",
      quantity: 0,
      price: 500,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/2390/2390065.png",
      name: "Dresses",
      quantity: 0,
      price: 1200,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/10379/10379046.png",
      name: "Jeans",
      quantity: 0,
      price: 1000,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/3826/3826922.png",
      name: "Sweater",
      quantity: 0,
      price: 700,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/586/586495.png",
      name: "Shorts",
      quantity: 0,
      price: 600,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/1943/1943905.png",
      name: "Sleeveless",
      quantity: 0,
      price: 500,
    },
  ];


  return (
     <>
    <ScrollView style={{backgroundColor:"#f0f0f5", flex: 1, marginTop: 50}}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
          <MaterialIcons name="location-on" size={30} color="#E52B50" />
          <View>
               <Text style={{ fontSize: 18, fontWeight: '600' }}>Home</Text>
               <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Profile")} style={{marginLeft: "auto", marginRight: 7}}>
               <Image 
                    source={{ uri: "https://lh3.googleusercontent.com/ogw/AOLn63GjrihaOHoaFV3VGx-FUqLy_qfmPOTo_qBIiatg1A=s32-c-mo"}}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
               />
          </Pressable>
      </View>

      {/* Search Bar */}
      <View style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 0.8,
          borderColor: '#C0C0C0',
          borderRadius: 7
      }}>
          <TextInput placeholder='Search for items or more' />
          <Feather name="search" size={24} color="#E52B50" />
      </View>

      <Carousel />

      <Services />

      {product.map((item, index) => (
          <DressItem item={item} key={index} />
      ))}
    </ScrollView>

          {total === 0 ? ( 
               null 
            ) : (
               <Pressable style={{
                    backgroundColor: '#088F8F',
                    padding: 10,
                    marginBottom: 30,
                    margin: 15,
                    borderRadius: 7,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                   }}>
                         <View>
                              <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>{cart.length} items | #{total}</Text>
                              <Text style={{fontSize: 14, fontWeight: '400', color: 'white', marginVertical: 6}}>extra charges might apply</Text>
                         </View>
                         <Pressable onPress={() => navigation.navigate("PickUp")} style={{backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 20, alignItems: 'center', borderRadius: 7, justifyContent: 'center'}}>
                              <Text style={{fontSize: 17, fontWeight: '600', color: '#088F8F'}}>Proceed to Pickup</Text>
                         </Pressable>
                   </Pressable>                
          )}
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})