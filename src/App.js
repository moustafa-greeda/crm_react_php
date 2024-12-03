import DragAndDropColumns from "./pages/Tasks/Tasks";
import Header from "./components/Header";
import Grid from "@mui/material/Grid2";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="tasks" element={<DragAndDropColumns />} />
      </Routes> */}

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
              {/* <Route path="settings" element={<Settings />} /> */}
            </Route>
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
