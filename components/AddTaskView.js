import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";

const AddTaskView = (props) => {

const [newTask, setNewTask] = useState("");


const handleAddTask = () => {
  Keyboard.dismiss();
  props.onPress(newTask);
  setNewTask("");
};

  return (
    <View style={styles.inner}>
      <TextInput
        placeholder="Add Task"
        style={styles.textInput}
        value={newTask}
        onChangeText={setNewTask}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddTask}
        >
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inner: {
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: "#F5F1F1",
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 5,
    flex: 1, // Take remaining space
    fontSize: 14,
    padding: 4,
    lineHeight: 22,
  },
  btnContainer: {
    marginLeft: 10, // Add margin for spacing
  },
  btn: {
    width: 50,
  },
  btnText: {
    color: "#558CF6",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddTaskView;
