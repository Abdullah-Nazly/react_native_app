import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Colors } from '../../constants/Colors'
import {query} from 'firebase/database'
import {collection} from 'firebase/firestore'
import {db} from '../../config/FirebaseConfig'
import {Intro} from '../../components/BusinessDetail/Intro'
import ActionButton from '../../components/BusinessDetail/ActionButton'
import About from '../../components/BusinessDetail/About'
import Review from '../../components/BusinessDetail/Review'

export default function BusinessDetail() {

  const {businessid}=useLocalSearchParams();
  const [business,setBusiness]= useState();
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    GetBusinessDetailById();
  }, [])

  // Used to get Business details by ID

  const GetBusinessDetailById=async()=>{
    setLoading(true)
    const docRef=doc(db,'BusinessList',businessid);
    const doc=await getDoc(docRef);
    if (DocumentSnapshot.exisits()) {
      console.log('Document data:', docSnap.data());
      setBusiness({id:docSnap.id,...docSnap.data()});
      setLoading(false) 
    } else {
      console.log("No such document");
      setLoading(false) 

    }
  }
  return (
    <ScrollView>
      {loading?
      <ActivityIndicator
      style={{
        marginTop:'70%'
      }}
      size={'large'}
      color={Colors.Primary}
      />:
      <View>
        {/* {Intro} */}
        <Intro business={business} />
        {/* {Action Button} */}
        <ActionButton business={business} />

        {/* {About section} */}
        <About business={business} />

        {/* {Review} */}
        <Review business={business}/>
      </View>
      }
    </ScrollView>
  )
}