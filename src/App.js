import DragAndDropColumns from "./pages/Tasks/Tasks";
import Header from "./components/Header";
import Grid from "@mui/material/Grid2";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Users from "./components/User/User";

function App() {
  return (
    <div className="App">


        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Protected Component={Dashboard} />} />
        </Routes>














      {/* <Routes>
        <Route path="tasks" element={<DragAndDropColumns />} />
      </Routes> */}

      {/* <Header />
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid size={2}>
          <Sidebar />
        </Grid>
        <Grid size={10}>
          {/* <DragAndDropColumns /> */}
          <Users />
          <Routes>
            <Route path="dashboard" element={<Dashboard />}>
              {/* <Route index element={<Home />} /> */}
              {/* <Route path="/users" element={<Users />} /> */}
              {/* <Route index element={<Home />} /> */}
            </Route>
            {/* <Route path="/users" element={<Users />} /> */}
          </Routes>
          {/* <Router> */}
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/chat" element={<Chat />} /> {/* Add the chat route */}
          </Routes>
          {/* </Router> */}
        </Grid>
      </Grid> */}
    </div>
  );
}

export default App;
