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
    name: "March",
    patients: 20,
  },
  {
    name: "April",
    patients: 30,
  },
  {
    name: "May",
    patients: 11,
  },
  {
    name: "June",
    patients: 15,
  },
  {
    name: "July",
    patients: 16,
  },
];

const CustomLineChart = () => (
  <AreaChart
    width={400}
    height={250}
    data={data}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <defs>
      <linearGradient id="colorpatients" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Area
      type="monotone"
      dataKey="patients"
      stroke="#8884d8"
      fillOpacity={1}
      fill="url(#colorpatients)"
    />
    {/* <Area
      type="monotone"
      dataKey="pv"
      stroke="#82ca9d"
      fillOpacity={1}
      fill="url(#colorPv)"
    /> */}
  </AreaChart>
);

export default CustomLineChart;
