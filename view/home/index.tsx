import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OutcomeScreen from "../../component/home/outcome";
import IncomeScreen from "../../component/home/income";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tiền Chi" component={OutcomeScreen} />
      <Tab.Screen name="Tiền Thu" component={IncomeScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
