import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';


export default function intro({business}) {
    const router=useRouter();
    const{user}=useUser();
    const OnDelete=()=>{
        Alert.alert('Do you want to delete','Do you really want to Delete?',[
            {
                text:'Cancel',
                style:'cancel',
            },
            {
                text:'Delete',
                style:'destructive',
                onPress:()=>deleteBusiness()
            }
        ])
    }

    const deleteBusiness=async()=>{
        console.log('delete business');
        await deleteDoc(doc(db,'BusinessList',business?.id));
        router.back();
        ToastAndroid.show('Business Deleted',ToastAndroid.LONG)
    }

  return (
    <View>
        <View style={{
            position:'absolute',
            zIndex:10,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',
            padding:20 
        }}>
            <TouchableOpacity onPress={()=>router.back()}>
               <Feather name="arrow-left-circle" size={24} color="black" />
            </TouchableOpacity>
            <AntDesign name="heart" size={24} color="black" />
        </View>
        <Image source={{uri:business?.imageUrl}}
            style={{
                width:'100%',
                height:340
            }}
        />
        <View style={{
            display:'flex',
            flexDirection:'row',
            backgroundColor:'#fff',
            padding:20,
            marginTop:-20,
            borderRadius:25,
            justifyContent:'space-between'
        }}>
        <View style={{
            padding:20,
            marginTop:-20,
            backgroundColor:'#fff',
            borderRadius:25
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:26,
                display:'flex',
                flexDirection:'row'
            }}>{business?.name}
            </Text> 
            <Text styel ={{
                fontFamily:'outfit',
                fontSize:18,
            }}>{business?.address}</Text>
        </View>
        {user?.primaryEmailAddress?.emailAddress==business?.userEmail&&
        <TouchableOpacity onPress={()=>OnDelete()}>
            <Ionicons name="trash" size={24} color="black" />
        </TouchableOpacity>}
        </View>
    </View>
  )
}