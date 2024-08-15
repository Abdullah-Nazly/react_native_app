import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function MenuList() {

    const {signOut} = useAuth()
    const menuList=[
        {
            id:1,
            name:'Add Business',
            icon:require(''),
            path:'/addingBusiness/add-business'
        },
        {
            id:2,
            name:'My Business',
            icon:require(''),
            path:'/addingBusiness/my-business'
        },
        {
            id:3,
            name:'Share App',
            icon:require(''),
            path:'share'
        }, 
        {
            id:4,
            name:'Log out',
            icon:require(''),
            path:'logout'
        },
    ]

    const router=useRouter()

    const onMenuClick=(item)=>{
        if(item.path=='logout')
        {
            signOut();
            return;
        }
        if(item.path=='share')
        {
            Share.share(
                {
                    message:'Download the Business Directory App, Download URL:'
                }
                )
            return;
        }
        router.push(item.path)
    }

  return (
    <View style={{
        marginTop:50
    }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>onMenuClick(item)}
            style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:10,
                flex:1,
                padding:10,
                borderRadius:15,
                borderWidth:1,
                margin:10,
                backgroundColor:'#fff',
                borderColor:Colors.Primary
            }}>
                <Image source={item.icon}
                    style={{
                        width:50,
                        height:50
                    }}
                />
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:20,
                    display:'flex'
                }}
                >{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    <Text style={{
        fontFamily:'outfit',
        textAlign:'center',
        marginTop:50,
        color:Colors.GRAY
    }}>Developed by Opstimus</Text>
    </View>
  )
}