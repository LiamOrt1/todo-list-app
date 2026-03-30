import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Input, Button, CheckBox } from '@rneui/themed';


export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Take out the trash', completed: false },
    { key: '2', description: 'Walk the dog', completed: false },
    { key: '3', description: 'Wash the car', completed: false },
  ]);


  const [newTask, setNewTask] = useState('');


  const toggleComplete = (key) => {
    setTasks(tasks.map(task =>
      task.key === key ? {...task, completed: !task.completed } : task
    ));
  };


  const addTask = () => {
    if (newTask.trim() === '') return;


    const newItem = {
      key: Date.now().toString(),
      description: newTask,
      completed: false,
    };


    setTasks([...tasks, newItem]);
    setNewTask('');
  };


  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleComplete(item.key)}
      />
      <Text
        style={item.completed ? styles.completedText : styles.text}
      >
        {item.description}
      </Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text h3>Liam's ToDo Checklist</Text>


      <Input
        placeholder="Enter a task"
        value={newTask}
        onChangeText={setNewTask}
      />


      <Button
        title="Add"
        onPress={addTask}
        buttonStyle={{ backgroundColor: '#9984d4'}}
      />


      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    alignItems: 'center'
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 12,
    marginBottom: 12,
  },
  text: {
    fontSize: 20
  },
  completedText: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
