import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Entypo from "react-native-vector-icons/Entypo";
import { getAllIncome, getIncomeByCategoryInYear } from '../../api/income';
import { getAllExpense } from '../../api/expense';
import { getAllFixedExpense } from '../../api/fixed-expense';
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash'
import { getAllExpenseByUserAndCategory } from '../../api/category-expense';
import { getAllIncomeByUserAndCategory } from '../../api/category-income';

const colors = ["orange", "red", "cyan"];

const ReportYear = ({ navigation }) => {
  const [currentYear, setCurrentYear] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('Chi tiêu');
  const [dataDashboard, setDataDashboard] = useState([])
  const [incomeDashboard, setIncomeDashboard] = useState([])

  const goToPreviousYear = () => {
    const nextDate = new Date(currentYear.getFullYear() - 1, currentYear.getMonth(), 1);
    setCurrentYear(nextDate);
  };

  const goToNextYear = () => {
    const nextDate = new Date(currentYear.getFullYear() + 1, currentYear.getMonth(), 1);
    setCurrentYear(nextDate);
  };

  const isFocus = useIsFocused()

  const formattedCurrentYear = `${currentYear.getFullYear()}`;
  const [incomes, setIncomes] = useState([])
  useEffect(() => {
    // getAllIncome()
    //   .then((res) => {
    //     const totalMoney = res.data.reduce((pre, cur) => pre + cur.money, 0);
    //     const chartData = res.data.map((item, index) => ({
    //       key: index,
    //       value: parseInt((item.money / totalMoney) * 10000) / 100,
    //       label: item.note,
    //       money: item.money,
    //       route: item.category_income.content,
    //       color: colors[index % 3],
    //       totalMoney: totalMoney,
    //       date: item?.date
    //     }));
    //     setIncomes(chartData);
    //   })


  }, [isFocus]);
  const [expenses, setExpenses] = useState([])


  // useEffect(() => {
  //   getAllExpense()
  //     .then(async (res) => {

  //       const filteredData = await _.filter(res.data, item => {
  //         const itemYear = new Date(item.date).getFullYear();
  //         console.log(itemYear, 'itemYear')
  //         if (itemYear == formattedCurrentYear) {
  //           return item
  //         }
  //       });

  //       const totalMoney1 = filteredData.reduce((pre, cur) => pre + cur.money, 0);
  //       const chartData1 = filteredData.map((item, index) => ({
  //         key: index,
  //         value: parseInt((item.money / totalMoney1) * 10000) / 100,
  //         label: item.note,
  //         money: item.money,
  //         route: item.category_expense.content,
  //         color: colors[index % 3],
  //         totalMoney: totalMoney1
  //       }));
  //       setExpenses(chartData1);
  //     })
  // }, [isFocus, formattedCurrentYear]);

  useEffect(() => {
    getAllExpenseByUserAndCategory(formattedCurrentYear).then(async (res) => {
      setDataDashboard(res.data)
    })
  }, [isFocus, formattedCurrentYear])

  useEffect(() => {
    getAllIncomeByUserAndCategory(formattedCurrentYear).then(async (res) => {
      setIncomeDashboard(res.data)
    })
  }, [isFocus, formattedCurrentYear])

  console.log(incomeDashboard, 'income')


  const total = dataDashboard.reduce((sum, item) => {
    // Chuyển đổi totalMoney sang số nguyên, nếu null hoặc undefined thì coi như 0
    const money = parseInt(item.totalMoney) || 0;
    return sum + money;
  }, 0);

  const totalIncome = incomeDashboard.reduce((sum, item) => {
    // Chuyển đổi totalMoney sang số nguyên, nếu null hoặc undefined thì coi như 0
    const money = parseInt(item.totalMoney) || 0;
    return sum + money;
  }, 0);

  const colors = ['#FF6347', '#6A5ACD', '#FFD700', '#ADFF2F', '#FF69B4', '#8A2BE2', '#DC143C', '#00FA9A'];

  const shuffleArray = (array) => {
    let newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffledColors = shuffleArray(colors);

  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={goToPreviousYear} hitSlop={{ right: 10, top: 10, left: 10, bottom: 10 }}>
            <Entypo name="chevron-left" size={24} />
          </TouchableOpacity>
          <View style={[styles.monthContainer]}>
            <Text style={styles.month}>{formattedCurrentYear}</Text>
          </View>
          <TouchableOpacity onPress={goToNextYear} hitSlop={{ right: 10, top: 10, left: 10, bottom: 10 }}>
            <Entypo name="chevron-right" size={24} />
          </TouchableOpacity>
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
      </View>
      {selectedTab === 'Chi tiêu' && (
        <View>
          <PieChart
            style={{ height: 200 }}
            data={dataDashboard.map((item, index) => ({
              key: item.content,
              value: item.totalMoney,
              svg: { fill: shuffledColors[index % shuffledColors.length] },
            }))}
            innerRadius="30%"
            outerRadius="70%"
          />
          <View style={styles.chartLabel}>
            <Text style={styles.labelText}>Tổng</Text>
            <Text style={styles.valueText}>{total}đ</Text>
          </View>
          <View style={{ height: 20 }} />
          <View style={styles.chartLabels}>
            {dataDashboard.map((item) => {
              return (
                <TouchableOpacity key={item.key} style={styles.chartLabel} onPress={() => navigation.navigate('DetailScreen', { item, currentYear })}
                  navigation={navigation}>
                  <Text style={styles.labelText}>{item.content}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.valueText}>{item.money} {" "}
                      <Text style={{ fontSize: 12, color: "gray" }}>
                        {item.totalMoney ?? 0}
                      </Text>
                    </Text>
                    <Entypo name="chevron-right" size={16} color={'gray'} />
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      )}
      {selectedTab === 'Thu nhập' && (
        <View>
          <PieChart
            style={{ height: 200 }}
            data={incomeDashboard.map((item, index) => ({
              key: item.content,
              value: item.totalMoney,
              svg: { fill: shuffledColors[index % shuffledColors.length] },
            }))}
            innerRadius="30%"
            outerRadius="70%"
          />
          <View style={styles.chartLabel}>
            <Text style={styles.labelText}>Tổng</Text>
            <Text style={styles.valueText}>{totalIncome}đ</Text>
          </View>
          <View style={{ height: 20 }} />
          <View style={styles.chartLabels}>
            {incomeDashboard.map((item) => {
              return (
                <TouchableOpacity key={item.key} style={styles.chartLabel} onPress={() => navigation.navigate('IncomeDetail', { item, currentYear })}
                  navigation={navigation}>
                  <Text style={styles.labelText}>{item.content}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.valueText}>{item.money} {" "}
                      <Text style={{ fontSize: 12, color: "gray" }}>
                        {item.totalMoney ?? 0}
                      </Text>
                    </Text>
                    <Entypo name="chevron-right" size={16} color={'gray'} />
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20
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
    borderRadius: 10,
    height: 40,
    width: Dimensions.get("screen").width - 100,
    justifyContent: 'center',
  },
  month: {
    fontSize: 20,
    color: 'black',
    textAlign: "center"
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
    color: 'red',
    marginRight: 2,
  },
  earnText: {
    fontSize: 20,
    color: 'green',
    marginRight: 2,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabRow: {
    paddingTop: 15,
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
    fontSize: 16,
    color: '#CCCCCC',
  },
  chartLabels: {
    marginTop: 10,
  },
  chartLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderColor: 'rgba(117,117,117,0.2)'
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

export default ReportYear;