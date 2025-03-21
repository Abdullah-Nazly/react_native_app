import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser(); 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
    
  return (
    <View>
        <View stye={{
            display:"flex",
            alignItems:"center",
            marginTop:60
        }}>
            <Image source={require('../assets/images/login.jpg')}
                style ={{
                    height:500,
                    width:400,
                    borderRadius:20,
                    borderWidth:3,
                    borderColor:"black",
                }}
            />
        </View>
        <View style={styles.subContainer}>
            <Text style={{
                fontSize:35,
                fontFamily:"outfit-bold",
                textAlign:"center"
            }}>Your Ultimate
                <Text style={{
                    color:Colors.Primary
                }}> Community Business Directory </Text>App
            </Text>
            <Text style={{
                fontSize:15,
                fontFamily:"outfit",
                textAlign:"center",
                marginVertical:15,
                color:Colors.GRAY
            }}>
                Find your favourite business near you and post yuor own business to your community
            </Text>
            <TouchableOpacity style={styles.btn}
            onPress={onPress}
            >
                <Text style={{
                    textAlign:"center",
                    color:"#fff",
                    fontFamily:"outfit",
                    padding:8
                }}>Let's get started</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    subContainer:{
        backgroundColor:"#fff",
        padding:20,
        marginTop:-20,
    },

    btn:{
        backgroundColor:Colors.Primary,
        padding:6,
        borderRadius:99,
        marginTop:10
    }
})






















