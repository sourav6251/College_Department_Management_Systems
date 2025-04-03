import { Dashboard } from "../components/dashboard/Dashboard";
import { Header } from "../components/dashboard/Header";
import { Sidebar } from "../components/dashboard/Sidebar";
import DemoCom from "../components/DemoCom";


const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header/>
        <main className="flex-1 p-3 overflow-auto">
          <DemoCom/>
        </main>
      </div>
    </div>
  );
};

export default Index;
