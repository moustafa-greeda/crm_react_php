import DragAndDropColumns from "./pages/Tasks/Tasks";
import Header from "./components/Header";
import Grid from "@mui/material/Grid2";
import Sidebar from "./components/Sidebar";

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
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
