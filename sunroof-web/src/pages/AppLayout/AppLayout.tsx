import { Outlet } from "react-router-dom";
import { AppDrawer } from "../../components/AppDrawer/AppDrawer";
import "./AppLayout.css";

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <AppDrawer />
      <div className='app-content__shell'>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
