import { NavLink } from "react-router-dom";
import "./AppDrawer.css";
import { ChartNoAxesColumn, House, SquareUserRound, Users } from "lucide-react";

export const AppDrawer = () => {
  return (
    <aside className="app-drawer">
      <div>
        <div className="app-drawer-header">
          <span>SunRoofCo</span>
        </div>
        <nav>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `app-header-button ${isActive ? "app-header-button--active" : ""}`
            }
          >
            <House />
            Dashboard
          </NavLink>
          <NavLink
            to={"/users"}
            className={({ isActive }) =>
              `app-header-button ${isActive ? "app-header-button--active" : ""}`
            }
          >
            <Users />
            Users
          </NavLink>
          <NavLink
            to={"/timecards"}
            className={({ isActive }) =>
              `app-header-button ${isActive ? "app-header-button--active" : ""}`
            }
          >
            <SquareUserRound />
            Time Cards
          </NavLink>
          <NavLink
            to={"/reports"}
            className={({ isActive }) =>
              `app-header-button ${isActive ? "app-header-button--active" : ""}`
            }
          >
            <ChartNoAxesColumn />
            Reports
          </NavLink>
        </nav>
      </div>
      <div className="drawer-bottom">
        <span className="user-gravatar">KM</span>
        <div className="user-credentials">
          <p className="user-name">
            <b>Kevin Mongiello</b>
          </p>
          <p className="user-email">veryverylongemail@gmail.com</p>
        </div>
      </div>
    </aside>
  );
};
