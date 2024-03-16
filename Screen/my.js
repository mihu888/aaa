import React, {useState} from 'react';  
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native'; 
import LinearGradient from 'react-native-linear-gradient'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { settoken, gettoken, getLoginInfo, clearLoginInfo } from '../globals';
import { useNavigation } from '@react-navigation/native'; 
  
const Screen1 = () => {

  const [isloading, setIsLoading] = useState(true);
  const [ifrec, setifrec] = useState(false)
  const [recday, setrecday] = useState(0)
  const [useday, setuseday] = useState(0)
  const [billnum, setbillnum] = useState(0)
  const navigation = useNavigation();

  // const rec = () =>{
  //   fetch(url,{
  //     method: 'POST',
  //     headers:{
  //         //Accept:'application/json',
  //         "Content-Type":'application/json',
  //         //Authorization:`Bearer ${token}`
  //    },
  //    body : JSON.stringify({ token: token})
  //   })
  //   .then(load())
  //   .catch(error=>console.error(error))
  //   .finally(()=>setIsLoading(false));
  // }

  // const load = () =>{
  //   fetch(url,{
  //     method: 'POST',
  //     headers:{
  //         //Accept:'application/json',
  //         "Content-Type":'application/json',
  //         //Authorization:`Bearer ${token}`
  //    },
  //    body : JSON.stringify({ token: token})
  //   })
  //   .then(res => res.json)
  //   .then(json =>{
  //     setrecday(json.record)
  //     setuseday(json.day)
  //     setbillnum(json.bill)
  //     setifrec(json.ifrec)
  //   })
  //   .catch(error=>console.error(error))
  //   .finally(()=>setIsLoading(false));
  // }



  return(
    <SafeAreaView style={{flex:1}}>
      <LinearGradient 
        colors={['#FFC0CB', '#FFC0CB', '#eeeeee', '#eeeeee']} 
        locations={[0, 0.35, 0.43, 1]} // 控制各个颜色出现的位置
        style={{ flex: 1 }}
      >
        <View style={{flex:1}}></View>
        <View style={{flex:4, flexDirection:'row', alignItems:'center'}}>
          <View style={{flex:1}}>
            <Ionicons name='person-circle-outline' style={{fontSize:100,marginLeft:10}} />
          </View>
          <View style={{flex:1}}>
            <Text style={{fontSize:30, color:'black'}}>aa</Text>
          </View>
          <View style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity
              disabled={ifrec}
              onPress={() =>{
                // rec()
                setifrec(true)
              }}
              >
              <View style={{alignItems:'center',
                backgroundColor:ifrec?'#eeeeee':'white',
                width:65,
                height:25,
                flexDirection:'row',
                justifyContent:'space-around',
                borderRadius:100
                }}>
                {ifrec?null:<Ionicons name='today-outline' size={17} color={'black'} />}
                <Text style={{color:'black'}}>{ifrec?"已打卡":"打卡"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:3, flexDirection:'row', justifyContent:'space-around'}}>
          <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:30, color:'black'}}>{recday}</Text>
            <Text style={{color:'black'}}>已连续打卡</Text>
          </View>
          <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:30, color:'black'}}>{recday}</Text>
            <Text style={{color:'black'}}>记账总天数</Text>
          </View>
          <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:30, color:'black'}}>{recday}</Text>
            <Text style={{color:'black'}}>记账总笔数</Text>
          </View>
        </View>
        <View style={{flex:14, marginHorizontal:20}}>
          <View style={{backgroundColor:'white', height:50, borderColor:"#eeeeee", borderRadius:6, borderWidth:0.5}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <View style={{flex:3, flexDirection:'row'}}>
                <AntDesign name='book' size={25} color={'black'} style={{marginHorizontal:15}}/>
                <Text style={{fontSize:15, color:'black'}}>我的账本</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', marginRight:15}}>
                <Ionicons name='chevron-forward-outline' size={25} color={'black'}/>
              </View>
            </View>
          </View>
          <View style={{height:10}}></View>
          <View style={{backgroundColor:'white', height:50, borderColor:"#eeeeee", borderRadius:6, borderWidth:0.5}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <View style={{flex:3, flexDirection:'row'}}>
                <Ionicons name='book-outline' size={25} color={'black'} style={{marginHorizontal:15}}/>
                <Text style={{fontSize:15, color:'black'}}>使用帮助</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', marginRight:15}}>
                <Ionicons name='chevron-forward-outline' size={25} color={'black'}/>
              </View>
            </View>
          </View>
          <View style={{backgroundColor:'white', height:50, borderColor:"#eeeeee", borderRadius:6, borderWidth:0.5}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <View style={{flex:3, flexDirection:'row'}}>
                <AntDesign name='lock1' size={25} color={'black'} style={{marginHorizontal:15}}/>
                <Text style={{fontSize:15, color:'black'}}>账户安全中心</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', marginRight:15}}>
                <Ionicons name='chevron-forward-outline' size={25} color={'black'}/>
              </View>
            </View>
          </View>
          <View style={{backgroundColor:'white', height:50, borderColor:"#eeeeee", borderRadius:6, borderWidth:0.5}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <View style={{flex:3, flexDirection:'row'}}>
                <Ionicons name='chatbubbles-outline' size={25} color={'black'} style={{marginHorizontal:15}}/>
                <Text style={{fontSize:15, color:'black'}}>意见反馈</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', marginRight:15}}>
                <Ionicons name='chevron-forward-outline' size={25} color={'black'}/>
              </View>
            </View>
          </View>
          <View style={{backgroundColor:'white', height:50, borderColor:"#eeeeee", borderRadius:6, borderWidth:0.5}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <View style={{flex:3, flexDirection:'row'}}>
                <Ionicons name='chatbox-ellipses-outline' size={25} color={'black'} style={{marginHorizontal:15}}/>
                <Text style={{fontSize:15, color:'black'}}>给每日记账评分</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', marginRight:15}}>
                <Ionicons name='chevron-forward-outline' size={25} color={'black'}/>
              </View>
            </View>
          </View>
          <View style={{backgroundColor:'white', height:50, borderColor:"#eeeeee", borderRadius:6, borderWidth:0.5}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <View style={{flex:3, flexDirection:'row'}}>
                <Ionicons name='receipt-outline' size={25} color={'black'} style={{marginHorizontal:15}}/>
                <Text style={{fontSize:15, color:'black'}}>关于每日记账V1.1.0</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', marginRight:15}}>
                <Ionicons name='chevron-forward-outline' size={25} color={'black'}/>
              </View>
            </View>
          </View>
          <View style={{backgroundColor:'white', height:50, borderColor:"#eeeeee", borderRadius:6, borderWidth:0.5}}>
            <TouchableOpacity onPress={()=>{
              clearLoginInfo();
              navigation.navigate('login');
            }}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <View style={{flex:3, flexDirection:'row'}}>
                <AntDesign name='setting' size={25} color={'black'} style={{marginHorizontal:15}}/>
                <Text style={{fontSize:15, color:'black'}}>设置</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', marginRight:15}}>
                <Ionicons name='chevron-forward-outline' size={25} color={'black'}/>
              </View>
            </View></TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}
  
export default Screen1;
