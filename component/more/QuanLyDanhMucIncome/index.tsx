import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {
  deleteCategoryExpense,
  getAllCategoryExpense,
  putCategoryExpense,
} from "../../../api/category-expense";
import { Modal } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { getAllIncome } from "../../../api/income";
import {
  deleteCategoryIncome,
  getAllCategoryIncome,
  putCategoryIncome,
} from "../../../api/category-income";

const QuanLyDanhMucIncome = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({} as any);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleGetAll = () => {
    getAllCategoryIncome().then((res) => {
      setData(res?.data);
    });
  };

  const handleDelete = async (id: any) => {
    await deleteCategoryIncome(id).then(() => {
      handleGetAll();
    });
  };

  const onClickItem = (item) => {
    setRecord(item);
    setVisible(true);
  };

  const handlePostCategoryExpense = async (data) => {
    if (errors.content) {
      return;
    }
    await putCategoryIncome(record?.id ?? "", data).then(() => {
      setValue("content", "");
      handleGetAll();
      setVisible(false);
    });
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  console.log(data, "data");

  return (
    <View style={{ padding: 12, paddingTop: 36, display: "flex", gap: 12 }}>
      {data?.map((item) => (
        <TouchableOpacity activeOpacity={0.4} style={styles.danhMucItem}>
          <Text>{item?.content ?? ""}</Text>
          <View style={styles.flex}>
            <TouchableOpacity onPress={() => onClickItem(item)}>
              <Entypo name="edit" size={18} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item?.id ?? "")}>
              <Entypo name="cup" size={18} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}

      <Modal
        isOpen={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <View style={styles.backdrop}>
          <View style={styles.container}>
            <Text style={styles.textStyle}>Tên danh mục</Text>
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
                  placeholder="Nhập tên danh mục"
                />
              )}
              name="content"
              rules={{ required: true }}
              defaultValue=""
            />
            <TouchableOpacity onPress={handleSubmit(handlePostCategoryExpense)}>
              <View
                style={{
                  width: 200,
                  height: 50,
                  borderRadius: 5,
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  backgroundColor: "#eeeeee",
                  borderWidth: 1,
                  borderColor: "#c9c9c9",
                }}
              >
                <Text>Cập nhật</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     paddingHorizontal: 20,
  //     backgroundColor: "#ffffff", // Màu nền trắng
  //   },
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

  danhMucItem: {
    // marginVertical: 12,
    fontSize: 24,
    backgroundColor: "#e9e9e9dd",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  flex: {
    display: "flex",
    gap: 12,
    flexDirection: "row",
  },

  backdrop: {
    backgroundColor: "#cccc",
  },
  container: {
    backgroundColor: "#ffff",
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 16,
    paddingVertical: 32,
    width: 341,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
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
});

export default QuanLyDanhMucIncome;
