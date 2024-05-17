import React from 'react';
import { View,ScrollView, Text } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';

const DetailEarnScreen = () => {

  const data = [0, 0, 4000000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  const money = ['4,000,000đ']
  const dates = ['19/03']

  return (
    <View style={{}}>
      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 5 }}>
        <YAxis
          data={data}
          contentInset={{ top: 10, bottom: 20 }}
          svg={{ fill: 'grey', fontSize: 10 }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}`}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <BarChart
            style={{ flex: 1 }}
            data={data}
            svg={{ fill: 'green' }}
            contentInset={{ top: 10, bottom: 10 }}
            spacingInner={0.2}
            spacingOuter={0.1}
          >
            <Grid />
          </BarChart>
          <XAxis
            style={{ marginHorizontal: 5}}
            data={data}
            formatLabel={(value, index) => labels[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 7, fill: 'black' }}
          />
        </View>
      </View>
      <ScrollView style={{marginTop: 10, maxHeight: 350 }}>
        {dates.map((date, index) => (
          <View key={index} style={{flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  borderBottomWidth: 2,
                                  padding: 10,
                                  marginBottom: 5,}}>
            <Text style={{ fontSize: 16 }}>{date} Tiền lương</Text>
            <Text style={{ fontSize: 16 }}>{money[index]}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailEarnScreen;
