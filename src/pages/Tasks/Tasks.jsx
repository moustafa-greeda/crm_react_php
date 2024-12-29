import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const columnNames = {
  column1: "To Do",
  column2: "In Progress",
  column3: "Review",
  column4: "Completed"
};

function Tasks() {
  const Role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const [tasks, setAllTasks] = useState([]);
  const [roleType, setRoleType] = useState(Role);

  // Fetch all tasks on initial load
  useEffect(() => {
    async function getAllTasks() {
      try {
        const { data } = await axios.get(
          `http://localhost/backend/Tasks/get_allTasks.php`
        );
        setAllTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    getAllTasks();

    // Set up polling to fetch tasks every 5 seconds
    const interval = setInterval(getAllTasks, 5000);
    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  // Filter tasks based on user role and status
  const getFilteredTasks = (status) => {
    if (roleType === "admin") {
      return tasks.filter((task) => task.status === status);
    } else {
      return tasks.filter(
        (task) => task.status === status && task.user_id === userId
      );
    }
  };

  // Handle dragging and dropping tasks to update their status
  const handleDrop = async (e, newStatus) => {
    const taskId = e.dataTransfer.getData("itemId");

    // Optimistic UI update: Immediately update the task status on frontend
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      // Send the update to the backend
      const response = await axios.post(
        "http://localhost/backend/Tasks/update_task_status.php",
        {
          id: taskId,
          status: newStatus
        }
      );

      // If the backend fails, revert the UI change
      if (!response.data.success) {
        console.error("Error updating task status");
        setAllTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: task.previousStatus } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      setAllTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: task.previousStatus } : task
        )
      );
    }
  };

  // Function to set the background color based on project size
  function BackgroundSize(size) {
    switch (size) {
      case "Small":
        return "#ffb400";
      case "Medium":
        return "#f35588";
      case "Large":
        return "#1E90FF";
      default:
        return "#cccccc";
    }
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
          justifyContent: "space-between"
        }}
      >
        {Object.keys(columnNames).map((columnId) => (
          <Box
            key={columnId}
            sx={{
              flex: "1 1 22%",
              minWidth: "250px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              overflow: "hidden"
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) =>
              roleType === "admin" && handleDrop(e, columnNames[columnId])
            }
          >
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{
                padding: "12px",
                backgroundColor: "var(--main-color)",
                color: "#fff",
                fontWeight: "bold"
              }}
            >
              {columnNames[columnId]}
            </Typography>
            <List
              sx={{
                padding: "12px",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "12px"
              }}
            >
              {getFilteredTasks(columnNames[columnId]).map((item) => (
                <ListItem
                  key={item.id}
                  draggable={roleType === "admin"}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("itemId", item.id);
                  }}
                  sx={{
                    backgroundColor: "#eee",
                    borderRadius: "4px",
                    padding: "12px 20px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.2s",
                    cursor: roleType === "admin" ? "move" : "default",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      transform: "scale(1.03)"
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.5rem",
                            color: "var(--main-color)",
                            marginRight: "10px"
                          }}
                        >
                          {item.projectname}
                        </h3>
                        <span
                          style={{
                            backgroundColor: BackgroundSize(item.projectsize),
                            padding: "5px 10px",
                            color: "#fff",
                            borderRadius: "40%"
                          }}
                        >
                          {item.projectsize || "N/A"}
                        </span>
                      </div>
                    }
                    secondary={
                      <div>
                        <strong>Description:</strong>{" "}
                        {item.description || "N/A"}
                        <br />
                        <strong>Date:</strong> {item.creationdate}
                        <br />
                        <strong>Status:</strong> {item.status}
                      </div>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Tasks;
