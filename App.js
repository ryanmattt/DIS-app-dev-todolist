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
import Task from "./components/Task";
import AddTaskView from "./components/AddTaskView";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const serverAddress = "http://webserv.ryanrosenblatt.com/api/tasks";

  const handleAddTask = async (task) => {
    if (task.trim().length > 0) {
      try {
        const response = await axios.post(serverAddress, { title: task, isCompleted: false});
        setTasks(tasks => [...tasks, response.data]);

      } catch (e) {
        console.error("Error adding a task: ", e);
    }
  }
  };

  const onTaskPress = async (index) => {
    const taskToUpdate = tasks[index];
    taskToUpdate.isCompleted = !taskToUpdate.isCompleted;

    try {
      await axios.put(`${serverAddress}/${taskToUpdate.id}`, taskToUpdate);
      const updatedTasks = [...tasks];
      if (taskToUpdate.isCompleted) {
        const [updatedTask] = updatedTasks.splice(index, 1);
        updatedTasks.push(updatedTask);
      }
      setTasks(updatedTasks);
    } catch (e) {
      console.error("Error updating a task: ", e);
    }
  };


  const deleteTask = async (id) => {
    try {
      setTasks(tasks.filter((task) => task.id !== id));
      const response = await axios.delete(`${serverAddress}/${id}`);
    } catch (error) {
      console.error("Error deleting a task: ", error);
    }
  };


    const loadTasks = async () => {
      try {
        const response = await axios.get(serverAddress);
        setTasks(response.data);
      } catch (e) {
        console.error("Error loading tasks: ", e);
      } 
    };
  useEffect(() => {
    
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
                key={item._id}
                text={item.title}
                onPress={() => onTaskPress(index)}
                isCompleted={item.isCompleted}
                style={styles.task}
                onDelete={() => deleteTask(item.id)}
              />
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
    width: "100%"
  },
  taskRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  task: {
    borderRadius: 5,
    fontSize: 14,
  }
});
