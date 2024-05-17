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
import { getAllCategoryExpense } from "../../../api/category-expense";
import { ICategory } from "../../../interface";
import { startOfDay } from "date-fns";
import { updateExpense } from "../../../api/expense";
import AuthContext from "../../../hook/userContext";
import { Modal } from "native-base";

export default function OutcomeScreen({ route, navigation }) {
  const { outcome } = route.params;
  const [categoryExpense, setCategoryExpense] = useState<ICategory[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [date, setDate] = useState(startOfDay(new Date(outcome.date)));
  const [note, setNote] = useState(outcome.note);
  const [money, setMoney] = useState(outcome.money);
  const [selectedItem, setSelectedItem] = useState(
    categoryExpense.findIndex((item) => item.id === outcome.category.id)
  );

  const { forceUpdate } = useContext(AuthContext);

  useEffect(() => {
    getAllCategoryExpense()
      .then((res) => {
        setCategoryExpense(res.data);
        return res.data;
      })
      .then((data) =>
        setSelectedItem(
          data.findIndex((item) => item.id === outcome.category.id)
        )
      )
      .catch((e) => console.log(e));
  }, []);

  const handlePressItem = (v) => {
    setSelectedItem(v);
  };

  const handleAdd = () => {
    if (money <= 0) {
      setModalContent("Tiền chi không được nhỏ hơn hoặc bằng 0!");
      setModalVisible(true);
      return;
    }
    const data = {
      date,
      note,
      money,
      categoryExpenseId: categoryExpense[selectedItem].id,
    };

    updateExpense(outcome.id, data).then(() => {
      navigation.navigate("Lịch");
      forceUpdate((prev) => prev + 1);
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
          <Text style={{ fontSize: 18 }}>Ngày: </Text>
          <DateTimePicker
            value={date}
            onChange={(e, date) => {
              setDate(date);
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
            {categoryExpense.map(({ content }, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePressItem(index)}
                >
                  <View
                    style={{
                      width: 107,
                      height: 50,
                      borderRadius: 5,
                      padding: 4,
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
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  width: 104,
                  height: 50,
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
                <Text numberOfLines={1} style={{ color: "#808080" }}>
                  {"Chỉnh sửa >"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonAddContainer}>
          <TouchableOpacity onPress={handleAdd}>
            <View style={styles.buttonAddView}>
              <Text style={styles.buttonAdd}>Chỉnh sửa khoản chi</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
