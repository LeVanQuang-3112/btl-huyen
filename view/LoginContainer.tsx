import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../component/auth/Login";
import RegisterForm from "../component/auth/Register";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const LoginContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterForm}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginContainer;
