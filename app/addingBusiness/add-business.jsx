import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {db} from '../../config/FirebaseConfig'
import { collection } from 'firebase/firestore';


export default function add_business() {
    const navigation=useNavigation();
    const [image,setimage] = useState(null);
    const [categoryList,setCategoryList] = useState([]);
    const {user}=useUser();
    const [name,setName] = useState();
    const [address,setAddress] = useState();
    const [website,setWebsite] = useState();
    const [Contact,setContact] = useState();
    const [About,setAbout] = useState();
    const [Category,setCategory] = useState();
    const [loading,setLoading] = useState(false);


    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Add New Business',
            headerShown:true,
        })
        getCategoryList();
    },[])

    const onImagePick=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
          setimage(result?.assets[0].uri);
    }

    const getCategoryList=async()=>{
      setCategoryList([])
      const q=query(collection(db,'Category'));
      const snapShot=await getDocs(q);

      snapShot.forEach((db) =>{
        setCategoryList(prev=>[...prev,{
            label:(doc.data()).name,
            value:(doc.data()).name
        }])
      })
    }

    const onAddNewBusiness=async()=>{
      setLoading(true);
      const fileName=Date.now().toString()+".jpg";
      const resp=await fetch(image);
      const blob=await resp.blob();

      const imageRef = ref(storage,'My-App/'+fileName);
      uploadBytes(imageRef,blob).then((snapShot)=>{
        console.log("file uploaded...  ")
      }).then(resp=>{
        getDownloadURL(imageRef).then(async(downloadUrl)=>{
          console.log(downloadUrl);
          saveBusinessDetails(downloadUrl)
        })
      })
      setLoading(false)
    }

    const saveBusinessDetails=async(imageUrl) => {
      await setDoc(doc(db,'BusinessList',Date.now().toString()), {
        name:name,
        address:address,
        Contact:Contact,
        About:About,
        website:website,
        category:Category,
        username:user?.fullName,
        userEmail:user?.primaryEmailAddress?.emailAddresses,
        userImage:user?.imageUrl,
        imageUrl:imageUrl
      })
      setLoading(false)
      ToastAndroid.show('New Business added...  ',ToastAndroid.LONG)

    }

  return ( 
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25 
      }}>Add New Business</Text>
      <Text style={{
        fontFamily:'outfit',
        color:Colors.GRAY
      }}>Fill all the details to add a new business</Text>
      <TouchableOpacity style={{
        marginTop:20
      }}
      onPress={()=>onImagePick()}
      >
      {!image? <Image source={require('../../assets/images/placeholder.png')}
        style={{
            width:100,
            height:100
        }}
      />
      :
      <Image source={{uri:image}}
        style={{
            width:100,
            height:100,
            borderRadius:15
        }}
        />}
      </TouchableOpacity>

      <View>
        <TextInput placeholder='Name'
        onChangeText={(v) => setName(v)}
            style={{
                padding:10,
                borderWidth:1,
                borderRadius:5,
                fontSize:17,
                backgroundColor:'#fff',
                marginTop:10,
                borderColor:Colors.Primary,
                fontFamily:'outfit'
            }}
        /> 
        <TextInput placeholder='Address'
          onChangeText={(v) => setAddress(v)}
          style={{
              padding:10,
              borderWidth:1,
              borderRadius:5,
              fontSize:17,
              backgroundColor:'#fff',
              marginTop:10,
              borderColor:Colors.Primary,
              fontFamily:'outfit'
          }}
        /> 
        <TextInput placeholder='Contact'
          onChangeText={(v) => setContact(v)}
          style={{
              padding:10,
              borderWidth:1,
              borderRadius:5,
              fontSize:17,
              backgroundColor:'#fff',
              marginTop:10,
              borderColor:Colors.Primary,
              fontFamily:'outfit'
          }}
        /> <TextInput placeholder='website'
          onChangeText={(v) => setWebsite(v)}
            style={{
                padding:10,
                borderWidth:1,
                borderRadius:5,
                fontSize:17,
                backgroundColor:'#fff',
                marginTop:10,
                borderColor:Colors.Primary,
                fontFamily:'outfit'
            }}
        />
         <TextInput placeholder='About'
            onChangeText={(v) => setAbout(v)}
         multiline
         numberOfLines={3}
            style={{
                padding:10,
                borderWidth:1,
                borderRadius:5,
                fontSize:17,
                backgroundColor:'#fff',
                marginTop:10,
                borderColor:Colors.Primary,
                fontFamily:'outfit',
                height:100
            }}
        />
        <View styel={{
          borderWidth:1,
          borderRadius:5,
          backgroundColor:'#fff',
          marginTop:10,
          borderColor:Colors.Primary,
        }}>
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={categoryList}
        />
        </View>
      </View>
      <TouchableOpacity 
      disabled={loading}
      style={{
        padding:15,
        backgroundColor:Colors.Primary,
        borderRadius:5,
        marginTop:20
      }}
      onPress={()=>onAddNewBusiness()}
      >
        {loading?
        <ActivityIndicator size={'large'} color={'#fff'}/>:
        <Text style={{
          textAlign:'center',
          fontFamily:'outfit-medium',
          color:'#ffffff'
        }}>Add New Business</Text>}
      </TouchableOpacity>
    </View> 
  )
} 