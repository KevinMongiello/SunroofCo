import { ChartPie, CircleDollarSign, Clock, TrendingUp } from "lucide-react";
import { StatCard } from "../StatCard/StatCard";
import { toDollars } from "../../util/formatters";

interface ReportCardProps {
  totalHours?: number;
  totalLaborCost?: number;
  totalCustomerValue?: number;
  grossMargin?: number;
}

const formatDollarStat = (stat?: number) => {
  if (stat || stat === 0) {
    return toDollars(stat);
  } else return '--';
}

export const ReportCards = ({
  totalHours,
  totalLaborCost,
  totalCustomerValue,
  grossMargin
}: ReportCardProps) => (
  <>
    <StatCard
      value={totalHours?.toString() ?? '--'}
      label="Total Hours"
      icon={Clock}
      className="blue"
    />
    <StatCard
      value={formatDollarStat(totalLaborCost)}
      label="Total Labor Cost"
      icon={CircleDollarSign}
      className="green"
    />
    <StatCard
      value={formatDollarStat(totalCustomerValue)}
      label="Total Customer Value"
      icon={TrendingUp}
      className="purple"
    />
    <StatCard
      value={formatDollarStat(grossMargin)}
      label="Gross Margin"
      icon={ChartPie}
      className="yellow"
    />
  </>
)