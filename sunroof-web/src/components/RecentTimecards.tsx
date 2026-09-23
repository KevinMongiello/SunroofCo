import type { TimeCardWithUser } from "../types/timecards";

interface RecentTimecardsProps {
  onViewAll: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  timecards: TimeCardWithUser[]
}

export const RecentTimecards = ({ timecards = [], onViewAll }: RecentTimecardsProps) => {
  return (
    <div className="recent-timecards paper">
      <div className='header'>
        <h2>Recent Timecards</h2>
        <span><a onClick={onViewAll}>View all</a></span>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {timecards.map((timecard) => (
            <tr>
              <td>{timecard.user.name}</td>
              <td>{timecard.date}</td>
              <td>{timecard.hoursWorked.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
