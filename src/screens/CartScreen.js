import React, { useEffect, useState } from 'react'
import { Text,View,TextInput,TouchableOpacity,Image, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import {useTheme}  from '@react-navigation/native'

export const CartScreen = () =>{
    
    const cartReducer = useSelector(state=>state.cart.cart)
    const totalPrice = useSelector(state=>state.cart.totalPrice)
    const totalCount = useSelector(state=>state.cart.totalCount)
    const [cart,setCart] = useState([])

    const {colors} = useTheme()

    useEffect(()=>{
        setCart(cartReducer)
    },[cart])


    const renderItem = ({item}) => {
        return(
            <View style={{marginVertical:20,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <View>
                    <Image source={item.img} resizeMode="cover" style={{width:100,height:100,borderRadius:30}}/>
                </View>
                <View style={{width:'60%',flexDirection:"column",alignItems:"flex-start"}}>
                    <Text style={{fontSize:15,color:colors.text}}><Text style={{fontWeight:"bold",fontSize:16,color:colors.text}}>Название</Text>: {item.title}</Text>
                    <Text style={{fontSize:15,color:colors.text}}><Text style={{fontWeight:"bold",fontSize:16,color:colors.text}}>Цена</Text>: {item.price}$</Text>
                    <Text style={{fontSize:15,color:colors.text}}><Text style={{fontWeight:"bold",fontSize:16,color:colors.text}}>Кол-во</Text>: {item.count}</Text>
                </View>
            </View>
        )
    }

    return(
        <View style={{flex:1,padding:15,paddingTop:30,height:'100%'}}>
            <Text style={{textAlign:"center",fontSize:24,color:colors.text}}>Корзина</Text>

        {!cartReducer.length ? <Text style={{fontSize:22,textAlign:"center",marginTop:'50%',color:colors.text}}>Корзина пуста</Text>
        :
        <View>
            <FlatList
            data={cartReducer}
            keyExtractor={item=>`${item.id}`}
            renderItem={renderItem}
            />
            <View style={{flexDirection:"row-reverse",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
                <TouchableOpacity>
                    <View style={{width:100,height:50,backgroundColor:'#077f7b',borderRadius:10}}>
                        <Text style={{textAlign:"center",paddingTop:6,fontSize:15,color:'white'}}>
                            Оформить заказ
                        </Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:17,color:colors.text}}>Итого: {totalPrice}$</Text>
                    <Text style={{fontSize:17,marginTop:5,color:colors.text}}>Кол-во: {totalCount}</Text>
                </View>
            </View>
        </View>
        }       
        </View>
    )
}