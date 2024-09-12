import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <Sidebar />
    <div className="lg:ml-[270px] ">
      <Outlet />
    </div>
  </div>
);

export default Dashboard;
