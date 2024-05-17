import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';

const Compared = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('Chi tiêu');

  const goToPreviousYear = () => {
    const previousYear = new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1);
    setCurrentMonth(previousYear);
  };

  const goToNextYear = () => {
    const nextYear = new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1);
    setCurrentMonth(nextYear);
  };

  const formattedCurrentYear = currentMonth.getFullYear().toString();

  // Dữ liệu và nhãn cho biểu đồ
  const data = [0, 2465000, 5840000, 5840000, 5840000, 5840000, 5840000, 5840000, 5840000, 5840000, 5840000, 5840000];
  const dataText = ['0đ', '2,465,000đ', '5,840,000đ', '5,840,000đ', '5,840,000đ', '5,840,000đ', '5,840,000đ', '5,840,000đ', '5,840,000đ', '5,840,000đ', '5,840,000đ', '5,840,000đ'];
  const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={goToPreviousYear}>
          <Text style={[styles.button]}>{'<'}</Text>
        </TouchableOpacity>
        <View style={[styles.yearContainer]}>
          <Text style={styles.year}>{formattedCurrentYear}</Text>
        </View>
        <TouchableOpacity onPress={goToNextYear}>
          <Text style={[styles.button]}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 200, flexDirection: 'row' }}>
        <YAxis
          data={data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fill: 'grey', fontSize: 10 }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}`}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, marginTop: 10 }}
            data={data}
            formatLabel={(value, index) => labels[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {labels.map((label, index) => (
          <View key={index} style={styles.dataItem}>
            <Text style={styles.labelText}>{label}</Text>
            <Text style={styles.dataText}>{dataText[index]}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yearContainer: {
    backgroundColor: '#FFF2CC',
    paddingHorizontal: 70,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
  },
  year: {
    fontSize: 20,
    color: 'black',
  },
  button: {
    fontSize: 50,
    color: 'orange',
  },
  scrollView: {
    marginTop: 10,
    maxHeight: 300, // Giới hạn chiều cao của ScrollView
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    padding: 10,
    marginBottom: 5,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataText: {
    fontSize: 16,
    marginRight: 2,
  },
});

export default Compared;
