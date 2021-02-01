import React, { useState,useEffect } from 'react'
import { Text,View,TextInput,TouchableOpacity,Image, FlatList } from 'react-native'
import { fakeProductData } from '../constants/fakeData';

import {useTheme} from '@react-navigation/native'

export const Search = ({navigation}) =>{

    const {colors} = useTheme()

    const [products,setProduct] = useState([]);
    const [searchProduct,setSearchProduct] = useState([]);
    const [searchText,setSearchText] = useState('');

    useEffect(()=>{
        setProduct(fakeProductData);
        setSearchProduct(products);
    },[products])

    const searchItem = (text) =>{
        setSearchText(text)
        let productsSearch = products.filter(item=>item.title.toLowerCase().match(searchText.toLowerCase()));
        if(productsSearch === ''){
            return false
        }
        setSearchProduct(productsSearch)
    }

    const renderItem = ({item}) =>{
        return(
            <View style={{width:'100%',flex:1,marginVertical:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <View style={{width:'40%'}}>
                <Image source={item.img} style={{width:90,height:90,borderRadius:50}} resizeMode="cover"/>
            </View>
            <View style={{width:'60%'}}>
                <View>
                    <Text style={{fontSize:19,fontWeight:"bold",color:colors.text}}>{item.title}</Text>
                    <Text style={{marginVertical:10,fontSize:19,color:'#077f7b',fontWeight:"bold"}}>{item.price}$</Text>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                    <TouchableOpacity onPress={()=>console.log(item.id)}>
                        <View style={{width:90,height:30,borderRadius:10,margin:'auto',backgroundColor:'black',}}>
                            <Text style={{color:'white',lineHeight:27,fontSize:15,textAlign:"center"}}>
                                Добавить
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('RecipeDetail',{
                        product:item
                    })}>
                        <View style={{marginLeft:8,width:90,height:30,borderRadius:10,margin:'auto',backgroundColor:'black',}}>
                            <Text style={{color:'white',lineHeight:27,fontSize:15,textAlign:"center"}}>
                                Открыть
                            </Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        )
    }

    return(
        <View style={{flex:1,padding:15,paddingTop:30,height:'100%'}}>
            <Text style={{textAlign:"center",fontSize:24,color:colors.text}}>Поиск</Text>

            <TouchableOpacity>
                <View style={{marginVertical:30}}>
                    <TextInput value={searchText} onChangeText={text=>searchItem(text)} style={{width:'100%',height:50,backgroundColor:'#e2e4eb',borderRadius:10,position:"relative",paddingHorizontal:20,fontSize:19,textDecorationLine:"none"}}/>
                    <Image style={{position:"absolute",right:-10,top:-25}} source={require('../../assets/IconCategory/search.png')} resizeMode="center" width={50} height={50}/>
                </View>
            </TouchableOpacity>

            {!products.length ? <Text style={{fontSize:22,textAlign:"center",marginTop:'50%',color:colors.text}}>Поиск рецептов</Text>
             : <View>
                    <FlatList
                        data={searchProduct}
                        renderItem={renderItem}
                        keyExtractor={item=>`${item.id}`}

                    /> 
                </View>}
        </View>
    )
}