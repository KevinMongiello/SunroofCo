import { Outlet } from "react-router-dom";
import { AppDrawer } from "../components/AppDrawer";
import "./AppLayout.scss";

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <AppDrawer />
      <div className='app-content__shell'>
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
