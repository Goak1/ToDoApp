import {View,Text, TextInput, Button, Modal} from "react-native";
import styles from "../styles";
import { Calendar } from "react-native-calendars";
import {Picker} from "@react-native-picker/picker";

// Define the TaskModal functional component with props
const TaskModal = ({modalVisible, task, setTask, handleAddTask, handleCancel, validationError}) => {
    return (

        // Modal component to display the task form
        <Modal
            visible={modalVisible}       
            animationType="slide"        
            transparent={false}>          

            {/* Container for modal*/}

            <View style={styles.modalContainer}>

                {/* task title */}
                <TextInput
                    style={styles.input}                  
                    placeholder="Title"                   
                    value={task.title}                    
                    onChangeText={(text) =>              
                        setTask({ ...task, title: text })
                    }
                />

                {/* Input for task description */}
                <TextInput
                    style={styles.input}                 
                    placeholder="Description"             
                    value={task.description}             
                    onChangeText={(text) =>              
                        setTask({
                            ...task,
                            description: text,
                        })
                    } />

                {/* Label for deadline */}
                <Text style={styles.inputLabel}>
                    Deadline:
                </Text>

                {/* Priority Picker */}
                <Text style={styles.inputLabel}>Priority:</Text>

                {/* Picker for the priority */}
                <Picker
                    selectedValue={task.priority}
                    style={styles.picker}
                    onValueChange={(value) =>
                        setTask({ ...task, priority: value })
                    }>
                    <Picker.Item label="Low" value="Low" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="High" value="High" />
                </Picker>

                {/* Calendar component for selecting deadline */}
                <Calendar
                    style={styles.datePicker}             
                    markedDates={                         // Highlight selected date
                        task.deadline
                            ? { [task.deadline]: { selected: true, selectedColor: '#007BFF' } }
                            : {}
                    }

                    onDayPress={(day) =>                  // Update deadline on date selection
                        setTask({ ...task, deadline: day.dateString })
                    }

                    current={task.deadline}               
                />

                {/* Show validation error if present */}
                {validationError && (
                    <Text style={styles.errorText}>
                        Please fill in all fields correctly.
                    </Text>
                )}

                {/* Button to add or update task */}
                <Button
                    title={task.id ? "Update" : "Add"}    
                    onPress={handleAddTask}               
                    color="#007BFF" />                   

                {/* Button to cancel and close modal */}
                <Button
                    title="Cancel"                        
                    onPress={handleCancel}              
                    color="#FF3B30" />                    
            </View>
        </Modal>
    );
};

// Export the TaskModal component as default
export default TaskModal;