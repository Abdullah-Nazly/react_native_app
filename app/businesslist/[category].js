import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';

export default function BusinessListByCategory() {

    const navigation=useNavigation();
    const {category} = useLocalSearchParams();

    const [businessList,setBusinessList] = useState([]);
    const [loading,setLoading] = useState(false)
    useEffect(() =>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:category
        });
        getBusinessList()
    }, []);

    // Used to get business list by category

    const getBusinessList=async()=>{
        setLoading(true)
        const q=query(collection(db,'BusinessList'),where("category",'==',category));
        const querySnapshot = await getDocs(q);

        querySnapshot.array.forEach((doc) => {
            console.log(doc.data());
            setBusinessList(prev => [...prev,{id:doc?.id, ... doc.data()}])
        })
        setLoading(false);
    }

  return (
    <View>
        {businessList?.length>0 && loading==false?
      <FlatList
        data={businessList}
        onRefresh={getBusinessList}
        refreshing={loading}
        renderItem={({item,index})=> (
            <BusinessListCard
                businsess={item}
                key={index}
            />
        )}
        />:
        loading?<ActivityIndicator
        style={{
            marginTop:'60%'
        }}
            size={'large'}
            color={Colors.Primary}
        />:
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20,
            color:Colors.GRAY,
            textAlign:'center',
            marginTop:'50%'
        }}>No Business Found</Text>
    }
    </View>
  )
}