import React, { useContext, useEffect, useState } from 'react';  
import { View, Text, Modal, TextInput, StyleSheet,SafeAreaView, Button, Alert, Dimensions, FlatList, TouchableOpacity } from 'react-native';  
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {Picker} from "@react-native-picker/picker";
import LinearGradient from 'react-native-linear-gradient';
import { Divider } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native'; 
import Navigation from '../App';
import { gettoken} from '../globals';


const dic={
  "eating":"restaurant-outline",
  "clothes":"cart-outline",
  'living':"home-outline",
  'going':"car-sport-outline",
  'other':"ellipsis-horizontal-circle-outline",
  "salary":"card-outline",
  "manage":"calculator-outline",
}

const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); 
  const [sumin, setsumin] = useState(0)
  const [sumout, setsumout] = useState(0)
  const [reamain, setremain] = useState(0)
  const [myData, setmyData] = useState([])
  const [numday, setnumday] = useState(0) 


const SwipeableBillSubItem = ({ subItem }) => {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [numericValue, setNumericValue] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [itemid, setItemid] = useState(0)

  // const ifdel = () => {
  //   Alert.alert(
  //     '操作确认',
  //     '您确定要删除这项吗？',
  //     [
  //       {
  //         text: '取消',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: '删除',
  //         onPress: () => onDelete(subItem), // 调用父组件提供的onDelete回调函数
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // };

  const load = (selectedYear,selectedMonth) =>{
    const token = gettoken();
    fetch(url,{
      method: 'POST',
      headers:{
          //Accept:'application/json',
          "Content-Type":'application/json',
          //Authorization:`Bearer ${token}`
      },
      body : JSON.stringify({ token: token, year: selectedYear, month: selectedMonth+1})
    })
    .then(response=>response.json())
    .then(json=>{
        console.log(json);
        setnumday(json.length)
        setsumin(json.reduce((acc, item) => acc + item.in, 0))
        setsumout(json.reduce((acc, item) => acc + item.out, 0))
        setmyData(json)
    })
    .catch(error=>console.error(error))
    .finally(()=>setIsLoading(false));
  }

  const edit = (id,note,num) =>{
    const token = gettoken();
    fetch(`http://120.55.68.146:8089/change/${id}`,{
      method: 'POST',
      headers:{
          //Accept:'application/json',
          "Content-Type":'application/json',
          //Authorization:`Bearer ${token}`
     },
     body : JSON.stringify({ token: token, note: note, number: num})
    })
    .catch(error=>console.error(error))
    .finally(()=>setIsLoading(false));
  }

  const onDelete = (id) =>{
    const token = gettoken();
    fetch(`http://120.55.68.146:8089/bills/${id}`,{
      method: 'POST',
      headers:{
          //Accept:'application/json',
          "Content-Type":'application/json',
          //Authorization:`Bearer ${token}`
     },
    })
    .catch(error=>console.error(error))
    .finally(()=>setIsLoading(false));
  }

  const handleButtonClick = () => {
    setIsModalVisible2(true);
  };

  const noteClick = () => {
    setIsModalVisible1(true)
  }

  const handleModalClose = () => {
    setIsModalVisible2(false);
    setIsModalVisible1(false)
  };

  const handleNumInputChange = (text) => {
    setNumericValue(text.replace(/[^\d]/g, ''));
  };

  const handleTextInputChange = (text) => {
    setInputValue(text);
  };

  const handleConfirm = () => {
    edit(itemid, inputValue, numericValue);
    console.log('Confirmed value:', numericValue);
    handleModalClose();
    // load(selectedYear, selectedMonth);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
      <View style={{flex:1, justifyContent:'center'}}>
        <Ionicons name={dic[subItem.name]} style={{fontSize:30, marginLeft:15, color:'black'}}/>
      </View>
    
      <View style={{flex:4, justifyContent:'center'}}>
        <TouchableOpacity onPress={() => {
          noteClick();
          setItemid(subItem.id);
          setInputValue(subItem.note);
          setNumericValue(subItem.number);
          }}
          onLongPress={() => {
            setItemid(subItem.id);
            Alert.alert(
              '操作确认',
              '您确定要删除这项吗？',
              [
                {
                  text: '取消',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: '删除',
                  onPress: () => {
                    onDelete(itemid.toString());
                    load(selectedYear, selectedMonth);
                  }
                },
              ],
              { cancelable: false },
            );
          }}
        >
          <Text style={{fontSize:18, textAlign:'left', color:'black'}}>{subItem.note}</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          visible={isModalVisible1}
          animationType="slide"
          transparent={true}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalContent}>
            <TextInput
              style={styles.textInput}
              value={inputValue}
              onChangeText={handleTextInputChange}
              placeholder="请输入备注"
            />
            <View style={styles.buttonRow}>
              <Button title="确认" onPress={()=>handleConfirm()} />
              <Button title="取消" onPress={()=>handleModalClose()} />
            </View>
          </View>
        </Modal>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => {
          handleButtonClick();
          setItemid(subItem.id);
          setInputValue(subItem.note);
          setNumericValue(subItem.number);
        }}>
          <Text style={{ fontSize: 18, textAlign: 'right', marginRight: 20, color: 'black' }}>
            {subItem.number}
          </Text>
        </TouchableOpacity>
        
        {/* Modal */}
        <Modal
          visible={isModalVisible2}
          animationType="slide"
          transparent={true}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalContent}>
            <TextInput
              style={styles.textInput}
              value={numericValue}
              onChangeText={handleNumInputChange}
              keyboardType="numeric"
              placeholder="请输入金额"
            />
            <View style={styles.buttonRow}>
              <Button title="确认" onPress={handleConfirm} />
              <Button title="取消" onPress={handleModalClose} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};


  
const Screen1 = () => {
  const years = Array.from({ length: 50 }, (_, i) => i + new Date().getFullYear() - 49); // 假设从1970年开始  
  const months = ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'];  
  
  const [isloading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const url = "http://120.55.68.146:8089/getmonthlybill/"

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
  //     ],
  //     "in": 85,
  //     "out": 5
  //   }
  // ]

  // const numday = 2
  // const sumin = 10
  // const sumout = 7
  // const remain = 3
  

  const load = (selectedYear,selectedMonth) =>{
    const token = gettoken();
    fetch(url,{
      method: 'POST',
      headers:{
          //Accept:'application/json',
          "Content-Type":'application/json',
          //Authorization:`Bearer ${token}`
      },
      body : JSON.stringify({ token: token, year: selectedYear, month: selectedMonth+1})
    })
    .then(response=>response.json())
    .then(json=>{
        console.log(json);
        setnumday(json.length)
        setsumin(json.reduce((acc, item) => acc + item.in, 0))
        setsumout(json.reduce((acc, item) => acc + item.out, 0))
        setmyData(json)
    })
    .catch(error=>console.error(error))
    .finally(()=>setIsLoading(false));
  }



  useEffect(() => {    
    // if(selectedMonth!=null){
      load(selectedYear,selectedMonth)
    // }
    // else{load(new Date().getFullYear(),new Date().getMonth())}
    // //监听全局变量变化的逻辑（如果有的话）  
  }, [selectedMonth,selectedYear]); // 空依赖数组意味着这个 effect 只会在组件挂载时运行一次 

  return (  
    <SafeAreaView style={{flex:1}}>  
      <LinearGradient 
          colors={['#FFC0CB', '#FFC0CB', '#FFFFFF', '#FFFFFF']} 
          locations={[0, 0.21, 0.3, 1]} // 控制各个颜色出现的位置
          style={{ flex: 1 }}
      >
        {/* <View style={{flex:1}}>
        </View> */}
        <View style={{flex:2,justifyContent:'flex-end'}}>
        <Text style={{
            textAlign:'center',
            fontSize :30,
            fontWeight :'bold',
            color :'black'}}>每日记账</Text>
        </View>
        <View style={{flex:2,flexDirection:'row'}}>
          <View style={{flex:1}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:16,marginTop:20, color:'black'}}>  {selectedYear}年</Text>
              <Picker  
                selectedValue={selectedYear}  
                style={{width:40}}  
                onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}  
              >  
                {years.map((year, index) => (  
                  <Picker.Item key={index} label={year.toString()+'年'} value={year} />  
                ))}  
              </Picker>  
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:25, color:'black'}}>  {selectedMonth < 9?'0':null}{selectedMonth+1}月</Text>
              <Picker  
                selectedValue={selectedMonth}  
                
                style={{width:33}}  
                onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemIndex)}  
              >  
                {months.map((month, index) => (  
                  <Picker.Item key={index} label={month} value={index} />  
                ))}  
              </Picker>
            </View>  
          </View>
          <Divider orientation='vertical' width={1.3} style={{marginTop:25}} />
          <View style={{flex:0.2}}></View>
          <View style={{flex:1.4}}>
            <Text style={{marginTop:20,fontSize:16, color:'black'}}>收入</Text>
            <Text style={{fontSize:27, color:'black'}}>{sumin}</Text>
            <Text style={{fontSize:13, color:'black'}}>剩余  {reamain}</Text>
          </View>
          <View style={{flex:1.4}}>
            <Text style={{marginTop:20, color:'black'}}>支出</Text>
            <Text style={{fontSize:27, color:'black'}}>{sumout}</Text>
          </View>
        </View>
        <View style={{flex:0.1}}></View>
        <View style={{flex:0.7}}>
          
        </View>
        <View style={{flex:1.7,alignItems:'center'}}>
          <View style={{flex:1,
            width:Dimensions.get('window').width/1.6,
            backgroundColor:'white',
            flexDirection:'row',
            justifyContent:'space-around',
            borderTopStartRadius:10,
            borderTopEndRadius:10,
            elevation: 3, // 在Android上设置视图的高度，以产生阴影效果  
            shadowColor: '#000', // 阴影颜色  
            shadowOffset: { width: 20, height: 1 }, // 阴影偏移量  
            shadowOpacity: 0.1, // 阴影透明度  
            shadowRadius: 3, // 阴影模糊半径
            }}>
            <TouchableOpacity
              onPress={()=>
                navigation.navigate('bill')
              }
            >
              <View>
                <Ionicons name='reader-outline' style={{fontSize:30,marginTop:15, color:'black'}}/>
                <Text style={{textAlign:'center', color:'black'}}>账单</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>
                navigation.navigate('budget')
              }
            >
              <View>
                <AntDesign name='redenvelopes' style={{fontSize:30,marginTop:15, color:'black'}}/>
                <Text style={{textAlign:'center', color:'black'}}>预算</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>
                navigation.navigate('more')
              }
            >
              <View>
                <Ionicons name="ellipsis-horizontal-circle-outline" style={{fontSize:30,marginTop:15, color:'black'}}/>
                <Text style={{textAlign:'center', color:'black'}}>更多</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:0.3}}></View>
        <View style={{flex:10.3}}>
          <FlatList
            data = {myData}
            renderItem={({item}) =>{
              return(
                <View>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:2,marginLeft:10}}>
                      <Text style={{fontSize:12, color:'#bbbbbb'}}>{item.time}</Text>
                    </View>
                    <View style={{flex:1}}>
                      <Text style={{fontSize:12, color:'#bbbbbb'}}>收入:{item.in}</Text>
                    </View>
                    <View style={{flex:1}}>
                      <Text style={{fontSize:12, color:'#bbbbbb'}}>支出:{item.out}</Text>
                    </View>
                  </View>
                  <View>
                    <FlatList
                      data = {item.bill}
                      renderItem={({item}) =>(<SwipeableBillSubItem subItem={item} />)
                    }
                    />
                  </View>
                </View>
              )
            }}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>  
  );  
};  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    padding: 20,  
  },  
  modalContent: {  
    backgroundColor: 'white',  
    padding: 20,  
    borderRadius: 10,  
  },  
  textInput: {  
    height: 40,  
    borderColor: 'gray',  
    borderWidth: 1,  
    marginBottom: 10,  
  },  
  buttonRow: {  
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    marginBottom: 10,  
  },  
});  
  
export default Screen1;


    // const load = (selectedYear,selectedMonth) =>{
    //   fetch(url,{
    //     method: 'POST',
    //     headers:{
    //         //Accept:'application/json',
    //         "Content-Type":'application/json',
    //         //Authorization:`Bearer ${token}`
    //    },
    //    body : JSON.stringify({ token: token, year: selectedYear, month: selectedMonth})
    //   })
    //   .then(response=>response.json())
    //   .then(json=>{
    //       console.log(json);
    //       setnumday(json.length)
    //       setsumin(json.reduce((acc, item) => acc + item.in, 0))
    //       setsumout(json.reduce((acc, item) => acc + item.out, 0))
    //       setmyData(json)
    //   })
    //   .catch(error=>console.error(error))
    //   .finally(()=>setIsLoading(false));
    // }

    const edit = (id,note,num) =>{
      fetch(url,{
        method: 'POST',
        headers:{
            //Accept:'application/json',
            "Content-Type":'application/json',
            //Authorization:`Bearer ${token}`
       },
       body : JSON.stringify({ token: token, note: note, number: num})
      })
      .catch(error=>console.error(error))
      .finally(()=>setIsLoading(false));
    }

    const onDelete = (id) =>{
      fetch(url,{
        method: 'POST',
        headers:{
            //Accept:'application/json',
            "Content-Type":'application/json',
            //Authorization:`Bearer ${token}`
       },
       body : JSON.stringify({ token: token, id: id})
      })
      .catch(error=>console.error(error))
      .finally(()=>setIsLoading(false));
    }


    // // 使用 useEffect 来处理副作用
    // useEffect(() => {
    //   load(selectedYear, selectedMonth);
    // }, [selectedYear, selectedMonth]); // 当 selectedUrl 或 income 改变时触发
    // // useEffect(() => load(url1,income), []);








// const myData = [
//   {
//     "time": "2014-07-22",
//     "bill": [
//       {
//         "name": "reader-outline",
//         "note": "consectetur",
//         "number": 64,
//         "id": 52
//       },
//       {
//         "name": "reader-outline",
//         "note": "Ut ut",
//         "number": 1,
//         "id": 36
//       }
//     ],
//     "in": 22222.22,
//     "out": 11111.11
//   },
//   {
//     "time": "2009-11-01",
//     "bill": [
//       {
//         "name": "reader-outline",
//         "note": "aliqua cillum",
//         "number": 99,
//         "id": 5
//       }
//     ],
//     "in": 85,
//     "out": 5
//   },{
//     "time": "2014-07-22",
//     "bill": [
//       {
//         "name": "reader-outline",
//         "note": "consectetur",
//         "number": 64,
//         "id": 52
//       },
//       {
//         "name": "reader-outline",
//         "note": "Ut ut",
//         "number": 1,
//         "id": 36
//       }
//     ],
//     "in": 22222.22,
//     "out": 11111.11
//   },
//   {
//     "time": "2009-11-01",
//     "bill": [
//       {
//         "name": "reader-outline",
//         "note": "aliqua cillum",
//         "number": 99,
//         "id": 5
//       }
//     ],
//     "in": 85,
//     "out": 5
//   },{
//     "time": "2014-07-22",
//     "bill": [
//       {
//         "name": "reader-outline",
//         "note": "consectetur",
//         "number": 64,
//         "id": 52
//       },
//       {
//         "name": "reader-outline",
//         "note": "Ut ut",
//         "number": 1,
//         "id": 36
//       }
//     ],
//     "in": 22222.22,
//     "out": 11111.11
//   },
//   {
//     "time": "2009-11-01",
//     "bill": [
//       {
//         "name": "reader-outline",
//         "note": "aliqua cillum",
//         "number": 99,
//         "id": 5
//       }
//     ],
//     "in": 85,
//     "out": 5
//   }
// ]