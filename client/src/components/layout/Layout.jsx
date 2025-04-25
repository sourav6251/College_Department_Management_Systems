import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAuthStore } from "../../store/authStore";

function Layout() {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-auto">
                <Header />
                <main className="flex-1 p-3 overflow-auto">
                    <Outlet />
                </main>
                {/* <Footer/> */}
            </div>
        </div>
    );
}

export default Layout;
