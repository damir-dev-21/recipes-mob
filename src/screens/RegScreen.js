import React, { useState } from 'react'
import { Image, Text, View,StatusBar, StyleSheet, TextInput, TouchableOpacity,Dimensions } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Feather from '@expo/vector-icons/Feather'

import * as Animatable from 'react-native-animatable'
import { useTheme } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setUserData } from '../store/actions/user'

export const RegScreen = ({navigation}) =>{

    const dispatch = useDispatch();

    const {width,height} = Dimensions.get('screen')
    const theme = useTheme();
    const sexData = [{title:'Мужской',id:1},
    {title:'Женский',id:2},]

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const selectSex = sexData.find(item=>item.id === 1)

    const [data,setData] = React.useState({
        email:'',
        password:'',
        name:'',
        check_emailEntry:false,
        secureTextEntry:true,
        validEmail:true,
        validPassword:true,
        validName:true,
        validForm:false
    })


    
    const [sex,setSex] = React.useState(selectSex)
    const [changeSex,setChangeSex] = React.useState(1)



    const changeHandleName = (text) =>{
        if(text.trim().length >= 4){
            setData({
                ...data,
                name:text,
                validName:true
            })
        }else{
            setData({
                ...data,
                name:text,
                validName:false
            })
        }
    }

    const setDataRegister = () =>{
        const newData = {
            name:data.name,
            email:data.email,
            password:data.password,
            sex:sex,
            isReg:true
        }

        setData({
            email:'',
            password:'',
            name:'',
            check_emailEntry:false,
            secureTextEntry:true,
            validEmail:true,
            validPassword:true,
            validName:true,
            validForm:true
        })
        setChangeSex(1)
        setSex(selectSex)

        dispatch(setUserData(newData))
        navigation.navigate('Login')  

    }

    const setHandlerSex = (item,id) =>{
        setSex(item)
        setChangeSex(id)
    }

    const changeHandleEmail = (text) =>{
        if(re.test(text)){
            setData({
                ...data,
                validEmail:true,
                email:text
            })
        }else{
            setData({
                ...data,
                validEmail:false,
                email:text
            })
        }
    }

    const changeHandlePassword = (text) =>{
        if(text.trim().length >= 6){
            setData({
                ...data,
                validPassword:true,
                password:text
            })
        }else{
            setData({
                ...data,
                validPassword:false,
                password:text
            })
        }
    }

    const updateSecureEntry = () =>{
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="light-content"/>
            <View style={styles.header}>
                <Animatable.Image animation="pulse" duration={1500}  source={require('../../assets/Image/reg.png')} style={{width:'100%',height:190}} resizeMode="cover"/>
            </View>
            <Animatable.View animation="fadeInUpBig" style={[styles.footer,{backgroundColor: theme.dark?theme.colors.background : '#077f7b'}]}>
                <Text style={{color:'#fff',fontSize:18}}>Имя:</Text>
                <View style={{flexDirection:'row',alignItems:"center",borderBottomWidth:2,borderBottomColor:'#fff'}}>
                    <FontAwesome name="user-o" color="white" size={20}/>
                    <TextInput style={{padding:10,color:'#fff',textDecorationLine:"none",width:'100%'}} value={data.name} onChangeText={(text)=>changeHandleName(text)} placeholder="Введите ваше имя" placeholderTextColor="white" autoCapitalize="none" />
                </View>
                {data.validName ? null : <Text style={{color:'red',fontSize:17}}>Имя должно содержать не менее 4 символов</Text>}

                <Text style={{color:'#fff',fontSize:18,marginTop:20}}>Email:</Text>
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
                {data.validEmail ? null : <Text style={{color:'red',fontSize:17}}>Email не валидный</Text>}


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
                {data.validPassword ? null : <Text style={{color:'red',fontSize:17}}>Пароль должен содержать не менее 8 символов</Text>}


                <View style={{flexDirection:'row',marginTop:20,alignItems:"center",justifyContent:"space-between"}}>
                <Text style={{color:'#fff',fontSize:18}}>Пол:</Text>                
                <View style={{marginTop:10,flexDirection:"row",alignItems:"center"}}>

                        {sexData.map((_,index)=>{
                            return(
                                <TouchableOpacity key={_.id} onPress={()=>setHandlerSex(_,_.id)}>
                                    {changeSex === _.id && 
                                    <View style={[styles.activeSex,{backgroundColor: theme.dark?theme.colors.background : '#077f7b'}]}>
                                        <Text style={{color:'white'}}>{_.title}</Text>
                                    </View>}
                                    {changeSex !== _.id && 
                                    <View style={[styles.unActiveSex,{backgroundColor: theme.dark?theme.colors.background : '#077f7b'}]}>
                                        <Text style={{color:'black'}}>{_.title}</Text>
                                    </View>}
                                </TouchableOpacity>
                            )
                        })}
                </View> 
                </View>

                <View style={{flexDirection:"column",marginTop:30}}>
                        
                        <TouchableOpacity onPress={setDataRegister}>
                            <View  style={{backgroundColor:'#fff',width:'100%',height:50,borderRadius:10}}>
                                <Text style={{textAlign:"center",lineHeight:50,fontSize:17}}>Зарегистрироваться</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection:"row",justifyContent:"center",marginTop:15,alignItems:"center"}}>
                            <Text style={{color:'black',fontSize:16}}>Уже есть аккаунт ?</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                                <Text style={{color:'white',fontSize:16,marginLeft:10}}>
                                    Войти
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