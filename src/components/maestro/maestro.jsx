import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/maestroSidebar";

export default function Maestro() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
