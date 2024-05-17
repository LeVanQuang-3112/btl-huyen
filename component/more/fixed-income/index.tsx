import Entypo from "react-native-vector-icons/Entypo";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { intervals } from "../fixed-outcome";
import { getAllFixedIncome } from "../../../api/fixed-income";
import AuthContext from "../../../hook/userContext";

const FixedIncome = ({ navigation }) => {
  const [fixedIncomeList, setFixedIncomeList] = useState([]);
  const { up } = useContext(AuthContext);

  useEffect(() => {
    getAllFixedIncome()
      .then((res) =>
        setFixedIncomeList(
          res.data.map((data) => ({ ...data, category: data.category_income }))
        )
      )
      .catch((e) => console.log(e));
  }, [up]);

  console.log({ fixedIncomeList });

  return (
    <View style={{ padding: 16, paddingTop: 32 }}>
      <View
        style={{
          backgroundColor: "#EAEFD6",
          borderRadius: 16,
        }}
      >
        {fixedIncomeList.map((data, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("Edit fixed income", {
                data,
              })
            }
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 8,
                paddingLeft: 16,
                paddingVertical: 12,
              }}
            >
              <View style={{ display: "flex", gap: 4 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {data.title}
                </Text>
                <View
                  style={{
                    paddingLeft: 4,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 10 }}>{data.category.content}</Text>
                  <Entypo name="dot-single" />
                  <Text style={{ fontSize: 10 }}>{data.interval}</Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#2089DC" }}
                >
                  {data.money}
                </Text>
                <Entypo name="chevron-right" size={24} />
              </View>
            </View>
            {index < fixedIncomeList.length - 1 ? (
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "#fff",
                }}
              ></View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FixedIncome;
