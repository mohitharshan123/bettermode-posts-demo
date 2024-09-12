import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const Dashboard = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <Sidebar />
    <Suspense>
      <div className="lg:ml-[270px] ">
        <Outlet />
      </div>
    </Suspense>
  </div>
);

export default Dashboard;
