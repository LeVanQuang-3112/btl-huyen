import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import moment from "moment/moment"
import { formatDate } from 'date-fns';

const ClothesDetailScreen = ({ route }) => {
  const { item } = route?.params
  const data = [0, 200, 138, 338, 0, 169, 338, 200, 0, 138, 169, 0];
  const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  const money = ['169,000đ', '200,000đ', '138,000đ', '338,000đ', '0,000đ', '169,000đ', '338,000đ', '200,000đ', '138,000đ', '169,000đ']
  const dates = [
    { label: 'Tháng 1', value: "01", shotName: "T1" },
    { label: 'Tháng 2', value: "02", shotName: "T2" },
    { label: 'Tháng 3', value: "03", shotName: "T3" },
    { label: 'Tháng 4', value: "04", shotName: "T4" },
    { label: 'Tháng 5', value: "05", shotName: "T5" },
    { label: 'Tháng 6', value: "06", shotName: "T6" },
    { label: 'Tháng 7', value: "07", shotName: "T7" },
    { label: 'Tháng 8', value: "08", shotName: "T8" },
    { label: 'Tháng 9', value: "09", shotName: "T9" },
    { label: 'Tháng 10', value: "10", shotName: "T10" },
    { label: 'Tháng 11', value: "11", shotName: "T11" },
    { label: 'Tháng 12', value: "12", shotName: "T1", }
  ]

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 5 }}>
        <YAxis
          data={dates}
          contentInset={{ top: 10, bottom: 20 }}
          svg={{ fill: 'grey', fontSize: 10 }}
          numberOfTicks={5}
          formatLabel={(value) => `${value.money}`}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <BarChart
            style={{ flex: 1 }}
            data={data}
            svg={{ fill: 'orange' }}
            contentInset={{ top: 10, bottom: 10 }}
            spacingInner={0.2}
            spacingOuter={0.1}
          >
            <Grid />
          </BarChart>
          <XAxis
            style={{ marginHorizontal: 5 }}
            data={dates}
            formatLabel={(value, index) => labels[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 7, fill: 'black' }}
          />
        </View>
      </View>
      <ScrollView style={{ marginTop: 10, marginBottom: 20 }}>
        <View style={{ ...styles.container, marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>Tổng</Text>
          <Text style={{ fontSize: 16 }}>846,434đ</Text>
        </View>
        <View style={{ ...styles.container, marginBottom: 30 }}>
          <Text style={{ fontSize: 16 }}>Trung bình</Text>
          <Text style={{ fontSize: 16 }}>169,286đ</Text>
        </View>
        {dates.map((date, index) => (
          <View key={index} style={styles.container}>
            <Text style={{ fontSize: 16 }}>{date.label}</Text>
            <Text style={{ fontSize: 16 }}>{money[index]}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ClothesDetailScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderColor: 'rgba(117,117,117,0.2)'
  }
})