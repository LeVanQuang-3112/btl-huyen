import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "native-base";
import EditIncome from "../../component/calendar/edit/income";
import EditOutcome from "../../component/calendar/edit/outcome";
import MoreScreen from "../../component/more";
import Compared from "../../component/more/compare/Compared";
import FixedIncome from "../../component/more/fixed-income";
import AddFixedIncome from "../../component/more/fixed-income/add";
import FixedOutcome from "../../component/more/fixed-outcome";
import AddFixedOutcome from "../../component/more/fixed-outcome/add";
import Search from "../../component/more/search/Search";
import EditFixedOutcome from "../../component/more/fixed-outcome/edit";
import EditFixedIncome from "../../component/more/fixed-income/edit";
import QuanLyDanhMuc from "../../component/more/QuanLyDanhMuc";
import { useEffect, useState } from "react";
import { getAllCategoryExpense } from "../../api/category-expense";
import QuanLyDanhMucIncome from "../../component/more/QuanLyDanhMucIncome";

const Stack = createStackNavigator();

const MoreStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Khác 2">
      <Stack.Screen
        name="Khác "
        component={MoreScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerTitle: "Tìm kiếm (toàn thời gian)" }}
      />
      <Stack.Screen
        name="Compare"
        component={Compared}
        options={{ headerTitle: "Số dư" }}
      />
      <Stack.Screen
        name="Fixed spend"
        component={FixedOutcome}
        options={{
          headerTitle: "Chi tiêu cố định",
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("Add fixed spend")}
              variant="link"
            >
              Thêm
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="Fixed income"
        component={FixedIncome}
        options={{
          headerTitle: "Thu nhập cố định",
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("Add fixed income")}
              variant="link"
            >
              Thêm
            </Button>
          ),
        }}
      />

      <Stack.Screen
        name="Add fixed income"
        component={AddFixedIncome}
        options={{
          headerTitle: "Thêm thu nhập cố định",
        }}
      />
      <Stack.Screen
        name="Add fixed spend"
        component={AddFixedOutcome}
        options={{ headerTitle: "Thêm chi tiêu cố định" }}
      />
      <Stack.Screen
        name="QuanLyDanhMuc"
        component={QuanLyDanhMuc}
        options={{ headerTitle: "Quản lý danh mục chi tiêu" }}
      />

      <Stack.Screen
        name="QuanLyDanhMucIncome"
        component={QuanLyDanhMucIncome}
        options={{ headerTitle: "Quản lý danh mục thu nhập" }}
      />
      <Stack.Screen
        name="Edit fixed spend"
        component={EditFixedOutcome}
        options={{ headerTitle: "Chỉnh sửa chi tiêu cố định" }}
      />
      <Stack.Screen
        name="Edit fixed income"
        component={EditFixedIncome}
        options={{ headerTitle: "Chỉnh sửa thu nhập cố định" }}
      />
      <Stack.Screen
        name="Edit spend"
        component={EditOutcome}
        options={{ headerTitle: "Chỉnh sửa" }}
      />
      <Stack.Screen
        name="Edit income"
        component={EditIncome}
        options={{ headerTitle: "Chỉnh sửa" }}
      />
    </Stack.Navigator>
  );
};

export default MoreStack;
