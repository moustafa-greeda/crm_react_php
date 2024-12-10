import { useNavigate } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const naviget = useNavigate();
  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Logged out successfully!");
    naviget("/");
  }
  const user = localStorage.getItem("user");
  // const id = localStorage.getItem("id");
  // console.log(id);

  return (
    <div>
      <Header />
      <Sidebar />
      <h1>Welcome to Dashboard {user}</h1>

      

    </div>
  );
}
