import cn from "classnames";
import type { LucideIcon } from "lucide-react";
import './StatCard.css'

interface StatCardProps {
  value: string;
  label: string;
  icon: LucideIcon;
  className?: string;
}

export const StatCard = ({ value, label, icon: Icon, className }: StatCardProps) => (
  <div className={cn("stat-card paper", className)}>
    <div className="icon">
      <Icon size={48} />
    </div>
    <div className="stat-card-right">
      <p className="stat-card-value">{value}</p>
      <p className='stat-card-label'>{label}</p>
    </div>
  </div>
);