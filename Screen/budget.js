import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 修正的导入
import { settoken, gettoken, getLoginInfo, clearLoginInfo } from '../globals';

const { width } = Dimensions.get('window');
const API_BASE_URL = 'http://120.55.68.146:8089';

const dic = {
  "eating":"餐饮",
  "clothes":"购物",
  'living':"住房",
  'going':"交通",
  'other':"其它",
}


const budgetScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newBudget, setNewBudget] = useState('');
  const [API_DATA, setAPI_DATA] = useState(
  {
    "wish": {
    "clothes": 0,
    "eating": 0,
    "living": 0,
    "going": 0,
    "other": 0
},
"spending": {
    "clothes": 0,
    "eating": 0,
    "living": 0,
    "going": 0,
    "other": 0
}});
  const [wish, setwish] = useState({});
  const [spending, setspending] = useState({});
  //const [token, settoken] = useState('')

  

  const fetchBudgetData = () => {
    const token = gettoken();
    fetch(`${API_BASE_URL}/getbudget/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token})
      })
      .then(response => response.json())
      .then(data => {
        setAPI_DATA(data)
        setwish(data.wish)
        setspending(data.spending)
     })
     .catch(error => console.error(error));
     
  };

  const updateBudget = () => {
    const token = gettoken();
    fetch(`${API_BASE_URL}/month_budget/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, kind:selectedCategory, number:parseInt(newBudget, 10) })
      })
      .then(response => response.json())
      .then(data => {
        
     })
     .catch(error => console.error(error));
  }

  const getIconName = (category) => {
    let iconName;
    switch (category) {
      case 'clothes':
        iconName = 'cart-outline';
        break;
      case 'eating':
        iconName = 'restaurant-outline';
        break;
      case 'living':
        iconName = 'home-outline';
        break;
      case 'going':
        iconName = 'car-sport-outline';
        break;
      case 'other':
        iconName = 'ellipsis-horizontal-circle-outline';
        break;
      default:
        iconName = 'ios-help-circle';
    }
    return iconName;
  };

  const calculateTotal = (category) => {
    const { wish, spending } = API_DATA;
    return wish[category] - spending[category];
  };

  useEffect(() => {
    fetchBudgetData()
}, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>每日记账</Text>
      <View style={[styles.totalContainer, { backgroundColor: 'pink', marginBottom: 30 }]}>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabelText}>剩余预算</Text>
        </View>
        <Text style={styles.totalAmountText}>
         {Object.keys(API_DATA.wish).reduce((acc, category) => acc + calculateTotal(category), 0)}
          {/* {API_DATA.wish.clothes} */}
        </Text>
        <View style={{height:20}}></View>
        <View style={{ flexDirection: 'row'}}>
          <View style={{flex:1}}><Text style={styles.totalBudgetText}>月预算: {Object.values(API_DATA.wish).reduce((acc, val) => acc + val, 0)}</Text></View>
          <View style={{flex:1}}><Text style={styles.totalSpendingText}>月支出: {Object.values(API_DATA.spending).reduce((acc, val) => acc + val, 0)}</Text></View>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        {Object.keys(API_DATA.wish).map((category, index) => (
          <TouchableOpacity key={index} onPress={() => { setSelectedCategory(category); setModalVisible(true); }}>
            <View style={[styles.totalContainer, { backgroundColor: 'pink', marginBottom: 20, width: width * 0.9 }]}>
              <View style={styles.totalItem}>
                <View style={[styles.iconContainer, { marginLeft: 0.5 }]}>
                  <View style={{backgroundColor:'white', borderRadius:300, height:50, width:50, justifyContent:'center', alignItems:'center'}} ><Ionicons name={getIconName(category)} size={30} color="black" /></View>
                </View>
                <View style={{ flex: 1, marginLeft: 10, alignSelf: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={[styles.totalLabelText, { marginBottom: 5 }]}>剩余预算</Text>
                  </View>
                  <Text style={[styles.totalAmountText, { fontSize: 24, fontWeight: 'bold', marginLeft: 5 }]}>
                    {calculateTotal(category)}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={styles.categoryBudgetText}>月预算: {API_DATA.wish[category]}</Text>
                      <Text style={styles.categorySpendingText}>月支出: {API_DATA.spending[category]}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* 修改预算的模态框 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>修改 {dic[selectedCategory]} 的月预算</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNewBudget}
              value={newBudget}
              keyboardType="numeric"
            />
            <View style={{flex:1,flexDirection:'row'}}>
            <Button title="取消" onPress={()=>setModalVisible(false)} />
            <Button title="保存" onPress={()=>{updateBudget(),setModalVisible(false),fetchBudgetData()}} /></View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  header: {
    fontSize: 30,
    color:'black',
    fontWeight: 'bold',
    marginTop:20,
    marginBottom: 20,
  },
  totalContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
  },
  totalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  totalLabelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'black',
  },
  totalAmountText: {
    fontSize: 30,
    marginLeft: 5,
    fontWeight: 'bold',
    color:'black',
  },
  totalBudgetText: {
    fontSize: 14,
    color:'black',
  },
  totalSpendingText: {
    fontSize: 14,
    color:'black',
  },
  categoriesContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: '25%',
    alignItems: 'center',
    borderRadius:100,
    // flex:0.6
  },
  categoryBudgetText: {
    fontSize: 14,
    color:'black',
  },
  categorySpendingText: {
    fontSize: 14,
    color:'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height:200,
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 100,
  },
});
export default budgetScreen;