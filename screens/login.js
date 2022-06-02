import React, { useState } from 'react'
import { View,ScrollView, ImageBackground, Dimensions, Text, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto';
import { Button,FormControl, Input, NativeBaseProvider} from 'native-base';
import Feather  from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {


    const [seePass,setSeepass] = useState(true);

    const [LoginObj, setLoginObj] = useState({})


    const Login = () => {
        console.log(LoginObj)
        auth()
            .signInWithEmailAndPassword(LoginObj.email, LoginObj.password)
            .then((user) => {
                ToastAndroid.show("User Logged In !", ToastAndroid.SHORT);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }


    const pass = () =>{
        if(seePass){
            setSeepass(false)
        }
        else if(seePass == false){
            setSeepass(true)
        }
    }

    const onSignup = (e) => {
        navigation.navigate('signup')
     }


    return (
        <NativeBaseProvider>

        <ScrollView style={{flex:1,backgroundColor:'#fff'}} showsVerticalScrollIndicator={false}>
            <ImageBackground
             source={require('../Images/backgroundImage.jpg')}
             style={{height:Dimensions.get('window').height / 2.5}}
            >
                <View style={styles.brandView}>
                    
                    <Text>
                      <Icon name='hipchat' color={'#fff'} size={100} />
                    </Text>
                    <Text style={styles.brandViewText}>CHAT APP</Text>
                </View>
            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{padding:40}}>
                    <Text style={{color:'#4632A1',fontSize:19}}>Welcome To Chat App</Text>
                    <Text style={{color:'black',marginTop:10}}>
                        Don't have an account?
                            <TouchableOpacity style={{marginTop:12}} onPress={(e) => onSignup(e)}>
                        <Text style={{color:'red',fontStyle:'italic'}}>
                            Register now

                        </Text>
                            </TouchableOpacity>
                    </Text>
                    <View style={{marginTop:50}}>
                        <FormControl style={{borderColor:'#4632A1'}}>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input onChangeText={(e) => setLoginObj({ ...LoginObj, email: e })} style={{marginTop:-10}}  keyboardType="email-address"  variant="underlined"  placeholder="Enter your email"   />
                        </FormControl>
                        <FormControl style={{borderColor:'#4632A1',marginTop:10}}>
                            <FormControl.Label>Password</FormControl.Label>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Input onChangeText={(e) => setLoginObj({ ...LoginObj, password: e })} secureTextEntry={seePass} style={{marginTop:-10,width:'100%'}} variant="underlined"  placeholder="********"  />
                            <TouchableOpacity onPress={pass} style={{marginLeft:'-20%'}}>
                                {seePass ? <Feather name='eye-off' style={{color:'black',fontSize:16}} />:<Feather name='eye' style={{color:'black',fontSize:16}} />}
                                
                            </TouchableOpacity>
                            </View>
                            
                        </FormControl>
                    </View>
                    <View style={{height:100,justifyContent:'center',alignItems:'center'}}>
                        <Button onPress={Login}   style={styles.Btn}>
                            <Text style={{color:'#fff'}}>Login</Text>
                        </Button>
                        
                        
                    </View>
                </View>
            </View>

        </ScrollView>
        </NativeBaseProvider>

    );
};

export default Login;

const styles = StyleSheet.create({
   brandView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
   }, 
   brandViewText:{
       color:'#fff',
       fontSize: 35,
       fontWeight:'bold',
       textTransform:'uppercase',
       marginTop:10,
   },
   bottomView:{
        flex:1.5,
        backgroundColor:'#fff',
        bottom:60,
        borderTopStartRadius:60,
        borderTopEndRadius:60
   },
   Btn:{
    alignSelf:'center',
    borderColor:'#3A208E' ,
    width: Dimensions.get('window').width / 2,
    justifyContent:'center'
   }

   
});
