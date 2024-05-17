import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { getAllExpense, getExpenseByCategoryInYear } from '../../../api/expense';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';


const DetailScreen = () => {
    const route = useRoute();
    const allParams = route.params;
    const currentYear = moment(allParams?.currentYear).format('YYYY')
    const [listExpense, setListExpense] = useState([])

    const data = listExpense.map((item) => item?.totalExpense)
    const labels = data.map((item) => item?.month)
    const money = data.map((item) => item?.totalExpense)
    const dates = data.map((item) => item?.nameMonth)

    useEffect(() => {
        getExpenseByCategoryInYear(allParams?.item?.id ?? '', currentYear).then((res) => {
            setListExpense(res?.data)
        })
    }, [])

    const total = listExpense.reduce((sum, item) => {
        const money = parseInt(item.totalExpense) || 0;
        return sum + money;
    }, 0);


    return (
        <View style={{ flex: 1 }}>
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
                        style={{ marginHorizontal: 5 }}
                        data={data}
                        formatLabel={(value, index) => labels[index]}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 7, fill: 'black' }}
                    />
                </View>
            </View>
            <ScrollView style={{ marginTop: 10, marginBottom: 20 }}>
                <View style={{ ...styles.container, marginTop: 10 }}>
                    <Text style={{ fontSize: 16 }}>Tổng</Text>
                    <Text style={{ fontSize: 16 }}>{total}đ</Text>
                </View>
                <View style={{ ...styles.container, marginBottom: 30 }}>
                    <Text style={{ fontSize: 16 }}>Trung bình</Text>
                    <Text style={{ fontSize: 16 }}>{Math.round(Number(total) / 12)}đ</Text>
                </View>
                {listExpense.map((item, index) => (
                    <View key={index} style={styles.container}>
                        <Text style={{ fontSize: 16 }}>{item?.nameMonth}</Text>
                        <Text style={{ fontSize: 16 }}>{item?.totalExpense}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default DetailScreen;
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