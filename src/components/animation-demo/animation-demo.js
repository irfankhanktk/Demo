import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Text, View,StyleSheet} from 'react-native';

export const AnimationDemo = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const marginLeft =fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300]
  })
  const opacity =fadeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  })
  const movingMargin =fadeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 300, 0]
  })
  const textSize =fadeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [18, 32, 18]
  })
  const rotateX =fadeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '0deg']
  })
  React.useEffect(()=>{
        animate();
  },[])
//below is timing example
  const animate= ()=> {
    fadeAnim.setValue(0)
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => animate())
  }

//below is spring example
//   const animate= ()=> {
//     fadeAnim.setValue(0)
//     Animated.spring(
//       fadeAnim,
//       {
//         toValue: 1,
//         friction: 1,
//         easing: Easing.linear,
//         // useNativeDriver:true,
//       }
    // ).start();//call once 
    // ).start(() => animate());//call more than once
//   }
  

  return (
      <View style={styles.container}>
        <Animated.View
          style={{
            top:marginLeft,
            height: 30,
            width: 40,
            backgroundColor: 'red'}} />
        <Animated.View
          style={{
            opacity,
            marginTop: 10,
            height: 30,
            width: 40,
            backgroundColor: 'blue'}} />
        <Animated.View
          style={{
            marginLeft: movingMargin,
            marginTop: 10,
            height: 30,
            width: 40,
            backgroundColor: 'orange'}} />
        <Animated.Text
          style={{
            fontSize: textSize,
            marginTop: 10,
            color: 'green'}} >
            Animated Text!
        </Animated.Text>
        <Animated.View
          style={{
            transform: [{rotateX}],
            marginTop: 50,
            height: 30,
            width: 40,
            backgroundColor: 'black'}}>
          <Text style={{color: 'white'}}>Hello from TransformX</Text>
        </Animated.View>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150
  }
})