import React from 'react'
import {View,Text,Image,TextInput,TouchableOpacity,Dimensions} from 'react-native'
import {useTheme} from '@react-navigation/native'
import { useSelector } from 'react-redux'

export const Header = () =>{

    const {colors} = useTheme()

    const {name,sex} = useSelector(state=>state.user.data)

    const {width} = Dimensions.get('screen')

    return(
        <View style={{flexDirection:"column"}}>

            {/* Greetings */}
        
            <View style={{width,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <View>
                <Text style={{fontSize:28,fontWeight:"bold",color:colors.text}}>Привет {"\n"}{name}</Text>
                </View>
                <View style={{marginLeft:10}}>
                    {sex.title === 'Женский' ? <Image style={{borderRadius:5}} source={require('../../../assets/Image/female.png')} resizeMode="contain" style={{width:100,height:70}}/>:<Image style={{borderRadius:5}} source={require('../../../assets/Image/male.png')} resizeMode="contain" style={{width:100,height:70}}/>}
                </View>
            </View>

            {/* Search */}

            

        </View>
    )
}