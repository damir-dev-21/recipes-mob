import * as Font from 'expo-font'

export async function AsyncLoad(){
    try{
        await Font.loadAsync({
            
        })
    }catch(e){
        console.log(e)
    }
}