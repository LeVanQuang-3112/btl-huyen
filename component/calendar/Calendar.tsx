// import DateTimePicker from "@react-native-community/datetimepicker";
// import {
//   endOfDay,
//   endOfMonth,
//   endOfWeek,
//   format,
//   startOfDay,
//   startOfMonth,
//   startOfWeek,
//   startOfYear,
// } from "date-fns";
// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import Entypo from "react-native-vector-icons/Entypo";
// import { fixedIncomeList } from "../more/fixed-income";
// import { fixedOutcomeList, intervals } from "../more/fixed-outcome";
// import { IFixedIncome, IFixedOutcome } from "../../interface";

// const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

// const Calendar = ({ date, setDate, filteredData, navigation }) => {
//   const [list, setList] = useState<Date[]>([]);
//   const [lastPress, setLastPress] = useState(0);
//   const [fixedIncomeList, setFixedIncomeList] = useState<IFixedIncome[]>([]);
//   const [fixedOutcomeList, setFixedOutcomeList] = useState<IFixedOutcome[]>([]);

//   useEffect(() => {
//     const d = new Date(date);
//     d.setDate(d.getDate() - 1);
//     let startDate = startOfWeek(startOfMonth(date));
//     let endDate = endOfWeek(endOfMonth(date));

//     if (startDate.getDate() === 1) {
//       startDate.setDate(startDate.getDate() - 6);
//     } else {
//       startDate.setDate(startDate.getDate() + 1);
//     }

//     if (endDate.getDate() === 6) {
//       endDate.setDate(endDate.getDate() - 6);
//     } else {
//       endDate.setDate(endDate.getDate() + 1);
//     }

//     let listDay = [];

//     while (startOfDay(startDate).getTime() <= startOfDay(endDate).getTime()) {
//       listDay = [...listDay, startDate.getTime()];
//       startDate.setDate(startDate.getDate() + 1);
//     }

//     setList(listDay);
//   }, [date]);

//   const handleDoublePress = (date: Date) => {
//     const delta = new Date().getTime() - lastPress;

//     if (delta < 200) {
//       navigation.navigate("Add", { date });
//     }

//     setLastPress(new Date().getTime());
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View
//         style={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//           flexBasis: 0,
//           justifyContent: "space-between",
//           padding: 8,
//         }}
//       >
//         <TouchableOpacity
//           onPress={() => {
//             const newDate = new Date(date);
//             newDate.setMonth(newDate.getMonth() - 1);
//             setDate(newDate);
//           }}
//         >
//           <Entypo name="chevron-left" size={24} />
//         </TouchableOpacity>
//         <DateTimePicker
//           value={date}
//           onChange={(e, date) => {
//             setDate(date);
//           }}
//         />
//         <TouchableOpacity
//           onPress={() => {
//             const newDate = new Date(date);
//             newDate.setMonth(newDate.getMonth() + 1);
//             setDate(newDate);
//           }}
//         >
//           <Entypo name="chevron-right" size={24} />
//         </TouchableOpacity>
//       </View>
//       <View>
//         <View style={style.dateContainer}>
//           {days.map((day, index) => {
//             return (
//               <Text
//                 style={{
//                   ...style.dateItem,
//                   color:
//                     day === "T7" ? "#2089DC" : day === "CN" ? "red" : "#fff",
//                 }}
//                 key={index}
//               >
//                 {day}
//               </Text>
//             );
//           })}
//         </View>

//         <View style={style.dateContainer}>
//           {list.map((d, index) => {
//             const filter = filteredData.find(
//               (data) =>
//                 new Date(data.time).getDate() === new Date(d).getDate() &&
//                 new Date(data.time).getMonth() === new Date(d).getMonth()
//             );

//             let totalOutcome = filter?.totalOutcome || 0;
//             let totalIncome = filter?.totalIncome || 0;

//             fixedIncomeList.forEach((e) => {
//               switch (e.interval) {
//                 case intervals.daily: {
//                   if (
//                     startOfDay(e.startDate).getTime() <=
//                       new Date(d).getTime() &&
//                     endOfDay(e.endDate).getTime() >= new Date(d).getTime()
//                   ) {
//                     totalIncome += e.money;
//                   }
//                   break;
//                 }
//                 case intervals.monthly: {
//                   if (
//                     startOfMonth(e.startDate).getTime() <=
//                       startOfMonth(new Date(d)).getTime() &&
//                     startOfMonth(e.endDate).getTime() >=
//                       startOfMonth(new Date(d)).getTime() &&
//                     new Date(d).getDate() === e.startDate.getDate()
//                   ) {
//                     totalIncome += e.money;
//                   }
//                   break;
//                 }

//                 case intervals.yearly: {
//                   if (
//                     startOfYear(e.startDate).getTime() <=
//                       startOfYear(new Date(d)).getTime() &&
//                     startOfYear(e.endDate).getTime() >=
//                       startOfYear(new Date(d)).getTime() &&
//                     new Date(d).getDate() === e.startDate.getDate()
//                   ) {
//                     totalIncome += e.money;
//                   }
//                   break;
//                 }
//               }
//             });

//             fixedOutcomeList.forEach((e) => {
//               switch (e.interval) {
//                 case intervals.daily: {
//                   if (
//                     startOfDay(e.startDate).getTime() <=
//                       new Date(d).getTime() &&
//                     endOfDay(e.endDate).getTime() >= new Date(d).getTime()
//                   ) {
//                     totalOutcome += e.money;
//                   }
//                   break;
//                 }
//                 case intervals.monthly: {
//                   if (
//                     startOfMonth(e.startDate).getTime() <=
//                       startOfMonth(new Date(d)).getTime() &&
//                     startOfMonth(e.endDate).getTime() >=
//                       startOfMonth(new Date(d)).getTime() &&
//                     new Date(d).getDate() === e.startDate.getDate()
//                   ) {
//                     totalOutcome += e.money;
//                   }
//                   break;
//                 }

//                 case intervals.yearly: {
//                   if (
//                     startOfYear(e.startDate).getTime() <=
//                       startOfYear(new Date(d)).getTime() &&
//                     startOfYear(e.endDate).getTime() >=
//                       startOfYear(new Date(d)).getTime() &&
//                     new Date(d).getDate() === e.startDate.getDate()
//                   ) {
//                     totalOutcome += e.money;
//                   }
//                   break;
//                 }
//               }
//             });
//             return (
//               <TouchableOpacity onPress={() => handleDoublePress(new Date(d))}>
//                 <View
//                   key={index}
//                   style={{
//                     ...style.dateItem,
//                     ...style.date,
//                     backgroundColor:
//                       new Date(d).getMonth() === date.getMonth()
//                         ? "#12103D"
//                         : "#12103DBB",
//                     position: "relative",
//                   }}
//                 >
//                   <Text style={{ color: "#fff" }}>
//                     {format(new Date(d), "dd")}
//                   </Text>
//                   <View style={{ position: "absolute", right: 0, bottom: 0 }}>
//                     {totalIncome > 0 && (
//                       <Text
//                         style={{
//                           color: "#2089DC",
//                           fontSize: 10,
//                           textAlign: "right",
//                         }}
//                       >
//                         {totalIncome}
//                       </Text>
//                     )}
//                     {totalOutcome > 0 && (
//                       <Text
//                         style={{
//                           color: "red",
//                           fontSize: 10,
//                           textAlign: "right",
//                         }}
//                       >
//                         {totalOutcome}
//                       </Text>
//                     )}
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </View>
//     </View>
//   );
// };

// const style = StyleSheet.create({
//   dateContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     flexWrap: "wrap",
//   },
//   dateItem: {
//     width: 58,
//     borderColor: "#EAEFD6",
//     borderWidth: 1,
//     backgroundColor: "#12103DDD",
//     color: "#fff",
//   },
//   date: {
//     height: 46,
//   },
// });

// export default Calendar;
