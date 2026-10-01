interface QuickActionsProps {
  onAddUser: () => void;
  onAddTimecard: () => void;
}

export const QuickActions = ({ onAddUser, onAddTimecard}: QuickActionsProps) => {
  return (
    <div className="quick-actions paper">
      <h2>QuickActions</h2>
      <div className='menu'>
        <button onClick={onAddUser} className='button button--primary'>+ Add User</button>
        <button onClick={onAddTimecard} className='button button--secondary'>+ Add Timecard</button>
      </div>
    </div>
  );
};
