import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Modal, TextInput, Button } from 'react-native';  
import {Divider} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; 
import { gettoken } from '../globals';
  
const Screen1 = () => { 

  const [income, setincome] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const [isDateTimePickerVisible, setisDateTimePickerVisible] = useState(false)
  const [name, setname] = useState('')
  const [type, settype] = useState('')
  const [num, setnum] = useState(0)
  const [note, setnote] = useState('')
  const [year, setyear] = useState(new Date().getFullYear())
  const [month, setmonth] = useState(new Date().getMonth()+1)
  const [day, setday] = useState(new Date().getDate())
  const sr = [
    {icon:"card-outline", name:"工资"},
    {icon:"calculator-outline", name:"理财"},
    {icon:"ellipsis-horizontal-circle-outline", name:"其它"},
  ]
  const zc = [
    {icon:"restaurant-outline", name:"餐饮"},
    {icon:"cart-outline", name:"购物"},
    {icon:"home-outline", name:"住房"},
    {icon:"car-sport-outline", name:"交通"},
    {icon:"ellipsis-horizontal-circle-outline", name:"其它"},
  ]
  const [data, setdata] = useState(sr)
  const dic={
    "restaurant-outline":"eating",
    "cart-outline":"clothes",
    "home-outline":'living',
    "car-sport-outline":'going',
    "ellipsis-horizontal-circle-outline":'other',
    "card-outline":"salary",
    "calculator-outline":"manage",
  }
  const handleConfirm = (date) => { 
    setyear(date.getFullYear());
    setmonth(date.getMonth()+1);  
    setday(date.getDate());
    setisDateTimePickerVisible(false) ;
  }; 

  const add = () =>{
    const token = gettoken();
    fetch('http://120.55.68.146:8089/bills/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, year, month, day, income, number:num, name, note })
      })
      .then(response => response.json())
      .then(data => {
        
     })
     .catch(error => console.error(error));
  }

  return (  
    <SafeAreaView style={{flex:1}}>  
      <View style={{flex:1.6, backgroundColor:'#FFC0CB', alignItems:'center'}}>
        <View style={{flex:0.6}}></View>
        <View style={{flex:1, flexDirection:'row', width:Dimensions.get('window').width/1.7}}>
          <View style={{flex:1, justifyContent:'space-around', flexDirection:'row', alignItems:'center'}}>
            <View>
              <TouchableOpacity
              onPress={()=>{
                setincome(1)
                setdata(sr)
              }}
              >
              <Text style={{fontSize:18, color:'black', marginTop:income==1?10:0}}>收入</Text></TouchableOpacity>
              {income==1?<Divider orientation='horizontal' color='black' width={4} style={{marginTop:10}} />:null}
            </View>
            <View>
              <TouchableOpacity
              onPress={()=>{
                setincome(0)
                setdata(zc)
              }}
              >
              <Text style={{fontSize:18, color:'black', marginTop:income==0?10:0}}>支出</Text></TouchableOpacity>
              {income==0?<Divider orientation='horizontal' color='black' width={4} style={{marginTop:10}} />:null}
            </View>
          </View>
        </View>
      </View>
      <View style={{flex:0.3, backgroundColor:'white'}}></View>
      <View style={{flex:11.7, flexDirection:'row',backgroundColor:'white', flexWrap:'wrap'}}>
        {data.map((item)=>(
          <View style={{width:Dimensions.get("window").width/4, height:Dimensions.get("window").width/4, justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity
            onPress={() => {
              setModalVisible(true)
              setname(dic[item.icon]);
              settype(item.name);
            }}
            >
              <View style={{width:Dimensions.get("window").width/8, height:Dimensions.get("window").width/8, backgroundColor:'#eeeeee', justifyContent:'center', alignItems:'center', borderRadius:100}}>
                <Ionicons name={item.icon} size={30} color={"black"} />
              </View>
            </TouchableOpacity>
            <Text style={{marginTop:15, color:"black"}}>{item.name}</Text>
          </View>
        ))}
      </View> 
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center', marginBottom:40}}>
          <View style={{margin: 20,
            height:300,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 10,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
            <Text style={{fontSize:18,color:"black"}}>添加账单：{type}</Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 20,
                paddingHorizontal: 10,
                width:Dimensions.get('window').width/2,
              }}
              onChangeText={setnum}
              placeholder='输入金额'
              keyboardType="numeric"
            />
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 20,
                paddingHorizontal: 10,
                width:Dimensions.get('window').width/2,
              }}
              onChangeText={setnote}
              placeholder='输入备注'
            />
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{color:"black", fontSize:17}}>{year}-{month}-{day}</Text>
              <View style={{width:20}}></View>
              <View style={{width:45, height:45, justifyContent:'center', alignItems:'center', backgroundColor:'#eeeeee', borderRadius:100}}>
                <TouchableOpacity
                onPress={()=>setisDateTimePickerVisible(true)}
                >
                  <Ionicons name="calendar-outline" size={30}></Ionicons>
                </TouchableOpacity>
                <DateTimePickerModal  
                  isVisible={isDateTimePickerVisible}  
                  mode="date"  
                  onConfirm={handleConfirm}  
                  onCancel={()=>setisDateTimePickerVisible(false)}  
                /> 
              </View>
            </View>
            <View style={{height:15}}></View>
            <View style={{height:40, flexDirection:'row'}}>
            <Button title="取消" onPress={()=>setModalVisible(false)} />
            <View style={{width:20}}></View>
            <Button title="添加" onPress={()=>{setModalVisible(false),add()}} /></View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>  
  );  
};   
  
export default Screen1;