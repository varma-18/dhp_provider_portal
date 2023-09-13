import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "November",
    patients: 24,
  },
  {
    name: "December",
    patients: 30,
  },
  {
    name: "January",
    patients: 11,
  },
];

export const CustomAreaChart = () => (
  <AreaChart
    width={400}
    height={250}
    data={data}
    margin={{
      top: 10,
      right: 30,
      left: 0,
      bottom: 0,
    }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="patients" stroke="#65ca5c" fill="#7763d8" />
  </AreaChart>
);
