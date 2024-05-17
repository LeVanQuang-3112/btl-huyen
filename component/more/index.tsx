import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

export const MoreItem = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingVertical: 12,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 16 }}>{name}</Text>
        <Entypo name="chevron-right" size={24} />
      </View>
    </TouchableOpacity>
  );
};

const Devider = () => {
  return (
    <View style={{ width: "100%", height: 1, backgroundColor: "#fff" }}></View>
  );
};

const MoreScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 24, paddingTop: 36, display: "flex", gap: 36 }}>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: "#EAEFD6",
          paddingHorizontal: 24,
        }}
      >
        <MoreItem
          name={"Tìm kiếm giao dịch"}
          onPress={() => navigation.navigate("Search")}
        ></MoreItem>
      </View>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: "#EAEFD6",
          paddingHorizontal: 24,
        }}
      >
        <MoreItem
          name={"So sánh thu chi"}
          onPress={() => navigation.navigate("Compare")}
        ></MoreItem>
      </View>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: "#EAEFD6",
          paddingHorizontal: 24,
        }}
      >
        <MoreItem
          name={"Chi tiêu cố định"}
          onPress={() => navigation.navigate("Fixed spend")}
        ></MoreItem>
        <Devider />
        <MoreItem
          name={"Thu nhập cố định"}
          onPress={() => navigation.navigate("Fixed income")}
        ></MoreItem>
      </View>

      <View
        style={{
          borderRadius: 20,
          backgroundColor: "#EAEFD6",
          paddingHorizontal: 24,
        }}
      >
        <MoreItem
          name={"Quản lý danh mục chi tiêu"}
          onPress={() => navigation.navigate("QuanLyDanhMuc")}
        ></MoreItem>
        <Devider />

        <MoreItem
          name={"Quản lý danh mục thu nhập"}
          onPress={() => navigation.navigate("QuanLyDanhMucIncome")}
        ></MoreItem>
      </View>
    </View>
  );
};

export default MoreScreen;
