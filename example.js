import React, { useState } from 'react';
import { View, Picker } from 'react-native';

const IncomeExpensePicker = () => {
    const [selectedValue, setSelectedValue] = useState('income');

    return (
        <View>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) =>
                    setSelectedValue(itemValue)
                }>
                <Picker.Item label="收入" value="income" />
                <Picker.Item label="支出" value="expense" />
            </Picker>

            {/* 根据选择显示不同内容 */}
            {selectedValue === "income" && (
                <Text>您选择了：收入</Text>
            )}
            
            {selectedValue === "expense" && (
                <Text>您选择了：支出</Text>
            )}
        </View>
    );
};

export default IncomeExpensePicker;