import React, { useState } from 'react'
import { View,ScrollView, ImageBackground, Dimensions, Text, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto';
import { Button,FormControl, Input, NativeBaseProvider} from 'native-base';
import Feather  from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


const reference = database().ref('/users/');


const SignUp = ({navigation}) => {

    const [signUpObj, setSignUpObj] = useState({})


    const [seePass,setSeepass] = useState(true);

    const pass = () =>{
        if(seePass){
            setSeepass(false)
        }
        else if(seePass == false){
            setSeepass(true)
        }
    }

    const signUp = () => {
        console.log(signUpObj)
        auth()
            .createUserWithEmailAndPassword(signUpObj.email, signUpObj.password)
            .then((user) => {
                ToastAndroid.show("User Created !", ToastAndroid.SHORT);
                signUpObj.uid = user.user.uid
                reference.child(signUpObj.uid).set(signUpObj).then(() => {
                    console.log('Data Saved in Database Succesfully')
                })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    ToastAndroid.show("This email is already used !", ToastAndroid.SHORT);
                }

                if (error.code === 'auth/invalid-email') {
                    ToastAndroid.show("Email address is invalid !", ToastAndroid.SHORT);
                }

                console.error(error);
            });
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
                        Have an account?
                            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                        <Text style={{color:'red',fontStyle:'italic'}}>
                            Login now
                        </Text>
                            </TouchableOpacity>
                    </Text>
                    <View style={{marginTop:50}}>
                        <FormControl style={{borderColor:'#4632A1',marginTop:-20}}>
                            <FormControl.Label>Full name</FormControl.Label>
                            <Input style={{marginTop:-10}} onChangeText={(e) => setSignUpObj({ ...signUpObj, name: e })}   variant="underlined"  placeholder="Enter your fullname"   />
                        </FormControl>
                        <FormControl style={{borderColor:'#4632A1',marginTop:10}}>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input  keyboardType="email-address" onChangeText={(e) => setSignUpObj({ ...signUpObj, email: e })}  variant="underlined"  placeholder="Enter your email"   />
                        </FormControl>
                        <FormControl style={{borderColor:'#4632A1',marginTop:10}}>
                            <FormControl.Label>Password</FormControl.Label>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Input secureTextEntry={seePass} style={{marginTop:-10,width:'100%'}}  onChangeText={(e) => setSignUpObj({ ...signUpObj, password: e })} variant="underlined"  placeholder="********"  />
                            <TouchableOpacity onPress={pass} style={{marginLeft:'-20%'}}>
                                {seePass ? <Feather name='eye-off' style={{color:'black',fontSize:16}} />:<Feather name='eye' style={{color:'black',fontSize:16}} />}
                                
                            </TouchableOpacity>
                            </View>
                            
                        </FormControl>
                    </View>
                    <View style={{height:100,justifyContent:'center',alignItems:'center'}}>
                        <Button onPress={signUp} style={styles.Btn}>
                            <Text style={{color:'#fff'}}>Sign Up</Text>
                        </Button>
                        
                        
                    </View>
                </View>
            </View>

        </ScrollView>
        </NativeBaseProvider>

    );
};

export default SignUp;

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
