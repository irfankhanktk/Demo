import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';
import { AnimationDemo, CarouselAnimation, MapDemo, MusicPlayer } from './src/components';
import Slider from '@react-native-community/slider'
const App = () => {
  const [radius, setRadius] = React.useState(100);
  return (
    <View style={{ flex: 1 }}>
      {/* <MapDemo radius={radius} />
      <Text style={{}}>{Math.floor(radius / 1000)} km</Text>
      <Slider
        style={{
        }}
        minimumValue={500}
        maximumValue={100000}
        value={radius}
        minimumTrackTintColor={'red'}
        thumbTintColor={'blue'}
        maximumTrackTintColor="#000000"
        onValueChange={value => {
          setRadius(value);
        }}
      /> */}
      {/* <AnimationDemo /> */}
      <CarouselAnimation/>
      {/* <MusicPlayer/> */}
    </View>
  );
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 150
  }
})