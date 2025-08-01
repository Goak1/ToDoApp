import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";


const TaskItem = ({task, handleEditTask, handleToggleCompletion, handleDeleteTask}) => {
    return (
        // Container for the entire task item
        <View style={styles.taskItem}>

            {/* Container for task text details */}
            <View style={styles.taskTextContainer}>
                {/* Display the task title, with a different style if completed */}
                <Text
                    style={[
                        styles.taskText,
                        task.status === "Completed" &&
                            styles.completedTaskText,
                    ]}>
                    {task.title}
                </Text>
                {/* Display the task description */}
                <Text style={styles.taskDescription}>
                    {task.description}
                </Text>
                {/* Display the task status */}
                <Text style={styles.taskStatus}>
                    Status: {task.status}
                </Text>
                {/* Display the priority status, also will change the colour based on the priority choosen*/}
                <Text
                    style={[
                        styles.taskPriority,
                        task.priority === "High" && { color: "red" },
                        task.priority === "Medium" && { color: "orange" },
                        task.priority === "Low" && { color: "green" },
                    ]}
                >
                    Priority: {task.priority}
                </Text>
                {/* Display the task deadline */}
                <Text style={styles.taskDeadline}>
                    Deadline: {task.deadline}
                </Text>
                {/* Display the task creation date */}
                <Text style={styles.taskCreatedAt}>
                    Created: {task.createdAt}
                </Text>
            </View>

            {/* Container for action buttons */}
            <View style={styles.buttonContainer}>
                {/* Button to edit the task */}
                <TouchableOpacity
                    onPress={() => handleEditTask(task)}
                    style={[styles.editButton]}>
                    <Text style={styles.buttonText}>
                        Edit
                    </Text>
                </TouchableOpacity>
                {/* Button to toggle completion status */}
                <TouchableOpacity
                    onPress={() =>
                        handleToggleCompletion(task.id)
                    }
                    style={[
                        styles.completeButton,
                        task.status === "Completed" &&
                            styles.completedButton,
                    ]}>
                    <Text style={styles.buttonText}>
                        {task.status === "Completed"
                            ? "Pending"
                            : "Completed"}
                    </Text>
                </TouchableOpacity>
                {/* Button to delete the task */}
                <TouchableOpacity
                    onPress={() =>
                        handleDeleteTask(task.id)
                    }
                    style={[styles.deleteButton]}>
                    <Text style={styles.buttonText}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Export the TaskItem component as default
export default TaskItem;