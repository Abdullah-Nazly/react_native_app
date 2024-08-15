import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import Category from '../../components/Home/Category'
import { db } from '../../config/FirebaseConfig'
import { getDocs } from 'firebase/firestore'
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList'

export default function Explore() {
  const [businessList,setBusinessList] = useState([]);
  const GetBusinessByCategory=async(category)=>{
    setBusinessList([]);
      const q=query(collection(db,'BusinessList'),where('category','==',category)); 
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        console.log(doc.data())
        setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
      })
  }   

  return (
    <View style={{
      padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>Explore more</Text>

      {/* {search bar} */}
      <View style={{
            display:'flex',
            flexDirection:'row',
            gap:10,
            backgroundColor:"#fff",
            alignItems:'center',
            padding:8,
            marginVertical:12,
            borderRadius:20
        }}>
            <FontAwesome name="search" size={24} color="black" style={{
                marginLeft:5
            }} 
            />
            <TextInput placeholder='search...' style={{
                fontFamily:"outfit",
                fontSize:16,
                paddingLeft:6
            }} 
            />
        </View>

      {/* { Category} */}
        <Category
        Explore={true}
        onCategorySelect={(category)=>GetBusinessByCategory(category)}
        />

      {/* {Business List} */}
      <ExploreBusinessList businessList={businessList}/>
    </View> 
  )
} 