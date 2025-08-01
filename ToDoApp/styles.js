// Import StyleSheet from react-native for creating styles
import { StyleSheet } from "react-native";

// Create a StyleSheet object to hold all styles
const styles = StyleSheet.create({
    // Main container style
    container: {
        flex: 1, 
        padding: 30, 
        backgroundColor: "#f7f7f7", 
    },
    // Title text style
    title: {
        fontSize: 28, 
        fontWeight: "bold", 
        marginBottom: 20, 
        color: "#333", 
        textAlign: "center", 
    },
    // Task list container style
    taskList: {
        flex: 1, // Take up available space
    },
    // Individual task item style
    taskItem: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        backgroundColor: "#fff", 
        marginBottom: 10, 
        padding: 15, 
        borderRadius: 10, 
    },
    // Container for task text
    taskTextContainer: {
        flex: 1, // Take up available space
    },
    // Main task text style
    taskText: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#333", 
    },
    // Style for completed task text
    completedTaskText: {
        textDecorationLine: "line-through", 
        color: "gray", 
    },
    // Task description text style
    taskDescription: {
        fontSize: 16, 
        color: "#666", 
    },
    // Task time text style
    taskTime: {
        fontSize: 14, 
        color: "#666", 
    },
    // Task status text style
    taskStatus: {
        fontSize: 16, 
        color: "#666", 
    },

    // Container for buttons (edit, complete, delete)
    buttonContainer: {
        flexDirection: "column", 
        marginVertical: 2, 
    },
    // Edit button style
    editButton: {
        backgroundColor: "#007BFF", 
        borderRadius: 5, 
        padding: 10, 
        marginRight: 10, 
        width: 110, 
    },
    // Generic button style
    button: {
        marginBottom: 10, 
    },
    // Complete button style
    completeButton: {
        backgroundColor: "#4CAF50", 
        borderRadius: 5, 
        padding: 10, 
        marginRight: 10, 
        width: 110, 
    },
    // Style for completed (disabled) button
    completedButton: {
        backgroundColor: "#808080", 
    },
    // Button text style
    buttonText: {
        color: "#fff", 
        fontSize: 15, 
    },
    // Delete button style
    deleteButton: {
        backgroundColor: "#FF9500", 
        borderRadius: 5, 
        padding: 10, // Padding inside the button
        width: 110, 
    },
    // Add button style (for adding new tasks)
    addButton: {
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "#007BFF", 
        paddingVertical: 15, 
        borderRadius: 10, 
        marginTop: 20, 
    },
    // Add button text style
    addButtonText: {
        color: "#fff", 
        fontSize: 18, 
        fontWeight: "bold",
    },

    // Modal container style
    modalContainer: {
        flex: 1, // Take up the full screen
        padding: 20, 
        backgroundColor: "#fff", // White background
    },

    // Input  style
    input: {
        borderWidth: 1, 
        borderColor: "#ccc", 
        padding: 10, 
        marginBottom: 20, 
        borderRadius: 5, 
        fontSize: 16, 
    },
    // Input label style
    inputLabel: {
        fontSize: 16, 
        fontWeight: "bold", 
    },
    // Error text style
    errorText: {
        color: "#FF3B30", 
        fontSize: 16, 
        marginBottom: 10, 
    },
    
    // Task deadline text style
    taskDeadline: {
        color: "#FF3B12", 
    },
    // Task created-at text style
    taskCreatedAt: {
        color: "#5497FF", 
    },
});

export default styles;