import React from 'react';
import { View,ScrollView, Text } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';

const DetailOutcomeScreen = () => {

  const data = [0, 0, 645000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  const money = ['55,000đ', '50,000đ', '60,000đ', '100,000đ', '60,000đ', '105,000đ','50,000đ','35,000đ','70,000đ', '60,000đ']
  const dates = ['30/03', '27/03', '26/03', '23/03', '20/03', '19/03', '15/03', '14/03', '10/03', '08/03']

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
            svg={{ fill: 'orange' }}
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
            <Text style={{ fontSize: 16 }}>{date} Ăn uống</Text>
            <Text style={{ fontSize: 16 }}>{money[index]}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailOutcomeScreen;
