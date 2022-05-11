import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Text, View, StyleSheet,FlatList } from 'react-native';
import { AnimationDemo, CarouselAnimation, MapDemo, MusicPlayer } from './src/components';
import Slider from '@react-native-community/slider'
import data from './src/constants/dataa.json';
import { getList, getRange, getSum } from './src/utils/utils';
const App = () => {

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  // const getSameCompanySHolders=()=>{
  //   try {
  //     const shareHolders=data?.data?.reduce(function (acc, obj) {
  //       let key =obj['company_code'];
  //       if (!acc[key]) {
  //         acc[key] = []
  //       }
  //       acc[key].push(obj)
  //       return acc
  //     }, []);
  //     console.log('shareHolders::',shareHolders);
  //     shareHolders?.map(x=>{
  //       console.log()
  //     })

  //   } catch (error) {
  //     console.log('error :',error);
  //   }
  // }
  
  React.useEffect(() => {
    const res=getList();
    console.log('data::',res);
    setData(res?.data);
    setTotal(res?.total);
    
    
  }, []);
  const renderItem=({item})=>{
   
    return(
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginVertical:10 }}>
      <Text style={{ width: '33%',textAlign:'center' }}>{item?.counter}</Text>
      <Text style={{ width: '33%',textAlign:'center' }}>{item?.range}</Text>
      <Text style={{ width: '33%',textAlign:'center' }}>{item?.sum}</Text>
    </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ width: '33%',textAlign:'center' }}>No. ShareHolders</Text>
        <Text style={{ width: '33%',textAlign:'center' }}>Range</Text>
        <Text style={{ width: '33%',textAlign:'center' }}>Holding</Text>
      </View>
       <FlatList
       data={data}
       renderItem={renderItem}
       keyExtractor={(item,index)=> index+''}
       />
      <Text style={{ width: '33%',textAlign:'center' }}>{total}</Text>
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