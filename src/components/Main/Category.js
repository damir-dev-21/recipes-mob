import { useTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {View,Text,Image,TextInput,TouchableOpacity,FlatList} from 'react-native'
import { fakeCategoryData } from '../../constants/fakeData'

export const Category = () =>{

    const [data,setData] = useState([])
    const {colors} = useTheme()

    useEffect(()=>{
        setData(fakeCategoryData)
    },[data])


    const renderItem = ({item})=>{
        return(
            <View style={{flexDirection:"row",justifyContent:"space-between",width:90}}>
                <View style={{flexDirection:"column",alignItems:"center"}}>
                <View style={{backgroundColor:'#f3f4f7',width:70,height:70,alignItems:"center",borderRadius:100}}>
                <Image source={item.img} resizeMode="cover" style={{
                        width:75,
                        height:75,
                        position:"absolute",
                        top:-0
                }}/>
                </View>
                
            </View>
            </View>
        )
    }

    return(
        <View style={{flexDirection:"column",justifyContent:'space-between',marginVertical:20}}>
            <Text style={{fontSize:20,fontWeight:"bold",marginBottom:20,color:colors.text}}>Категорий</Text>
            <FlatList
                data={data}
                keyExtractor={item=>`${item.id}`}
                horizontal
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}