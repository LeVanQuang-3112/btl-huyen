import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Report from './report';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ReportYear from '../Reports/ReportYear';
import DetailSpendScreen from './Detail/detailspend';
import DetailEarnScreen from './Detail/detailearn';
import EatDetailScreen from '../Reports/Detail/Eat';
import SalaryDetailScreen from '../Reports/Detail/Salary';
import SpendDetailScreen from '../Reports/Detail/Spend';
import ClothesDetailScreen from '../Reports/Detail/Clothes';
import AllowanceDetailScreen from '../Reports/Detail/allowance';
import BonusDetailScreen from '../Reports/Detail/Bonus';
import DetailScreen from '../Reports/Detail/DetailComponent';
import DetailIncomeScreen from '../Reports/Detail/DetailIncome';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const ReportScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Report">
      <Stack.Screen name="Báo cáo theo tháng/năm" component={TabScreen} />
      <Stack.Screen name="Ăn uống T3" component={DetailSpendScreen} />
      <Stack.Screen name="Tiền lương T3" component={DetailEarnScreen} />
      <Stack.Screen name="Chi tiêu" component={SpendDetailScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen}
        options={{ headerTitle: "Chi tiết" }} />
      <Stack.Screen name="IncomeDetail" component={DetailIncomeScreen}
        options={{ headerTitle: "Chi tiết" }} />
      {/* <Stack.Screen name="T1" component={ClothesDetailScreen}
        options={{ headerTitle: "Chi tiết" }} />
      
      <Stack.Screen name="Di lại" component={ClothesDetailScreen}
        options={{ headerTitle: "Chi tiết" }} />
        <Stack.Screen name="Chi tiêu test" component={ClothesDetailScreen}
        options={{ headerTitle: "Chi tiết" }} />
      <Stack.Screen name="Thu nhập test" component={ClothesDetailScreen}
        options={{ headerTitle: "Chi tiết" }} />
        <Stack.Screen name="Thu nhập1" component={ClothesDetailScreen}
        options={{ headerTitle: "Chi tiết" }} /> */}
      <Stack.Screen name="Ăn uống" component={AllowanceDetailScreen}
        options={{ headerTitle: "Chi tiết" }} />
      <Stack.Screen name="Tiền thưởng" component={BonusDetailScreen} />
    </Stack.Navigator>
  );
};



const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Hằng tháng" component={Report} />
      <Tab.Screen name="Hằng năm" component={ReportYear} />
    </Tab.Navigator>
  );
};

export default ReportScreen;
