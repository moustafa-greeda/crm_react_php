import DragAndDropColumns from "./pages/Tasks/Tasks";
import Header from "./components/Header";
import Grid from "@mui/material/Grid2";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Tasks from "./pages/Tasks/Tasks";
function App() {
  return (
    <div className="App">
      <Header />
      <Grid container spacing={2}>
        <Grid size={2}>
          <Sidebar />
        </Grid>
        <Grid size={10}>
          <DragAndDropColumns />
          <Routes>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path="tasks" element={<Tasks />} />
            </Route>
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
