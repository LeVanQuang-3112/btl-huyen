import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { calculateCalendarData } from "../../../hook/calendar/calculateCalendarData";
import { getAllIncome } from "../../../api/income";
import { IIncome, IOutcome } from "../../../interface";
import { getAllExpense } from "../../../api/expense";
import { sumTotal } from "../../calendar";

const Search = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const [listIncome, setListIncome] = useState<IIncome[]>([]);
  const [listOutcome, setListOutcome] = useState<IOutcome[]>([]);

  useEffect(() => {
    getAllIncome()
      .then((res) =>
        setListIncome(
          res.data.map((income) => ({
            ...income,
            category: income.category_income,
          }))
        )
      )
      .catch((err) => console.log(err));
    getAllExpense()
      .then((res) =>
        setListOutcome(
          res.data.map((expense) => ({
            ...expense,
            category: expense.category_expense,
          }))
        )
      )
      .catch((err) => console.log(err));
  }, []);

  const data = calculateCalendarData(
    listOutcome.filter((item) =>
      item.category.content.toLowerCase().includes(search.toLowerCase())
    ),
    listIncome.filter((item) =>
      item.category.content.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalIncome = sumTotal(data, "totalIncome");
  const totalOutcome = sumTotal(data, "totalOutcome");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ display: "flex", flex: 1 }}>
        <View style={{ padding: 8 }}>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <AntDesign name="search1" size={20} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <TextInput
                style={{ flex: 1, fontSize: 16, padding: 4 }}
                value={search}
                onChangeText={(v) => setSearch(v)}
                placeholder="Tìm kiếm"
              />

              {!!search.length && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <AntDesign name="closecircle" size={16} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: 16,
            }}
          >
            <View
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>Thu nhập</Text>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#2089DC" }}
              >
                {totalIncome}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>Chi tiêu</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
                {totalOutcome}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>Tổng</Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: totalIncome >= totalOutcome ? "#2089DC" : "red",
                }}
              >
                {totalIncome - totalOutcome}
              </Text>
            </View>
          </View>
          {data.map((d, index) => (
            <View key={index}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  backgroundColor: "#EAEFD6",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  {format(new Date(d.time), "dd/MM/yyyy")}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color:
                      d.totalIncome - d.totalOutcome >= 0 ? "#2089DC" : "red",
                  }}
                >
                  {d.totalIncome - d.totalOutcome}
                </Text>
              </View>
              {d.outcome.map((spend, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("Edit spend", {
                      spend,
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
                      paddingVertical: 8,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {spend.category.content}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {spend.money}
                      </Text>
                      <Entypo name="chevron-right" size={24} />
                    </View>
                  </View>
                  {index < d.income.length - 1 || d.income.length ? (
                    <View
                      style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: "#657D81",
                      }}
                    ></View>
                  ) : null}
                </TouchableOpacity>
              ))}
              {d.income.map((income, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("Edit income", {
                      income,
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
                      paddingVertical: 8,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {income.category.content}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#2089DC",
                        }}
                      >
                        {income.money}
                      </Text>
                      <Entypo name="chevron-right" size={24} />
                    </View>
                  </View>
                  {index < d.income.length - 1 ? (
                    <View
                      style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: "#657D81",
                      }}
                    ></View>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Search;
