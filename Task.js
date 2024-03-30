import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Task = (props) => {
  const { text, isCompleted, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.taskWrapper}>
        <View style={styles.checkBox}>
          {isCompleted && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
        <View style={styles.taskText}>
          <Text style={[styles.text, isCompleted && styles.completedText]}>
            {text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskWrapper: {
    padding: 16,
    marginLeft: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 8,
    borderRadius: 8,
    width: "80%",

    // Why is it seperate for android and ios??
    elevation: 2,

    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 20,
  },
  checkBox: {
    width: 24,
    height: 24,
    backgroundColor: "rgba(141, 223, 218, 0.40)",
    borderRadius: 4,
    marginRight: 16,
  },
  checkmark: {
    color: "#000",
    fontSize: 15,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  taskText: {
    width: "90%"
  }
});