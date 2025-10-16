import { Outlet } from "react-router-dom";
import Sidebar from "./sibedar/alumnoSidebar";

export default function Alumno() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
