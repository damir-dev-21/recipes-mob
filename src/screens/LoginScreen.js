import React, { useState } from 'react'
import { Image, Text, View,StatusBar, StyleSheet, TextInput, TouchableOpacity,Dimensions,Alert } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Feather from '@expo/vector-icons/Feather'

import * as Animatable from 'react-native-animatable'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export const LoginScreen = ({navigation}) =>{

    const {isReg} = useSelector(state=>state.user)

    const {width,height} = Dimensions.get('screen')
    const theme = useTheme()

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    const [data,setData] = React.useState({
        email:'',
        password:'',
        name:'',
        check_emailEntry:false,
        secureTextEntry:true,
        isValidName:true,
        isValidEmail:true,
        isValudPassword:true,
        isValidForm:false
    })

    function validateEmail(value){
        return re.test(value)
    }


    const changeHandleName = (text) =>{
        if(text.trim().length >= 4){
            setData({
                ...data,
                name:text,
                isValidName:true
            })
        }else{
            setData({
                ...data,
                name:text,
                isValidName:false
            })
        }
    }

    const setDataRegister = () =>{
        const newData = {
            name:data.name,
            email:data.email,
            password:data.password,
        }

        setData({
            email:'',
            password:'',
            name:'',
            check_emailEntry:false,
            secureTextEntry:true,
            isValidName:true,
            isValidEmail:true,
            isValudPassword:true,
            isValidForm:true
        })

        navigation.navigate('Home')
    }   


    const changeHandleEmail = (text) =>{
        
        if(re.test(text)){
            setData({
                ...data,
                email:text,
                isValidEmail:true
            })
        }else{
            setData({
                ...data,
                email:text,
                isValidEmail:false
            })
        }
        
    }

    const changeHandlePassword = (text) =>{
        if(text.trim().length >= 6){
            setData({
                ...data,
                password:text,
                isValudPassword:true
            })
        }else{
            setData({
                ...data,
                password:text,
                isValudPassword:false
            })
        }
    }

    const updateSecureEntry = () =>{
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const handleValidName = (value) =>{
        if(value.trim().length >= 4){
            setData({
                ...data,
                isValidName:true
            })
        }else{
            setData({
                ...data,
                isValidName:false
            })
        }
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="light-content"/>
            <View style={styles.header}>
                <Animatable.Image animation="pulse" duration={1500}  source={require('../../assets/Image/login.png')} style={{width:'100%',height:190}} resizeMode="cover"/>
            </View>
            <Animatable.View animation="fadeInUpBig" style={[styles.footer,{backgroundColor:theme.dark? theme.colors.background : '#077f7b'}]}>
                <Text style={{color:'#fff',fontSize:18}}>Имя:</Text>
                <View style={{flexDirection:'row',alignItems:"center",borderBottomWidth:2,borderBottomColor:'#fff'}}>
                    <FontAwesome name="user-o" color="white" size={20}/>
                    <TextInput onEndEditing={e=>handleValidName(e.nativeEvent.text)} style={{padding:10,color:'#fff',textDecorationLine:"none",width:'100%'}} value={data.name} onChangeText={(text)=>changeHandleName(text)} placeholder="Введите ваше имя" placeholderTextColor="white" autoCapitalize="none" />
                </View>

                {data.isValidName ? null :
                <Text style={{color:'red',fontSize:16}}>Имя должно содержать не менее 4 символов</Text>                
                }

                <Text style={{color:'#fff',fontSize:18,marginTop:10}}>Email:</Text>
                <View style={{flexDirection:'row',alignItems:"center",borderBottomWidth:2,borderBottomColor:'#fff'}}>
                    <FontAwesome name="envelope-o" size={20} color="white" />
                    <TextInput 
                        style={{padding:10,color:'#fff',textDecorationLine:"none",width:'100%'}} 
                        value={data.email} 
                        onChangeText={(text)=>changeHandleEmail(text)} 
                        placeholder="Введите email" 
                        placeholderTextColor="white" 
                        autoCapitalize="none" />
                </View>
                {data.isValidEmail ? null : 
                <Text style={{color:'red',fontSize:16}}>Email не валидный</Text>
                }


                <Text style={{color:'#fff',fontSize:18,marginTop:20}}>Пароль:</Text>
                <View style={{flexDirection:'row',alignItems:"center",borderBottomWidth:2,borderBottomColor:'#fff'}}>
                    <FontAwesome name="lock" size={20} color="white" />
                    <TextInput secureTextEntry={data.secureTextEntry} style={{padding:10,color:'#fff',textDecorationLine:"none",width:'90%'}} value={data.password} onChangeText={(text)=>changeHandlePassword(text)} placeholder="Введите пароль" placeholderTextColor="white" autoCapitalize="none" />
                    <TouchableOpacity style={{width:'20%'}} onPress={updateSecureEntry}>
                        {data.secureTextEntry ? 
                            <Feather name="eye-off" color="#fff" size={20}/> 
                        : 
                            <Feather name="eye" color="#fff" size={20}/>
                        }
                    </TouchableOpacity>
                </View>
                {data.isValudPassword ? null : 
                <Text style={{color:'red',fontSize:16}}>Пароль должен содержать не менее 6 символов</Text>
                }


                <View style={{flexDirection:"column",marginTop:30}}>
                        <TouchableOpacity onPress={setDataRegister}>
                            <View style={{backgroundColor:'#fff',width:'100%',height:50,borderRadius:10}}>
                                <Text style={{textAlign:"center",lineHeight:50,fontSize:17}}>Войти</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection:"row",justifyContent:"center",marginTop:15,alignItems:"center"}}>
                            <Text style={{color:'black',fontSize:16}}>Нет аккаунта ?</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('Regis')}>
                                <Text style={{color:'white',fontSize:16,marginLeft:10}}>
                                    Зарегистрируйтесь
                                </Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    header:{
        flex:1,
        paddingHorizontal:20,
        paddingBottom:50        
    },
    footer:{
        flex:3,
        // backgroundColor:'#077f7b',
        paddingHorizontal:20,
        paddingVertical:30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    unActiveSex:{
        backgroundColor:'#077f7b',marginRight:8,borderWidth:1,borderColor:'black',padding:8,borderRadius:5        
    },
    activeSex:{
        backgroundColor:'#077f7b',marginRight:8,borderWidth:1,borderColor:'white',padding:8,borderRadius:5        
    }
})