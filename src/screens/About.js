import { useTheme } from '@react-navigation/native'
import React from 'react'
import {View,Text} from 'react-native'

export const About = () =>{

    const {colors} = useTheme()

    return(
        <View style={{flexDirection:"column",alignItems:"center",marginTop:'50%'}}>
            <Text style={{color:colors.text,fontSize:20}}>
                Created by: <Text style={{fontWeight:"bold"}}>Tuychiev Damir</Text>
            </Text>
            <Text style={{color:colors.text,fontSize:20}}>
                Email:<Text style={{fontWeight:"bold"}}>damirtuy2323@gmail.com</Text>
            </Text>
        </View>
    )
}