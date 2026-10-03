import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ValueVsLaborProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const ValueVsLabor = ({ data }: ValueVsLaborProps) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <CartesianGrid vertical={false} />

      <XAxis dataKey="name" tickLine={false} axisLine={false} />

      <YAxis tickLine={false} axisLine={false} />

      <Tooltip />

      <Bar dataKey="value" fill="#3478f6" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);
