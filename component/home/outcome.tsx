import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ICategory } from "../../interface";
import {
  getAllCategoryExpense,
  postCategoryExpense,
} from "../../api/category-expense";
import { addExpense } from "../../api/expense";
import { Modal } from "native-base";
import AuthContext from "../../hook/userContext";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Controller, useForm } from "react-hook-form";
import { useIsFocused } from "@react-navigation/native";

export default function OutcomeScreen({ route }) {
  const [categoryOutcomeList, setCategoryOutcomeList] = useState<ICategory[]>(
    []
  );
  const [date, setDate] = useState(route.params?.date || new Date());
  const [note, setNote] = useState("");
  const [money, setMoney] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleDanhMuc, setVisibleDanhMuc] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { forceUpdate } = useContext(AuthContext);
  const isFocus = useIsFocused();

  const handlePressItem = (v) => {
    setSelectedItem(v);
  };

  useEffect(() => {
    getAllCategoryExpense()
      .then((res) => {
        setCategoryOutcomeList(res.data);
      })
      .catch((e) => console.log(e));
  }, [isFocus]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAdd = async () => {
    if (money <= 0) {
      setModalContent("Tiền chi không được nhỏ hơn hoặc bằng 0!");
      setModalVisible(true);
      return;
    }
    const data = {
      date,
      note,
      money,
      categoryExpenseId: categoryOutcomeList[selectedItem].id,
    };

    addExpense(data).then(() => {
      // setModalVisible(true);
      setModalContent("Thêm thành công tiền chi!");
      forceUpdate((prev) => prev + 1);
      setNote("");
      setMoney(0);
    });
  };

  const handleConfirm = (date: any) => {
    setDate(date);
    setVisibleDate(false);
  };

  const handlePostCategoryExpense = async (payload) => {
    if (!payload?.content) {
      return;
    }
    await postCategoryExpense(payload).then((res) => {
      getAllCategoryExpense().then((res) => {
        setCategoryOutcomeList(res.data);
      });

      setVisibleDanhMuc(false);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          paddingTop: 16,
          paddingLeft: 40,
          paddingRight: 40,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          flex: 1,
          position: "relative",
        }}
      >
        <Modal
          animationPreset="slide"
          isOpen={modalVisible}
          onClose={() => {
            setModalVisible((prev) => !prev);
          }}
          closeOnOverlayClick
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalContent}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Đóng</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18 }} onPress={() => setVisibleDate(true)}>
            Ngày: {moment(date).format("DD/MM/YYYY")}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18 }}>Ghi chú: </Text>
          <TextInput
            multiline={true}
            value={note}
            onChangeText={setNote}
            placeholder="Nhập ghi chú..."
            style={{
              fontSize: 18,
              borderColor: "gray",
              borderWidth: 1,
              width: 250,
              borderRadius: 5,
              padding: 4,
            }}
          />
        </View>

        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18 }}>Tiền chi: </Text>
          <TextInput
            multiline={true}
            keyboardType="numeric"
            value={money.toString()}
            onChangeText={(v) => setMoney(Number(v))}
            placeholder="Nhập tiền chi..."
            style={{
              fontSize: 18,
              borderColor: "gray",
              borderWidth: 1,
              width: 250,
              borderRadius: 5,
              padding: 4,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 18 }}>Danh mục:</Text>
          <View
            style={{
              marginTop: 8,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {categoryOutcomeList?.map(({ content }, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePressItem(index)}
                >
                  <View
                    style={{
                      minWidth: 100,
                      height: 40,
                      borderRadius: 5,
                      paddingVertical: 4,
                      paddingHorizontal: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        index === selectedItem ? "#2089DC" : "#fff",
                      borderWidth: 1,
                      borderColor: index === selectedItem ? "#2089DC" : "#000",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        color: index === selectedItem ? "#fff" : "#000",
                      }}
                    >
                      {content}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity onPress={() => setVisibleDanhMuc(true)}>
              <View
                style={{
                  width: 100,
                  height: 40,
                  borderRadius: 5,
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderColor: "#808080",
                }}
              >
                <Text numberOfLines={1} style={{ color: "#525252" }}>
                  Thêm
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonAddContainer}>
          <TouchableOpacity onPress={handleAdd}>
            <View style={styles.buttonAddView}>
              <Text style={styles.buttonAdd}>Tạo</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <Modal
          isOpen={visibleDate}
          onClose={() => {
            setVisibleDate(false);
          }}
        >
          <View>
            <DateTimePicker
              value={date}
              onChange={(e, date) => {
                setDate(date);
                setVisibleDate(false);
              }}
            />
          </View>
        </Modal> */}

        <Modal
          isOpen={visibleDanhMuc}
          onClose={() => {
            setVisibleDanhMuc(false);
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
              <TouchableOpacity
                onPress={handleSubmit(handlePostCategoryExpense)}
              >
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
                  <Text>Thêm mới</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {visibleDate ? (
          <DateTimePickerModal
            isVisible={visibleDate}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setVisibleDate(false)}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
  buttonAddContainer: {
    flex: 1,
    position: "absolute",
    bottom: 20,
    left: 40,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAddView: {
    backgroundColor: "#21BA45",
    borderRadius: 30,
  },
  buttonAdd: {
    textAlign: "center",
    paddingHorizontal: 80,
    paddingVertical: 16,
    fontSize: 18,
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
});
