// App.js

// Import necessary modules and components
import { useState } from "react";
import {View,Text,TouchableOpacity} from "react-native";
import {Picker} from "@react-native-picker/picker";

// Import custom components
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import styles from "./styles"; // Import shared styles

// Define the main App component
const App = () => {
    // Task list state (array of all tasks)
    const [tasks, setTasks] = useState([]);

    // Task form state for adding/editing
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "Pending", // Default status
        deadline: "",
        createdAt: "",
        priority: "Medium", // Default priority
    });

    // Modal visibility flag
    const [modalVisible, setModalVisible] = useState(false);

    // Store the task being edited
    const [editingTask, setEditingTask] = useState(null);

    // Form validation flag
    const [validationError, setValidationError] = useState(false);

    // Filter and sort states
    const [filter, setFilter] = useState("All"); // "All", "Pending", "Completed", "High", etc.
    const [sortOrder, setSortOrder] = useState("None"); // "PriorityHighLow", etc.

    // Function to add a new task or update an existing one
    const handleAddTask = () => {
        // Validate input fields
        if (task.title.trim() !== "" && task.deadline !== "") {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString(); // e.g., "8/1/2025, 5:24:37 PM"

            if (editingTask) {
                // If editing: update the task
                const updatedTasks = tasks.map((t) =>
                    t.id === editingTask.id ? { ...t, ...task } : t
                );
                setTasks(updatedTasks);
                setEditingTask(null);
            } else {
                // If adding: create new task with ID and creation time
                const newTask = {
                    id: Date.now(), // Unique task ID
                    ...task,
                    createdAt: formattedDate,
                };
                setTasks([...tasks, newTask]);
            }

            // Reset form state
            setTask({
                title: "",
                description: "",
                status: "Pending",
                deadline: "",
                createdAt: "",
                priority: "Medium",
            });

            // Hide modal and clear errors
            setModalVisible(false);
            setValidationError(false);
        } else {
            // If required fields are missing
            setValidationError(true);
        }
    };

    // Open modal for editing a specific task
    const handleEditTask = (task) => {
        setEditingTask(task); // Store task being edited
        setTask(task); // Populate form with task data
        setModalVisible(true); // Show modal
    };

    // Delete a task by ID
    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((t) => t.id !== taskId);
        setTasks(updatedTasks);
    };

    // Toggle task status between "Pending" and "Completed"
    const handleToggleCompletion = (taskId) => {
        const updatedTasks = tasks.map((t) =>
            t.id === taskId
                ? {
                      ...t,
                      status:
                          t.status === "Pending"
                              ? "Completed"
                              : "Pending",
                  }
                : t
        );
        setTasks(updatedTasks);
    };

    // Compute the final filtered and sorted list of tasks
    const getFilteredAndSortedTasks = () => {
        let filteredTasks = [...tasks];

        // Apply filter (status or priority)
        if (filter !== "All") {
            filteredTasks = filteredTasks.filter(
                (t) =>
                    t.status === filter ||
                    t.priority === filter
            );
        }

        // Apply sorting based on selected order
        if (sortOrder === "PriorityHighLow") {
            const priorityMap = { High: 3, Medium: 2, Low: 1 };
            filteredTasks.sort(
                (a, b) =>
                    priorityMap[b.priority] -
                    priorityMap[a.priority]
            );
        } else if (sortOrder === "PriorityLowHigh") {
            const priorityMap = { High: 3, Medium: 2, Low: 1 };
            filteredTasks.sort(
                (a, b) =>
                    priorityMap[a.priority] -
                    priorityMap[b.priority]
            );
        }

        return filteredTasks;
    };

    // Render component
    return (
        <View style={styles.container}>
            {/* App Title */}
            <Text style={styles.title}>Task Manager</Text>

            {/* Filter and Sort Section */}
            <View style={styles.filterSortContainer}>
                
                {/* Filter Picker */}
                <Picker
                    selectedValue={filter}
                    style={styles.picker}
                    onValueChange={(itemValue) => setFilter(itemValue)}>
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="Completed" value="Completed" />
                    <Picker.Item label="High Priority" value="High" />
                    <Picker.Item label="Medium Priority" value="Medium" />
                    <Picker.Item label="Low Priority" value="Low" />
                </Picker>

                {/* Sort Picker */}
                <Picker
                    selectedValue={sortOrder}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSortOrder(itemValue)}>
                    <Picker.Item label="No Sorting" value="None" />
                    <Picker.Item label="Priority: High → Low" value="PriorityHighLow" />
                    <Picker.Item label="Priority: Low → High" value="PriorityLowHigh" />
                </Picker>
            </View>

            {/* Render filtered and sorted Task List */}
            <TaskList
                tasks={getFilteredAndSortedTasks()}
                handleEditTask={handleEditTask}
                handleToggleCompletion={handleToggleCompletion}
                handleDeleteTask={handleDeleteTask}
            />

            {/* Add/Edit Task Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    setEditingTask(null); // Reset editing mode
                    setTask({
                        title: "",
                        description: "",
                        status: "Pending",
                        deadline: "",
                        createdAt: "",
                        priority: "Medium", // Default priority
                    });
                    setModalVisible(true); // Show task form modal
                    setValidationError(false); // Clear error state
                }}>
                <Text style={styles.addButtonText}>
                    {editingTask ? "Edit Task" : "Add Task"}
                </Text>
            </TouchableOpacity>

            {/* Render Task Creation/Editing Modal */}
            <TaskModal
                modalVisible={modalVisible}
                task={task}
                setTask={setTask}
                handleAddTask={handleAddTask}
                handleCancel={() => {
                    setEditingTask(null); // Reset editing task
                    setTask({
                        title: "",
                        description: "",
                        status: "Pending",
                        deadline: "",
                        createdAt: "",
                        priority: "Medium", // Reset to default
                    });
                    setModalVisible(false); // Hide modal
                    setValidationError(false); // Clear errors
                }}
                validationError={validationError}
            />
        </View>
    );
};

// Export App as the default component
export default App;
