import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard hend 6</h1>
      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  );
}
