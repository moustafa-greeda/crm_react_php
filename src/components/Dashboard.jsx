import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard ehabbb</h1>
      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  );
}
