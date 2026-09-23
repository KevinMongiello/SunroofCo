import { useNavigate } from "react-router-dom";

export const AppDrawer = () => {
  const navigate = useNavigate();

  const toDashboard = () => navigate('/');
  const toUsers = () => navigate('/users');
  const toTimecards = () => navigate('/timecards');
  const toReports = () => navigate('/reports');
  
  return (
    <aside className="app-drawer">
      <div>
        <h1>SunRoof Co</h1>
        <nav>
          <button onClick={toDashboard}>Dashboard</button>
          <button onClick={toUsers}>Users</button>
          <button onClick={toTimecards}>Time Cards</button>
          <button onClick={toReports}>Reports</button>
        </nav>
      </div>
      <div className="drawer-bottom">
        <span className="user-gravatar">KM</span>
        <div className='user-credentials'>
          <p className='user-name'><b>Kevin Mongiello</b></p>
          <p className='user-email'>veryverylongemail@gmail.com</p>
        </div>
      </div>
    </aside>
  );
};
