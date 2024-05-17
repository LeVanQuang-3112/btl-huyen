import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { login, setHeader } from "../../api/auth";
import AuthContext from "../../hook/userContext";

const LoginForm = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser }: { setUser: Function } = useContext(AuthContext);
  const [_errors, setErrors] = useState([]);

  const onSubmit = async (data) => {
    if (errors.email || errors.password) {
      return;
    }
    const res = await login(data);
    if (!res.data?.data?.id) {
      setErrors(["Mật khẩu không đúng"]);
    } else {
      setErrors([]);
      setHeader(res.data.token);
      setUser(res.data.data);
    }
  };

  useEffect(() => {
    setErrors([]);
  }, [errors.email, errors.password]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Đăng nhập</Text>
        <Controller
          control={control}
          render={(
            { field } // Sửa đổi ở đây
          ) => (
            <TextInput
              style={styles.input}
              onBlur={field.onBlur}
              onChangeText={field.onChange} // Sửa đổi ở đây
              value={field.value} // Sửa đổi ở đây
              placeholder="Email"
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.email && (
          <Text style={styles.error}>Email không được để trống</Text>
        )}

        <Controller
          control={control}
          render={(
            { field } // Sửa đổi ở đây
          ) => (
            <TextInput
              style={styles.input}
              onBlur={field.onBlur}
              onChangeText={field.onChange} // Sửa đổi ở đây
              value={field.value} // Sửa đổi ở đây
              placeholder="Mật khẩu"
              secureTextEntry={true}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.error}>Mật khẩu không được để trống</Text>
        )}
        {_errors.length > 0 &&
          _errors.map((e) => <Text style={styles.error}>{e}</Text>)}

        <Button title="Quên mật khẩu?" />

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={styles.buttonLoginView}>
            <Text style={styles.buttonLogin}>Đăng nhập</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 8,
          }}
        >
          <Text>Chưa có tài khoản?</Text>
          <Button
            title="Đăng ký"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff", // Màu nền trắng
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40, // Tăng khoảng cách giữa logo và các phần tử khác
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333333", // Màu chữ đậm
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#cccccc", // Màu đường viền
    borderBottomWidth: 1, // Sửa border thành bottom border
    paddingHorizontal: 10,
    marginBottom: 20, // Tăng khoảng cách giữa các ô input
    backgroundColor: "#f2f2f2", // Màu nền mờ
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#007bff", // Màu nền của nút
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff", // Màu chữ của nút
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonLoginView: {
    backgroundColor: "#21BA45",
    borderRadius: 40,
    width: "100%",
    marginVertical: 12,
  },
  buttonLogin: {
    textAlign: "center",
    paddingHorizontal: 120,
    paddingVertical: 16,
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});

export default LoginForm;
