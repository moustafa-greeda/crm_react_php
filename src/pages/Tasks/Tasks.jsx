import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box
} from "@mui/material";
import Swal from "sweetalert2";

const initialData = {
  column1: [],
  column2: [],
  column3: [],
  column4: []
};

const columnNames = {
  column1: "To Do",
  column2: "In Progress",
  column3: "Review",
  column4: "Completed"
};

function DragAndDropColumns() {
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem("columns");
    return savedColumns ? JSON.parse(savedColumns) : initialData;
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("column1");
  const [newItem, setNewItem] = useState(getEmptyNewItem());

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  function getEmptyNewItem() {
    return {
      projectName: "",
      description: "",
      creationDate: "",
      projectSize: "",
      status: "Step 1"
    };
  }

  const addNewItem = () => {
    if (!newItem.projectName.trim() || !newItem.creationDate.trim()) {
      Swal.fire({
        title: "Error",
        text: "Project name and creation date are required!",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }

    const newEntry = { id: `${Date.now()}`, ...newItem };
    const newColumns = { ...columns };
    newColumns[selectedColumn].push(newEntry);

    setColumns(newColumns);
    setNewItem(getEmptyNewItem());
    setOpenDialog(false);

    Swal.fire({
      title: "Item Added Successfully!",
      text: `Added: ${newItem.projectName}`,
      icon: "success",
      confirmButtonText: "OK"
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const getStatusForColumn = (columnId) => {
    const statuses = {
      column1: "Step 1",
      column2: "Step 2",
      column3: "Step 3",
      column4: "Finished"
    };
    return statuses[columnId] || "Step 1";
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{
          margin: "20px 0",
          padding: "10px 30px",
          fontSize: "20px",
          textTransform: "capitalize"
        }}
      >
        Add New Task
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <Typography variant="h5" align="center">
            Add New Task
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: "500px",
              padding: "20px",
              gap: "15px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <TextField
              label="Project Name"
              name="projectName"
              variant="outlined"
              fullWidth
              value={newItem.projectName}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              value={newItem.description}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
            <FormControl fullWidth>
              <InputLabel>Project Size</InputLabel>
              <Select
                name="projectSize"
                value={newItem.projectSize}
                onChange={handleInputChange}
              >
                <MenuItem value="Small">Small</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Large">Large</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Creation Date"
              name="creationDate"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              value={newItem.creationDate}
              onChange={handleInputChange}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={newItem.status}
                onChange={handleInputChange}
              >
                <MenuItem value="Step 1">Step 1</MenuItem>
                <MenuItem value="Step 2">Step 2</MenuItem>
                <MenuItem value="Step 3">Step 3</MenuItem>
                <MenuItem value="Finished">Finished</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color="secondary"
            variant="outlined"
            sx={{ padding: "8px 20px", borderRadius: "20px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={addNewItem}
            color="primary"
            variant="contained"
            sx={{ padding: "8px 20px", borderRadius: "20px" }}
          >
            Add Item
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {Object.keys(columns).map((columnId) => (
          <Grid item xs={12} sm={6} md={3} key={columnId}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#fafafa",
                boxShadow: 3,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                height: "100%"
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{
                  marginBottom: "15px",
                  fontWeight: "bold",
                  color: "#4A90E2"
                }}
              >
                {columnNames[columnId]}
              </Typography>
              <List
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: "12px"
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const itemId = e.dataTransfer.getData("itemId");
                  const sourceColumnId = e.dataTransfer.getData("columnId");

                  if (sourceColumnId !== columnId) {
                    const newColumns = { ...columns };
                    const movedItemIndex = newColumns[sourceColumnId].findIndex(
                      (item) => item.id === itemId
                    );

                    if (movedItemIndex !== -1) {
                      const [movedItem] = newColumns[sourceColumnId].splice(
                        movedItemIndex,
                        1
                      );
                      movedItem.status = getStatusForColumn(columnId);
                      newColumns[columnId].push(movedItem);
                      setColumns(newColumns);
                    }
                  }
                }}
              >
                {columns[columnId].map((item) => (
                  <ListItem
                    key={item.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("itemId", item.id);
                      e.dataTransfer.setData("columnId", columnId);
                    }}
                    sx={{
                      backgroundColor: "#eee",
                      borderRadius: "4px",
                      padding: "12px 20px",
                      cursor: "move",
                      "&:hover": {
                        backgroundColor: "#f0f0f0"
                      }
                    }}
                  >
                    <ListItemText
                      primary={
                        <div className="parent_logo">
                          <h3>{item.projectName}</h3>
                          <span>{item.projectSize || "N/A"}</span>
                        </div>
                      }
                      secondary={
                        <div>
                          <strong>Description:</strong>{" "}
                          {item.description || "N/A"}
                          <br />
                          <strong>Project Size:</strong>{" "}
                          {item.projectSize || "N/A"}
                          <br />
                          <strong>Date:</strong> {item.creationDate}
                          <br />
                          <strong>Status:</strong> {item.status}
                        </div>
                      }
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "1.2rem",
                          fontWeight: "bold"
                        },
                        "& .MuiListItemText-primary .parent_logo": {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        },
                        "& .MuiListItemText-primary .parent_logo h3": {
                          color: "#1565c0"
                        },
                        "& .MuiListItemText-primary .parent_logo span": {
                          backgroundColor: "#3D5B59",
                          padding: "5px 10px",
                          color: "#fff",
                          borderRadius: "40%"
                        },
                        "& .MuiListItemText-secondary": {
                          fontSize: "1rem",
                          color: "#555",
                          lineHeight: "40px"
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default DragAndDropColumns;
