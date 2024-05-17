import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../../component/calendar";
import EditIncome from "../../component/calendar/edit/income";
import EditOutcome from "../../component/calendar/edit/outcome";

const Stack = createStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator initialRouteName="Lịch">
      {/* <Stack.Screen
        name="Lịch"
        component={CalendarScreen}
        options={{ header: () => null }}
      /> */}
      <Stack.Screen
        name="Edit outcome"
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

export default CalendarStack;
