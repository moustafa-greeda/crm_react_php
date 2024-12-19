
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    Typography,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";

const initialData = {
    column1: [],
    column2: [],
    column3: [],
    column4: []
};

export default function NewTask({ open, onClose, userId }) {
    // const [columns, setColumns] = useState(() => {
    //     const savedColumns = localStorage.getItem("columns");
    //     return savedColumns ? JSON.parse(savedColumns) : initialData;
    // });
    // const [selectedColumn, setSelectedColumn] = useState("column1");

    // useEffect(() => {
    //     localStorage.setItem("columns", JSON.stringify(columns));
    // }, [columns]);
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            projectname: "",
            description: "",
            creationdate: "",
            projectsize: "",
            user_id: userId || "",
            enddate: "",
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                console.log(values);

                const response = await axios.post(
                  "http://localhost/backend/Tasks/addTask.php",
                  values,
                  {
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    }
                  }
                );

                console.log(response);

                if (
                  response.status === 200 &&
                  response.data.status === "success"
                ) {
                  setLoading(false);
                  Swal.fire({
                    title: "Item Added Successfully!",
                    text: `Added: ${values.projectname}`,
                    icon: "success",
                    confirmButtonText: "OK"
                  });
                  formik.resetForm();
                  onClose(); // Close the dialog
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Failed to add task. Please try again later.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                console.error("Error adding task:", error);
            }
        },
    });


    useEffect(() => {
        formik.setFieldValue("user_id", userId || "");
    }, [userId]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography variant="h5" align="center">
                    Add New Task
                </Typography>
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <Box
                        sx={{
                            width: "400px",
                            padding: "20px",
                            gap: "15px",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <TextField
                            label="Project Name"
                            name="projectname"
                            variant="outlined"
                            fullWidth
                            value={formik.values.projectname}
                            onChange={formik.handleChange}
                            required
                        />
                        <TextField
                            label="Description"
                            name="description"
                            variant="outlined"
                            fullWidth
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            multiline
                            rows={3}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Project Size</InputLabel>
                            <Select
                                name="projectsize"
                                value={formik.values.projectsize}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Small">Small</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Large">Large</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Creation Date"
                            name="creationdate"
                            type="date"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={formik.values.creationdate}
                            onChange={formik.handleChange}
                            required
                        />
                        <TextField
                            label="End Date"
                            name="enddate"
                            type="date"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={formik.values.enddate}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            label="User Id"
                            name="user_id"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={formik.values.user_id}
                            onChange={formik.handleChange}
                            InputProps={{
                                inputProps: { min: 1 }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="outlined"
                        sx={{ padding: "8px 20px", borderRadius: "20px" }}
                    >
                        Cancel
                    </Button>
                    {loading ? (
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            sx={{ padding: "8px 20px", borderRadius: "20px" }}

                        >{loading ? (
                            <div class="spinner-border text-success" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        ) : (
                            "Add Item"
                        )}
                        </Button>
                    ) :
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            sx={{ padding: "8px 20px", borderRadius: "20px" }}

                        >
                            Add Item
                        </Button>
                    }
                </DialogActions>
            </form>
        </Dialog>
    );
}
