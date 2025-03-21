import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import PopularBusinessCard from './PopularBusinessCard';

export default function PopularBusiness() {
  const [businessList,setBusinessList] = useState([]);
  useEffect(()=> {
    GetBusinessList();
  }, [])

  const GetBusinessList = async() => {
    setBusinessList([]);
    const q=query(collection(db,'BusinessList'),limit(10));
    const querySnapshot = await getDocs(q); 

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])

    })
  }


  return (
    <View>
        <View style={{
            padding:20,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop:10
        }}>
        <Text style={{
            fontSize:20,
            fontFamily:'out-fit-bold',
        }}>PopularBusiness</Text>
        <Text
        style={{
            color:Colors.Primary,
            fontFamily:'outfit-medium'
        }}>View All</Text>
        </View>
        <FlatList
          data={businessList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index}) => (
            <PopularBusinessCard
            key={index}
            business={item}
            />
        )}
        />
    </View>
  )
}