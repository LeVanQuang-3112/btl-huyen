import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';


const Report = ({ navigation }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('Chi tiêu');

  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(previousMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(nextMonth);
  };

  const formattedCurrentMonth = `${currentMonth.getMonth() + 1}/${currentMonth.getFullYear()}`;

  const [pieChartData1] = useState([
    {key: 1,value: 57, label: 'Ăn uống', color: 'orange',money: '645,000đ'},
    {key: 2,value: 13, label: 'Y tế', color: 'red',money:'150,000đ' },
    {key: 3,value: 3, label: 'Giáo dục', color: 'cyan',money:'30,000đ' },
    {key: 4,value: 27, label: 'Đi lại', color: 'brown',money:'300,000đ' }
  ]);

  const [pieChartData2] = useState([
    {key: 1,value: 57, label: 'Tiền lương', color: 'green',money: '4,000,000đ'},
    {key: 2,value: 13, label: 'Tiền thưởng', color: 'red',money:'500,000đ' }
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={[styles.button]}>{'<'}</Text>
        </TouchableOpacity>
        <View style={[styles.monthContainer]}>
          <Text style={styles.month}>{formattedCurrentMonth}</Text>
        </View>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={[styles.button]}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rectRow}>
        <View style={[styles.smallrect]}>
          <View style={styles.textRow}>
            <Text style={styles.rectText}>Chi tiêu</Text>
            <Text style={styles.spendText}>-1,125,000đ</Text>
          </View>
        </View>
        <View style={[styles.smallrect]}>
          <View style={styles.textRow}>
            <Text style={styles.rectText}>Thu nhập</Text>
            <Text style={styles.earnText}>+4,500,000đ</Text>
          </View>
        </View>
      </View>
      <View style={styles.bigrect}>
        <View style={styles.textRow}>
          <Text style={styles.rectText}>Thu Chi</Text>
          <Text style={styles.earnText}>+3,375,000đ</Text>
        </View>
      </View>
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Chi tiêu' ? styles.selectedTab : styles.unselectedTab]}
          onPress={() => setSelectedTab('Chi tiêu')}>
          <Text style={[styles.tabText, selectedTab === 'Chi tiêu' ? styles.selectedTabText : styles.unselectedtabText]}>Chi tiêu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Thu nhập' ? styles.selectedTab : styles.unselectedTab]}
          onPress={() => setSelectedTab('Thu nhập')}>
          <Text style={[styles.tabText, selectedTab === 'Thu nhập' ? styles.selectedTabText : styles.unselectedtabText]}>Thu nhập</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'Chi tiêu' && (
        <View>
          <PieChart
            style={{ height: 200 }}
            data={pieChartData1.map((item) => ({
              key: item.key,
              value: item.value,
              svg: { fill: item.color },
            }))}
            innerRadius="30%"
            outerRadius="70%"
          />
          <View style={styles.chartLabels}>
            {pieChartData1.map((item) => (
              <TouchableOpacity key={item.key} style={styles.chartLabel}onPress={() => navigation.navigate('Ăn uống T3')}
              navigation={navigation}>
                <Text style={styles.labelText}>{item.label}</Text>
                <Text style={styles.valueText}>{item.money} {item.value}%</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      {selectedTab === 'Thu nhập' && (
        <View>
          <PieChart
            style={{ height: 200 }}
            data={pieChartData2.map((item) => ({
              key: item.key,
              value: item.value,
              svg: { fill: item.color },
            }))}
            innerRadius="30%"
            outerRadius="70%"
          />
          <View style={styles.chartLabels}>
            {pieChartData2.map((item) => (
              <TouchableOpacity key={item.key} style={styles.chartLabel}onPress={() => navigation.navigate('Tiền lương T3')}
              navigation={navigation}>
                <Text style={styles.labelText}>{item.label}</Text>
                <Text style={styles.valueText}>{item.money} {item.value}%</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  selectedTabMessage: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'orange'
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthContainer: {
    backgroundColor: '#FFF2CC',
    paddingHorizontal: 90,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
  },
  month: {
    fontSize: 20,
    color: 'black',
  },
  button: {
    fontSize: 50,
    color: 'orange',
  },
  rectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallrect: {
    width: 170,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black', 
  },
  bigrect: {
    marginTop: 10,
    alignSelf: 'center',
    width: 355,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black', 
  },
  rectText: {
    fontSize: 10,
    marginLeft: 2, 
  },
  spendText: {
    fontSize: 20,
    color:'red',
    marginRight : 2,
  },
  earnText: {
    fontSize: 20,
    color:'green',
    marginRight : 2,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'orange', 
  },
  unselectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC', 
  },
  selectedTabText: {
    fontSize: 16,
    color: 'orange', 
  },
  unselectedtabText: {
    fontSize:  16,
    color: '#CCCCCC', 
  },
  chartLabels: {
    marginTop: 10,
  },
  chartLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    padding: 10,
    marginBottom: 5,
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 14,
    color: 'black',
  },
});

export default Report;