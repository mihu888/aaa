import { Text, StyleSheet, View, SafeAreaView, Dimensions, FlatList } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import {Picker} from "@react-native-picker/picker";
import { Divider } from '@rneui/base';
import { gettoken} from '../globals';


const billScreen = () =>{

  const [isloading, setIsLoading] = useState(true)
  const [sumin, setsumin] = useState(0);
  const [sumout, setsumout] = useState(0);
  const [remain, setremain] = useState(0);
  const years = Array.from({ length: 50 }, (_, i) => i + new Date().getFullYear() - 49); // 假设从1970年开始
  const [selectedYear, setSelectedYear] = useState(2024)
  const [myData, setmyData] = useState([])

  const load = (year) =>{
    const token = gettoken()
    fetch("http://120.55.68.146:8089/getyearlybill/",{
      method: 'POST',
      headers:{
        "Content-Type":'application/json',
      },
      body : JSON.stringify({ token: token, year: year})
    })
    .then(response=>response.json())
    .then(json=>{
      setmyData(json)
      setsumin(json.reduce((accumulator, currentValue) => accumulator + currentValue.in, 0))
      setsumout(json.reduce((accumulator, currentValue) => accumulator + currentValue.out, 0))
    })
    .catch(error=>console.error(error))
    .finally(()=>setIsLoading(false));
  }

  // 使用 useEffect 来处理副作用
  useEffect(() => {
    load(selectedYear);
  }, [selectedYear]); // 当 selectedYear 改变时触发
  // useEffect(() => load(url1,income), []);

  return(
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
      <View style={{flex:2, flexDirection:'row'}}>
        <View style={{flex:1, justifyContent:'flex-end'}}>
          <Picker  
            selectedValue={selectedYear}  
            style={{width: 122}}  
            onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}  
          >  
            {years.map((year, index) => (  
                <Picker.Item key={index} label={year.toString()} value={year} />  
            ))}  
          </Picker>  
        </View>
        <View style={{flex:2,justifyContent:'flex-end'}}>
          <Text style={{
            textAlign:'center',
            fontSize :30,
            fontWeight :'bold',
            color :'black'}}>每日记账</Text>
        </View>
        <View style={{flex:1}}></View>
      </View>
      <View style={{flex:0.5}}></View>
      <View style={{flex:2.8, alignItems:'center'}}>
        <View style={{flex:1,
            width:Dimensions.get('window').width/1.2,
            backgroundColor:'#FFC0CB',
            justifyContent:'space-around',
            borderRadius:10,
            elevation: 3, // 在Android上设置视图的高度，以产生阴影效果  
            shadowColor: '#000', // 阴影颜色  
            shadowOffset: { width: 20, height: 1 }, // 阴影偏移量  
            shadowOpacity: 0.1, // 阴影透明度  
            shadowRadius: 3, // 阴影模糊半径
            }}>
          <View style={{flex:1.5, margin:20}}>
            <Text style={{color:'black'}}>年结余</Text>
            <Text style={{color:'black', fontSize:30}}>{sumin-sumout}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row',marginLeft:20}}>
            <View style={{flex:1}}>
              <Text style={{color:'black'}}>年收入 {sumin}</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{color:'black'}}>年支出 {sumout}</Text>
            </View>
          </View>
        </View>
      </View> 
      <View style={{flex:0.5}}></View> 
      <View style={{flex:0.5, flexDirection:'row', marginLeft:15}}>
        <View style={{flex:1}}>
          <Text style={{fontSize:10}}>月份</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{fontSize:10}}>月收入</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{fontSize:10}}>月支出</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{fontSize:10}}>月结余</Text>
        </View>
      </View>
      <Divider width={2} style={{marginLeft:15}}/>
      <View style={{flex:12.7, marginLeft:15}}>
        <FlatList
        data = {myData}
        renderItem={({item}) =>{
          return(
            <View>
              <View style={{flex:1, flexDirection:'row', height:53, alignItems:'center'}}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:16, color:'black'}}>{item.month}</Text>
                </View>
                <View style={{flex:1}}>
                  <Text style={{fontSize:16, color:'black'}}>{item.in}</Text>
                </View>
                <View style={{flex:1}}>
                  <Text style={{fontSize:16, color:'black'}}>{item.out}</Text>
                </View>
                <View style={{flex:1}}>
                  <Text style={{fontSize:16, color:'black'}}>{item.in - item.out}</Text>
                </View>
              </View>
              <Divider width={2}/>
            </View>
          )
        }}
        />
      </View>
    </SafeAreaView>
  )
}

export default billScreen;