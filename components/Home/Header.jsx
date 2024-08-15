import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
    const {user} = useUser();
  return (
    <View style={{
        padding:20,
        paddingTop:40,
        backgroundColor:Colors.Primary,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10
        }}>
            <Image source={{uri:user?.imageUrl}}
                style={{
                    width:45,
                    height:45,
                    borderRadius:99
            }}
            />
            <View>
                <Text style={{
                    color:'white'
                }}>Welcome,</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:19,
                    color:'white'
                }}>{user?.fullName}</Text>
            </View>
        </View>
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
    </View>
  )
}