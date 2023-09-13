import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const data1 = [
  {
    name: "Mon",
    patients: 10,
  },
  {
    name: "Tue",
    patients: 13,
  },
  {
    name: "Wed",
    patients: 34,
  },
  {
    name: "Thu",
    patients: 11,
  },
  {
    name: "Fri",
    patients: 2,
  },
  {
    name: "Sat",
    patients: 20,
  },
  {
    name: "Sun",
    patients: 36,
  },
];
const data2 = [
  {
    name: "Mon",
    patients: 20,
  },
  {
    name: "Tue",
    patients: 11,
  },
  {
    name: "Wed",
    patients: 24,
  },
  {
    name: "Thu",
    patients: 15,
  },
  {
    name: "Fri",
    patients: 12,
  },
  {
    name: "Sat",
    patients: 10,
  },
  {
    name: "Sun",
    patients: 26,
  },
];

const CustomBarChart2 = ({ type }) => {
  return (
    <BarChart
      width={400}
      height={250}
      data={type === "1" ? data1 : data2}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      barSize={20}>
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="patients" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
  );
};

export default CustomBarChart2;
