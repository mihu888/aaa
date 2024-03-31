import React, {useState, useEffect} from 'react';  
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native'; 
import LinearGradient from 'react-native-linear-gradient'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { settoken, gettoken, getLoginInfo, clearLoginInfo, getuser } from '../globals';
import { useNavigation } from '@react-navigation/native'; 
import { wdzb, sybz, aqzx, yjfk, pf, gy, sz } from './word';
  
const Screen1 = () => {
  const [card, setcard] = useState(0)
  const [isloading, setIsLoading] = useState(true);
  const [ifrec, setifrec] = useState(false)
  const [recday, setrecday] = useState(0)
  const [useday, setuseday] = useState(0)
  const [billnum, setbillnum] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [word, setword] = useState("")
  const Username = getuser();
  const navigation = useNavigation();

  const rec = (token) =>{
    fetch('http://120.55.68.146:8089/Clock_in/',{
      method: 'POST',
      headers:{
          //Accept:'application/json',
          "Content-Type":'application/json',
          //Authorization:`Bearer ${token}`
     },
     body : JSON.stringify({ token})
    })
    .then((token)=>load(token))
    .catch(error=>console.error(error))
    .finally(()=>setIsLoading(false));
  }

  const load = (token) =>{
    fetch('http://120.55.68.146:8089/get_p_information/',{
      method: 'POST',
      headers:{
          //Accept:'application/json',
          "Content-Type":'application/json',
          //Authorization:`Bearer ${token}`
     },
     body : JSON.stringify({ token:token})
    })
    .then(res => res.json())
    .then(json =>{
      setrecday(json.record)
      setuseday(json.day)
      setbillnum(json.bill)
      setifrec(json.ifrec)
    })
    .catch(error=>console.error(error))
    .finally(()=>setIsLoading(false));
  }

  useEffect(() => {  
      const token = gettoken();  
      load(token);
     
    // 监听全局变量变化的逻辑（如果有的话）  
  }, [card]); // 空依赖数组意味着这个 effect 只会在组件挂载时运行一次 


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
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                '操作确认',
                '您确定要退出吗？',
                [
                  {
                    text: '取消',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: '退出',
                    onPress: () => {
                      clearLoginInfo();
                      navigation.navigate('login');
                    }
                  },
                ],
                { cancelable: false },
              );
            }}
            >
            <Ionicons name='person-circle-outline' style={{fontSize:100,marginLeft:10}} />
          </TouchableOpacity></View>
          <View style={{flex:1}}>
            <Text style={{fontSize:30, color:'black'}}>{Username}</Text>
          </View>
          <View style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity
              disabled={ifrec}
              onPress={() =>{
                const token = gettoken();
                rec(token)
                setifrec(true)
                setcard(1)
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
            <Text style={{fontSize:30, color:'black'}}>{useday}</Text>
            <Text style={{color:'black'}}>记账总天数</Text>
          </View>
          <View style={{flex:1, alignItems:'center'}}>
            <Text style={{fontSize:30, color:'black'}}>{billnum}</Text>
            <Text style={{color:'black'}}>记账总笔数</Text>
          </View>
        </View>
        <View style={{flex:14, marginHorizontal:20}}>
          <TouchableOpacity onPress={()=>{setModalVisible(true),setword(wdzb)}}>
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
          </View></TouchableOpacity>
          <View style={{height:10}}></View>
          <TouchableOpacity onPress={()=>{setModalVisible(true),setword(sybz)}}>
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
          </View></TouchableOpacity>
          <TouchableOpacity onPress={()=>{setModalVisible(true),setword(aqzx)}}>
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
          </View></TouchableOpacity>
          <TouchableOpacity onPress={()=>{setModalVisible(true),setword(yjfk)}}>
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
          </View></TouchableOpacity>
          <TouchableOpacity onPress={()=>{setModalVisible(true),setword(pf)}}>
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
          </View></TouchableOpacity>
          <TouchableOpacity onPress={()=>{setModalVisible(true),setword(gy)}}>
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
          </View></TouchableOpacity>
          <TouchableOpacity onPress={()=>{setModalVisible(true),setword(sz)}}>
          <View style={{backgroundColor:'white', height:50, borderColor:"#eeeeee", borderRadius:6, borderWidth:0.5}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <View style={{flex:3, flexDirection:'row'}}>
                <AntDesign name='setting' size={25} color={'black'} style={{marginHorizontal:15}}/>
                <Text style={{fontSize:15, color:'black'}}>设置</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', marginRight:15}}>
                <Ionicons name='chevron-forward-outline' size={25} color={'black'}/>
              </View>
            </View>
          </View></TouchableOpacity>
          <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          >
            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
              <View style={{height:Dimensions.get('window').height/1.5,width:Dimensions.get('window').width/1.5, backgroundColor:'white', justifyContent:'center', alignItems:'center', borderWidth:4, borderColor:'#ffc0cb'}}>
                <Text style={{marginHorizontal:30, fontSize:17, color:'black'}}>{word}</Text>
              </View>
              <TouchableOpacity onPress={()=>setModalVisible(false)}>
                <Ionicons name="arrow-down-circle-outline" size={50}></Ionicons>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}
  
export default Screen1;
