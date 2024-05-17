import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CalendarStack from "./calendar";
import HomeScreen from "./home";
import MoreScreen from "./more";
import ReportScreen from "./report";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        key={1}
        initialRouteName="Home"
        screenOptions={({ route }) => {
          return {
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Trang chủ") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Lịch") {
                iconName = focused ? "calendar" : "calendar-outline";
              } else if (route.name === "Báo cáo") {
                iconName = focused ? "pie-chart" : "pie-chart-outline";
              } else if (route.name === "Khác") {
                iconName = focused ? "settings" : "settings-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          };
        }}
      >
        <Tab.Screen key={2} name="Trang chủ" component={HomeScreen} />
        <Tab.Screen key={3} name="Lịch" component={CalendarStack} />
        <Tab.Screen key={4} name="Báo cáo" component={ReportScreen} />
        <Tab.Screen key={5} name="Khác" component={MoreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
