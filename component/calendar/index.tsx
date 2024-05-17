import { format, startOfDay } from "date-fns";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { calculateCalendarData } from "../../hook/calendar/calculateCalendarData";
import Calendar from "./Calendar";
import { useContext, useEffect, useState } from "react";
import { IIncome, IOutcome } from "../../interface";
import { getAllIncome } from "../../api/income";
import { getAllExpense } from "../../api/expense";
import AuthContext from "../../hook/userContext";

export interface IncomeData {
  id?: string;
  date: Date;
  money: number;
  category: {
    id?: string;
    content: string;
  };
}

export interface OutcomeData {
  id?: string;
  date: Date;
  money: number;
  category: {
    id?: string;
    content: string;
  };
}

export const sumTotal = (data, key) => {
  let total = 0;
  data.forEach((v) => {
    total += v[key];
  });
  return total;
};

export default function CalendarScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [listIncome, setListIncome] = useState<IIncome[]>([]);
  const [listOutcome, setListOutcome] = useState<IOutcome[]>([]);
  const { up } = useContext(AuthContext);

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
  }, [up]);

  const data = calculateCalendarData(listOutcome, listIncome);
  const filteredData = data.filter(
    (d) =>
      startOfDay(new Date(d.time)).getMonth() === date.getMonth() &&
      startOfDay(new Date(d.time)).getFullYear() === date.getFullYear()
  );

  const totalIncome = sumTotal(filteredData, "totalIncome");
  const totalOutcome = sumTotal(filteredData, "totalOutcome");

  return (
    <ScrollView>
      {/* <Calendar
        date={date}
        setDate={setDate}
        filteredData={filteredData}
        navigation={navigation}
      /> */}
      <View
        style={{ display: "flex", flexDirection: "row", paddingVertical: 16 }}
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
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2089DC" }}>
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
      {filteredData.map((d, index) => (
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
                color: d.totalIncome - d.totalOutcome >= 0 ? "#2089DC" : "red",
              }}
            >
              {d.totalIncome - d.totalOutcome}
            </Text>
          </View>
          {d.outcome.map((outcome, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("Edit outcome", {
                  outcome,
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
                  {outcome.category.content}
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
                    style={{ fontSize: 18, fontWeight: "bold", color: "red" }}
                  >
                    {outcome.money}
                  </Text>
                  <Entypo name="chevron-right" size={24} />
                </View>
              </View>
              {index < d.outcome.length - 1 || d.income.length ? (
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
    </ScrollView>
  );
}
