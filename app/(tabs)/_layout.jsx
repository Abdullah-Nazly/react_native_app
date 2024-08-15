import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:Colors.Primary
      
      }}>
        <Tabs.Screen name='Home'
        options={{
          tabBarLabel:'Home',
          tabBarIcon:({color}) => <FontAwesome name="home" size={25} color={color} />
        }}
        />
        <Tabs.Screen name='Explore'
        options={{
          tabBarLabel:'Explore',
          tabBarIcon:({color}) => <FontAwesome name="search" size={25} color={color} />
        }}
        />
        <Tabs.Screen name='Profile'
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color}) => <MaterialIcons name="account-circle" size={25} color={color} />
        }}
        /> 
    </Tabs>
  )
}