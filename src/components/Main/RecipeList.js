import React, { useEffect, useState } from 'react'
import { View ,FlatList,Image,Text} from 'react-native'
import { fakeProductData } from '../../constants/fakeData';
import { List } from './List';
import {useTheme} from '@react-navigation/native'

export const RecipeList = ({navigation}) =>{

    const [products,setProducts] = useState([]);
    const {colors} = useTheme()

    useEffect(()=>{
        setProducts(fakeProductData);
    },[products])

   
    return(
        <View style={{marginTop:25}}>
            <Text style={{fontSize:20,fontWeight:"bold",marginBottom:20,color:colors.text}}>Рецепты</Text>
            {products.map((item,index)=>{
                return(
                    <List
                        product={item}
                        key={index}
                        navigation={navigation}
                    />
                )
            })}
        </View>
    )
}