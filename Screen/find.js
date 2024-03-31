import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, TextInput, FlatList } from 'react-native';  
import {Divider} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
  
const Screen1 = () => {  
  const [selecttext,setselecttext] = useState("类别")
  const [item,setitem] = useState('')
  const [order,setorder] = useState("t")
  const [myData, setmyData] = useState([])

  // const myData = [
  //   {
  //     "time": "2009-11-01",
  //     "bill": [
  //       {
  //         "name": "reader-outline",
  //         "note": "aliqua cillum",
  //         "number": 99,
  //         "id": 5
  //       }
  //     ]
  //   }
  // ]

  const dic={
    "eating":"restaurant-outline",
    "clothes":"cart-outline",
    'living':"home-outline",
    'going':"car-sport-outline",
    'other':"ellipsis-horizontal-circle-outline",
    "salary":"card-outline",
    "manage":"calculator-outline",
  }

  const find = () =>{
    const token = gettoken();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, order, number:selecttext=="类别"?item:"", note:selecttext=="备注"?item:"", number:selecttext=="金额"?Number(item):0})
    })
    .then(response => response.json())
    .then(data => {
      data.data=="No Data"?setmyData([]):setmyData(data)
    })
    .catch(error => console.error(error));
  }

  return (  
    <SafeAreaView style={{flex:1}}>  
      <View style={{flex:1.6, backgroundColor:'#FFC0CB', alignItems:'center'}}>
        <View style={{flex:0.6}}></View>
        <View style={{flex:1, flexDirection:'row', width:Dimensions.get('window').width/1.5}}>
          <View style={{flex:1, justifyContent:'space-around', flexDirection:'row', alignItems:'center'}}>
            <View>
              <TouchableOpacity
              onPress={()=>{
                setselecttext("类别")
              }}
              >
              <Text style={{fontSize:18, color:'black', marginTop:selecttext=="类别"?10:0}}>类别</Text></TouchableOpacity>
              {selecttext=="类别"?<Divider orientation='horizontal' color='black' width={4} style={{marginTop:10}} />:null}
            </View>
            <View>
              <TouchableOpacity
              onPress={()=>{
                setselecttext("备注")
              }}
              >
              <Text style={{fontSize:18, color:'black', marginTop:selecttext=="备注"?10:0}}>备注</Text></TouchableOpacity>
              {selecttext=="备注"?<Divider orientation='horizontal' color='black' width={4} style={{marginTop:10}} />:null}
            </View>
            <View>
              <TouchableOpacity
              onPress={()=>{
                setselecttext("金额")
              }}
              >
              <Text style={{fontSize:18, color:'black', marginTop:selecttext=="金额"?10:0}}>金额</Text></TouchableOpacity>
              {selecttext=="金额"?<Divider orientation='horizontal' color='black' width={4} style={{marginTop:10}} />:null}
            </View>
          </View>
        </View>
      </View>
      <View style={{flex:12, backgroundColor:'white'}}>
        <View style={{flex:1}}></View>
        <View style={{flex:4, flexDirection:'row', marginHorizontal:25,justifyContent:'center', alignItems:'center'}}>
          <View style={{flex:4}}>
            <TextInput
            placeholder={`   输入${selecttext}`}
            placeholderTextColor={"#888888"}
            onChangeText={(key)=>setitem(key)}
            style={{backgroundColor:"#eeeeee", borderRadius:10}}
            />
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#FFC0CB', borderRadius:10, height:45}}>
            <TouchableOpacity
              onPress={()=>find()}
            >
              <Text style={{color:'black', fontSize:15}}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:1}}></View>
        <View style={{flex:2, flexDirection:'row'}}>
          <View style={{flex:1, justifyContent:'center'}}>
            <Text style={{marginLeft:15, color:'black'}}>搜索结果</Text>
          </View>
          <View style={{flex:1.3, flexDirection:'row', borderWidth:2,borderRadius:14,borderColor:'#FFC0CB'}}>
            <View style={{flex:1, backgroundColor:order=="t"?'#FFC0CB':null,borderTopLeftRadius:10, borderBottomLeftRadius:10}}>
              <TouchableOpacity
              onPress={()=>setorder("t")}
              >
                <Text style={{textAlign:'center', color:order=="t"?"white":'black'}}>按时间</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, backgroundColor:order=="n"?'#FFC0CB':null,borderTopRightRadius:10, borderBottomRightRadius:10}}>
            <TouchableOpacity
              onPress={()=>setorder("n")}
              >
                <Text style={{textAlign:'center', color:order=="n"?"white":'black'}}>按金额</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:1}}></View>
        </View>
        <View style={{flex:40}}>
          <FlatList
          data={myData}

          renderItem={({item})=>{
            return(
              <View>
                <View style={{flex:1, flexDirection:'row'}}>
                  <View style={{flex:1,marginLeft:10}}>
                    <Text style={{fontSize:12, color:'#bbbbbb'}}>{item.time}</Text>
                  </View>
                  <View style={{flex:1}}></View>
                </View>
                <View>
                  <FlatList
                    data = {item.bill}
                    renderItem={({item}) =>{
                      return(
                        <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
                          <View style={{flex:1, justifyContent:'center'}}>
                            <Ionicons name={dic[item.name]} style={{fontSize:30, marginLeft:15, color:'black'}}/>
                          </View>
                        
                          <View style={{flex:4, justifyContent:'center'}}>
                            <Text style={{fontSize:18, textAlign:'left', color:'black'}}>{item.note}</Text>
                          </View>
                          <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, textAlign: 'right', marginRight: 20, color: 'black' }}>{item.number}</Text>
                          </View>
                        </View>
                      )
                    }
                  }
                  />
                </View>
              </View>
            )
          }}
          />
        </View>
      </View>
    </SafeAreaView>  
  );  
};  
  
export default Screen1;