import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard moustafa 133</h1>
      <h1>Dashboard ehab 12</h1>

      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  );
}
