import React, { useEffect, useState } from 'react'
import {View,ScrollView,Text, StatusBar,ImageBackground,Image,TouchableOpacity} from 'react-native'

import {Ionicons} from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { addCart } from '../store/actions/card'
import { useTheme } from '@react-navigation/native'

export const RecipeDetail = ({route,navigation}) => {

    const dispatch = useDispatch();

    const {colors} = useTheme()


    const [count,setCount] = useState(1);
    const [product,setProduct] = useState({});

    const [textShow,setTextShow] = useState(3)

    const [total,setTotal] = useState();

    const addCount = () =>{
        let counter = count + 1;
        let totalPrice = product.price + total;
        if(counter >= 0){
            setCount(counter);
            setTotal(totalPrice)
        }
    };

    const toggleNumber = () =>{
        if(textShow === 3){
            setTextShow(100)
        }else{
            setTextShow(3)
        }
    }

    const RemoveCount = () =>{
        let counter = count - 1;
        let totalPrice = total - product.price
        setCount(counter);
        setTotal(totalPrice)
    };

    const addItemToCart = () =>{

        const totalPrice = product.price * count;

        const newData = {
            title:product.title,
            price:product.price,
            img:product.img,
            totalPrice:totalPrice,
            count:count,
            id:Math.random().toString()
        }

        dispatch(addCart(newData))
    }

    useEffect(()=>{
        let {product} = route.params; 
        setTotal(product.price)
        setProduct(product)
    },[product]);

    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            <ImageBackground source={product.img} style={{width:'100%',height:300}}> 
            <View style={{flexDirection:"row",alignItems:"center",marginHorizontal:20,justifyContent:"space-between",marginTop:30}}>
                <Ionicons name="md-arrow-back" size={35}  onPress={()=>navigation.goBack()} color='white' />
            </View>
            </ImageBackground> 
            </View>
            
             <ScrollView style={{borderTopLeftRadius:20,borderTopRightRadius:20,elevation:1,marginTop:250,backgroundColor:colors.background}}>
             
             <View style={{paddingHorizontal:30,paddingVertical:50,marginTop:-30,width:'100%'}}>
                <View style={{paddingBottom:25,flexDirection:'column',borderBottomColor:'#f0f0f0',borderBottomWidth:1}}>
                    <View style={{flexDirection:"column"}}>
                        <Text style={{fontSize:18,fontWeight:"bold",color:colors.text}}>
                            {product.title}
                        </Text>
                        <Text style={{fontSize:15,marginVertical:5,color:colors.text}}>
                             {product.description}
                        </Text>
                    </View>
                <View style={{flexDirection:"row",marginTop:15}}>
                <Text style={{fontSize:20,fontWeight:"bold",color:colors.text,marginRight:10}}>
                        Цена:
                    </Text>
                    <Text style={{fontSize:20,color:colors.text,fontWeight:"bold"}}>
                        ${product.price}
                    </Text>
                </View>
                    
                    
                </View>

                <View style={{flexDirection:"column"}}>
                            <View>
                                <Text style={{fontSize:18,marginVertical:10,color:colors.text}}>Описание</Text>

                                <Text numberOfLines={textShow} style={{textAlign:"left",width:'100%',fontSize:15,color:colors.text}}>
                                    {product.mainDescription}
                                </Text>
                                <Text onPress={toggleNumber} style={{color:'black',fontWeight:'bold'}}>
                                {textShow <=3 ? 'Read more...' : 'Read less...' }
                                </Text>
                            </View>

                            <View>
                            <View style={{flexDirection:"row",alignItems:"center",marginTop:25}}>
                                <Text style={{fontSize:18,color:colors.text}}>Кол-во:</Text>
                                <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                                        <TouchableOpacity onPress={RemoveCount}>
                                            <View style={{width:25,height:25,borderRadius:50,backgroundColor:'#bcbcbc'}}>
                                                <Ionicons style={{textAlign:"center"}} name="ios-remove" size={24} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={{paddingHorizontal:10,color:colors.text}}>{count}</Text>
                                        
                                        <TouchableOpacity  onPress={addCount}>
                                            <View style={{width:25,height:25,borderRadius:50,backgroundColor:'#bcbcbc'}}>
                                                <Ionicons style={{textAlign:"center"}} name="ios-add" size={24} color="white" />
                                            </View>
                                        </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{marginVertical:15}}>
                            <Text style={{fontSize:18,color:colors.text}}>Итог:  {total}$</Text>
                            </View>

                            <View style={{width:'100%',flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                                <View style={{width:'45%'}}> 
                                <TouchableOpacity onPress={addItemToCart}>
                                    <View style={{width:'100%',borderRadius:5,height:40,borderWidth:2,borderColor:'#077f7b'}}>
                                        <Text style={{textAlign:"center",lineHeight:35,color:colors.text}}>
                                            Добавить
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                                <View style={{width:'45%'}}>
                                <TouchableOpacity>
                                    <View style={{width:'100%',borderRadius:5,height:40,borderWidth:2,backgroundColor:'#077f7b',borderColor:'#077f7b'}}>
                                        <Text style={{textAlign:"center",lineHeight:35,color:colors.text}}>
                                            Оплата
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                            </View>
                            </View>
                </View>
       
            </View>
         
             </ScrollView>
            </View>
    )
}
