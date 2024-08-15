import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import Category from './Category'

export default function CategoryItem({category, onCategoryPress}) {
  return (
    
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
        <View style ={{
            padding:15,
            backgroundColor:Colors.dark,
            borderRadius:99, 
            marginRight:15
            
        }}>
            <Image source={{uri:category.icon}} 
            style={{
                height:40,
                width:40,}}
            />
        </View>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:12,
            textAlign:'center',
            marginTop:5
        }}>{category.name}</Text>
    </TouchableOpacity>
  )
}