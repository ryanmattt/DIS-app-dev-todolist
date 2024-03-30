import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Task from "./Task";
import AddTaskView from "./AddTaskView";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    if (task.trim().length > 1) {
      const newTasks = [...tasks, { text: task, isCompleted: false }];
      setTasks(newTasks);
      saveTasks(newTasks);
    }
  };

  const onTaskPress = (index) => {
    const updatedTasks = [...tasks];

    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;

    if(updatedTasks[index].isCompleted) {
      const [removedTask] = updatedTasks.splice(index, 1);
      updatedTasks.push(removedTask);
    }

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1); 
    setTasks(updatedTasks);
    saveTasks(updatedTasks)
  }

    const saveTasks = async (tasks) => {
      try {
        await AsyncStorage.setItem("todo-list", JSON.stringify(tasks));
      } catch (e) {
        console.log("Error saving tasks: ", e);
      }
    };


  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("todo-list");
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.log("Error saving tasks: ", e);
      }
    };
    loadTasks();
  }, []);




  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <View style={styles.tasksWrapper}>
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <View style={styles.taskRow}>
              <Task
                key={item.rank}
                text={item.text}
                onPress={() => onTaskPress(index)}
                isCompleted={item.isCompleted}
                style={styles.task}
              />
              <View style={styles.dltContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(index)}>
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.addTaskBox}
      >
        <AddTaskView onPress={handleAddTask} />
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1F1",
  },
  tasksWrapper: {
    width: "100%",
    flex: 1,
    paddingTop: 50,
  },
  sectionTitle: {
    marginTop: 100,
    marginLeft: 15,
    fontSize: 34,
    fontWeight: "bold",
  },
  addTaskBox: {
    paddingHorizontal: 15,
    width: "100%",

    backgroundColor: "#F5F1F1",
  },
  taskRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    padding: 8, // Easy to tap
    backgroundColor: "#ffcccc", // A light red background for the delete button
    borderRadius: 5, // Rounded corners for the button
  },
  task: {
    borderRadius: 5,
    fontSize: 14,
  },
  dltContainer: {
  },
});
