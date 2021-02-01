import { useTheme } from '@react-navigation/native'
import React, { useState,useEffect } from 'react'
import {View,Text,Image,ScrollView,TouchableOpacity,FlatList} from 'react-native'
import { fakeProductData } from '../../constants/fakeData'



export const Popular = ({navigation}) =>{

    const [data,setData] = useState([])
    const {colors} = useTheme()

    useEffect(()=>{
        setData(fakeProductData)
    },[data])

    const renderItem = ({item})=>{
        return(
            <TouchableOpacity onPress={()=>navigation.navigate('RecipeDetail',{
                product:item
            })}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <View style={{flexDirection:"column"}}>
                <View style={{width:310,height:180,marginRight:15,position:"relative"}}>
                    <Image source={item.img} resizeMode="cover" style={{width:'100%',borderRadius:10,height:'100%'}}/>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{color: colors.text,fontSize:20}}>{item.title}</Text>
                    {/* <Text style={{color: colors.text,fontSize:15,width:310,marginVertical:8}}>{item.description}</Text> */}
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Text style={{color:colors.text,fontSize:20}}>Цена:</Text>                        
                        <Text style={{color:'#077f7b',fontSize:21,fontWeight:"bold",marginLeft:8}}>${item.price}</Text>
                    </View>
                </View>
            </View>
        </View>
            </TouchableOpacity>
        )
    }

    return(
            <View style={{marginTop:10,flexDirection:"column",justifyContent:'space-between'}}>
            <Text style={{fontSize:20,fontWeight:"bold",marginBottom:20,color:colors.text}}>Популярное</Text>
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