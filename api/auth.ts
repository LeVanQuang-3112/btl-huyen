import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Login
export const setHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bear ${token}`;
};

export const login = async (value) => {
  try {
    console.log(value, "value");
    const response = await axios.post("auth/login", value);
    console.log(response, "response");
    await AsyncStorage.setItem("userId", response?.data?.data?.id);
    // await AsyncStorage.setItem(
    //   "userId",
    //   "2fa492b9-df97-4192-8db4-d40fc2c3d3dd"
    // );

    return response;
  } catch (error) {
    console.log(error, "error");

    return error.response;
  }
};

// Get user information
export const getUser = async () => {
  try {
    const response = await axios.get("auth/user");
    return response;
  } catch (error) {
    return error.response;
  }
};

// Register
export const signup = async (value) => {
  try {
    const response = await axios.post("auth/signup", value);
    return response;
  } catch (error) {
    return error.response;
  }
};
