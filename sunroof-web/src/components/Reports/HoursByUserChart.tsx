import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface HoursByUserChartProps {
  users: {
    id: string;
    name: string;
    hours: number;
  }[];
}

export function HoursByUserChart({
  users,
}: HoursByUserChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={users}>
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
        />

        <Tooltip />

        <Bar
          dataKey="hours"
          fill="#3478f6"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}