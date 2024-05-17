import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { signup } from "../../api/auth";

const RegisterForm = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorEmail, setErrorEmail] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const onSubmit = async (data) => {
    if (
      errors.email ||
      errors.name ||
      errors.password ||
      errors.confirmPassword
    ) {
      return;
    }
    console.log({ data });

    if (!(data.email as string).includes("@gmail.com")) {
      setErrorEmail("Email không hợp lệ");
      setErrorPassword("");
      setErrorConfirmPassword("");
    } else if (data.password.trim().length < 8) {
      setErrorEmail("");
      setErrorConfirmPassword("");
      setErrorPassword("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    } else {
      setErrorEmail("");
      setErrorPassword("");

      if (data.password !== data.confirmPassword) {
        setErrorConfirmPassword("Xác nhận mật khẩu không đúng");
      } else {
        setErrorConfirmPassword("");
        const res = await signup(data);

        if (res.data.data.id) {
          navigation.navigate("Login");
        } else {
          setErrorEmail("Email đã tồn tại");
        }
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Đăng ký</Text>
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
        {errorEmail && <Text style={styles.error}>{errorEmail}</Text>}

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
              placeholder="Tên"
              secureTextEntry={true}
            />
          )}
          name="name"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.name && (
          <Text style={styles.error}>Tên không được để trống</Text>
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
        {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}

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
              placeholder="Xác nhận mật khẩu"
              secureTextEntry={true}
            />
          )}
          name="confirmPassword"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>Xác nhận mật khẩu không đúng</Text>
        )}
        {errorConfirmPassword && (
          <Text style={styles.error}>{errorConfirmPassword}</Text>
        )}

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={styles.buttonLoginView}>
            <Text style={styles.buttonLogin}>Đăng ký</Text>
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
          <Text>Đã có tài khoản?</Text>
          <Button
            title="Đăng nhập"
            onPress={() => navigation.navigate("Login")}
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
    marginBottom: 20,
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
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f2f2f2", // Màu nền mờ
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  buttonLoginView: {
    backgroundColor: "#21BA45",
    borderRadius: 30,
    width: "100%",
  },
  buttonLogin: {
    textAlign: "center",
    paddingHorizontal: 150,
    paddingVertical: 16,
    fontSize: 18,
    color: "#fff",
  },
});

export default RegisterForm;
