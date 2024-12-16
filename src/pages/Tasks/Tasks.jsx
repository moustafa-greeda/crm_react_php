
import React, { useState, useEffect } from "react";
import { Paper, Typography, Grid, List, ListItem, ListItemText, Buttonو, Box } from "@mui/material";
import axios from "axios";

const columnNames = {
  column1: "To Do",
  column2: "In Progress",
  column3: "Review",
  column4: "Completed",
};

function Tasks() {
  const Role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const [tasks, setAllTasks] = useState([]);
  const [roleType, setRoleType] = useState(Role);

  useEffect(() => {
    async function getAllTasks() {
      try {
        let { data } = await axios.get(`http://localhost/backend/get_allTasks.php`);
        setAllTasks(data);
      } catch (error) {
        console.error(error);
      }
    }
    getAllTasks();
  }, []);

  const getFilteredTasks = (status) => {
    if (roleType === "admin") {
      return tasks.filter((task) => task.status === status);
    } else {
      return tasks.filter(
        (task) => task.status === status && task.user_id === userId
      );
    }
  };


  const handleDrop = async (e, newStatus) => {
    const taskId = e.dataTransfer.getData("itemId");


    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await axios.post(`http://localhost/backend/update_task_status.php`, {
        id: taskId,
        status: newStatus,
      });
    } catch (error) {
      console.error(error);
    }
  };
  function BackgroundSize(size) {
    switch (size) {
      case 'Small':
        return '#ffb400';
      case 'Medium':
        return '#f35588';
      case 'Large':
        return '#1E90FF';
      default:
        return '#cccccc';
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
          justifyContent: "space-between",
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
              overflow: "hidden",
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => roleType === "admin" && handleDrop(e, columnNames[columnId])}
          >
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{
                padding: "12px",
                backgroundColor: "var(--main-color)",
                color: "#fff",
                fontWeight: "bold",

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
                gap: "12px",
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
                    },
                  }}


                >
                

                  <ListItemText
                    primary={
                      <div
                        className="parent_logo"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <h3
                          style={{
                            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.5rem' },
                            color: 'var(  --main-color)',
                            marginRight: '10px',
                            wordWrap: 'break-word',
                            flex: 1,
                          }}
                        >
                          {item.projectname}
                        </h3>
                        <span
                          style={{
                            backgroundColor: BackgroundSize(item.projectsize),
                            padding: '5px 10px',
                            color: '#fff',
                            borderRadius: '40%',
                            fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' },
                            flexShrink: 0,
                          }}
                        >
                          {item.projectsize || 'N/A'}
                        </span>
                      </div>
                    }
                    secondary={
                      <div>
                        <strong>Description:</strong> {item.description || "N/A"}
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




