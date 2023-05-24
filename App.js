import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";

export default function App() {
  React.useEffect(() => {
    // For some reason  I have to write React.useEffect instead of just useEffect
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Ask for acces to location
      if (status !== "granted") {
        //setErrorMsg('Permission to access location was denied');    // same problem like setLocation. I guess there is something wrong with set
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //setLocation(location);      // I don't understand the porblems with set location at the moment
      console.log(location); // prints location to console
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          // set inital Region
          latitude: 49.010511,
          longitude: 8.366124,
          latitudeDelta: 0.005, // set latitude and longitude delta
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          console.log("onUserLocationChange", e.nativeEvent);
        }}
      /> 

      {/* <MapView
        style={styles.map}
        
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          console.log("onUserLocationChange", e.nativeEvent);
        }}>
      
      </MapView> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-end',    // map(container) is on the bottom
  },
  
  map: {
    width: "100%",
    height: "100%",
  },
});
