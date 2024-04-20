import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, Text, StyleSheet, FlatList, TouchableOpacity,SafeAreaView } from 'react-native';
import {Picker} from "@react-native-picker/picker";
//import { AuthContext } from '../globals';
import { LineChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Circle, Path, G } from 'react-native-svg';
import {Divider} from '@rneui/themed';
import { settoken, gettoken, getLoginInfo, clearLoginInfo } from '../globals';

const title = {
  "eating":"餐饮",
  "clothes":"购物",
  'living':"住房",
  'going':"交通",
  'other':"其它",
  "salary":"工资",
  "manage":"理财",
}

const dic={
  "eating":"restaurant-outline",
  "clothes":"cart-outline",
  'living':"home-outline",
  'going':"car-sport-outline",
  'other':"ellipsis-horizontal-circle-outline",
  "salary":"card-outline",
  "manage":"calculator-outline",
}

  const CustomPoint = ({ x, y, index }) => {
    return (
      <Circle
        key={index}
        cx={x}
        cy={y}
        r={4} // 设置半径大小，这里设为4
        stroke={'#eeeeee'} // 设置边框颜色为黑色
        strokeWidth={2} // 设置边框宽度为2
        fill={'#fff'} // 填充为空，即空心圆
      />
    );
  };

const Screen1 = () => {

  const [selectedValue, setSelectedValue] = useState(0);
    const [selectedButton, setSelectedButton] = useState("week")
    //const { token } = useContext(AuthContext);
    const [isloading, setIsLoading] = useState(true);
    const [weekDay, setweekDay] = useState([]);
    const [numday, setnumday] = useState(0);
    const [Data, setData] = useState([]);
    const [Order, setOrder] = useState([]);
    const [sum, setsum] = useState(0);
    const [income, setincome] = useState(0);
    const [url,seturl] = useState('http://120.55.68.146:8089/getweekbill/');

    // 模拟三个URL 
    const url1 = 'http://120.55.68.146:8089/getweekbill/';
    const url2 = 'http://120.55.68.146:8089/getmonthbill/';
    const url3 = 'http://120.55.68.146:8089/getyearbill/';

    const chartConfig = {
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      showYAxisLabel: false,
     color: (opacity = 0.5) => `rgba(0,0,0, ${opacity})`,
    };

    const load = (url,num) =>{
      const token = gettoken()
      fetch(url,{
        method: 'POST',
        headers:{
            //Accept:'application/json',
            "Content-Type":'application/json',
            //Authorization:`Bearer ${token}`
       },
       body : JSON.stringify({ token, income: num})
   })
  .then(response=>response.json())
  .then(json=>{
      console.log(json);
      setData(json.data.number)
      setOrder(json.order)
      setsum(json.data.number.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
      setnumday(12)

      if(json.data.date){
        setweekDay(json.data.date)
        setnumday(7)
      }
      if(json.data.day){
        setnumday(json.data.day)
      }
  })
  .catch(error=>console.error(error))
   .finally(()=>setIsLoading(false));
    }

    const handleSelectButton = (buttonName) => {
      if(buttonName == "week")seturl(url1);
      else if(buttonName == "month")seturl(url2);
      else seturl(url3);
      setSelectedButton(buttonName);
      //load(url,income);

  };

    const handlePickerChange = (itemValue) => {
      setincome(itemValue);
      //load(url,itemValue);  // 调用load函数并传入相应参数
    }


    // 使用 useEffect 来处理副作用
    useEffect(() => {
      load(url, income);
    }, [url, income]); // 当 selectedUrl 或 income 改变时触发
    // useEffect(() => load(url1,income), []);

  return (  
      <SafeAreaView style={{flex:1}}>  
         <LinearGradient 
          colors={['#FFC0CB', '#FFC0CB', '#FFFFFF', '#FFFFFF']} 
          locations={[0, 0.21, 0.3, 1]} // 控制各个颜色出现的位置
          style={{ flex: 1 }}
        >
          <View style={{flex:3,marginTop:40,justifyContent:'center',alignItems:'center'}}>  
            <View style={{flex:2}}>
              <Text style={{
                textAlign:'center',
                fontSize :30,
                fontWeight :'bold',
                color :'black'}}>每日记账</Text>
            </View> 
            {/* <View style={{flex:0.1}}></View> */}
            <View style={{flex:0.8,
              // justifyContent:'center',
              // alignItems:'center',
              width:100,
              backgroundColor:'white',
              marginLeft:10
              }}>
              <Picker style={{
                width:'120%',
                height:'100%',
                marginVertical:-16,
                marginLeft:-10
                }}
                // selectedValue={income}
                // onValueChange={(itemValue) =>
                //   handlePickerChange(itemValue)
                // }
                selectedValue={selectedValue}
                onValueChange={(itemValue) =>{
                  setSelectedValue(itemValue)
                  handlePickerChange(itemValue)}
                }
                mode={'dropdown'}
                >
                <Picker.Item label="支出" value={0} />
                <Picker.Item label="收入" value={1} />
              </Picker> 
            </View>
            <View style={{flex:0.3}}></View>
            <View style={{flexDirection:'row',
              flex:1,
              height:60,
              justifyContent:'space-around',
              alignItems:'center',
              borderColor:'white',
              borderWidth:2,
              borderRadius:10,
              width:200,
              
              }}>
                <View style={{flex:1}}>
              <TouchableOpacity style={{ backgroundColor: selectedButton === "week" ? 'white' : null,
                borderRadius: selectedButton === "week" ? 6 : null,
                height: selectedButton === "week" ? 30 : null }}
                onPress={() => handleSelectButton("week")}>
                <Text style={{textAlign:'center', marginTop:4}}>周</Text>
              </TouchableOpacity>
              </View>
              <View style={{flex:1}}>
              <TouchableOpacity style={{ backgroundColor: selectedButton === "month" ? 'white' : null,
                borderRadius: selectedButton === "month" ? 6 : null,
                height: selectedButton === "month" ? 30 : null }}
                onPress={() => handleSelectButton("month")}>
                <Text style={{textAlign:'center', marginTop:4}}>月</Text>
              </TouchableOpacity>
              </View>
              <View style={{flex:1}}>
              <TouchableOpacity style={{ backgroundColor: selectedButton === "year" ? 'white' : null,
                borderRadius: selectedButton === "year" ? 6 : null,
                height: selectedButton === "year" ? 30 : null }}
                onPress={() => handleSelectButton("year")}>
                <Text style={{textAlign:'center', marginTop:4}}>年</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flex:1, justifyContent:'center', marginTop:5, marginLeft:10}}>
            <Text>{income == 1?"总收入：":"总支出："}{sum}</Text>
            <Text>平均值：{sum/numday}</Text>
          </View>
          <View style={{flex:0.3}}></View>
            <Divider orientation='horizontal' color='#aaaaaa' width={3} style={{marginHorizontal:10}} />
          {/* <View style={{flexDirection:'row',flex:1}}>
          </View>   */}
          <View style={{flex:5, marginLeft:-50}}>  
            <LineChart
                data={{
                  labels:
                  url == url1? weekDay :
                  url == url2?Array.from({length: numday}, (_, index) => String(index + 1)) :
                  url == url3?['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'] :
                  null,
                  datasets:[{
                    data:Data
                  }]
                }}
                width={Dimensions.get('window').width+50}
                height={220}
                chartConfig={chartConfig}
                yAxisSuffix=""
                yLabelsOffset={-9999}
                
                withShadow={false} 
                withHorizontalLines={true} 
                withVerticalLines={false} 
                renderDotContent={({ x, y, index }) => <CustomPoint x={x} y={y} index={index}/> }
                />
          </View>
          <View style={{flex:6.7}}>
            <Text style={{fontSize:20, color:'black', marginLeft:10}}>{income?"收入排行榜":"支出排行榜"}</Text>
            <FlatList
            data={Order}

            renderItem={({item})=>{
              return(
                <View style={{flexDirection:'row', height:50, alignItems:'center'}}>
                  <View style={{flex:1}}>
                    <Ionicons name={dic[item.name]} style={{fontSize:40, color:'black'}} />
                  </View>
                  <View style={{flex:2}}>
                    <Text style={{fontSize:18,textAlign:'center', color:'black'}}>{title[item.name]}</Text>
                  </View>
                  <View style={{flex:2}}>
                    <Text style={{fontSize:18,textAlign:'center', color:'black'}}>{item.rate}</Text>
                  </View>
                  <View style={{flex:4}}></View>
                </View>
              )
            }}
            />
          </View>
        </LinearGradient> 
      </SafeAreaView>   
  ); 
};

const styles = StyleSheet.create({});

export default Screen1;