import Sidebar from "components/Sidebar.tsx";
import Header from "components/Header.tsx";
import { Outlet } from "react-router-dom";
import { useFetchAuthUser } from "graphql/user/useAuthUser";
import { Suspense } from "react";

const Dashboard = () => {
  const { data } = useFetchAuthUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Suspense>
        <Header user={data?.authMember} />
      </Suspense>
      <Sidebar />
      <div className="lg:ml-[270px] mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
