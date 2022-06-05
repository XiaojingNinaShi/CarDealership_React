import React from "react";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";

const renderCustomBarLabel = ({ x, y, width, value }) => {
  return (
    <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
      {value}
    </text>
  );
};

const Chart = ({ vehicles }) => {
  const live = vehicles.filter((v) => v.status === 1);
  const sold = vehicles.filter((v) => v.status === 0);

  const data = [
    {
      name: "Live",
      value: live.length,
    },
    {
      name: "Sold",
      value: sold.length,
    },
  ];

  return (
    <BarChart
      width={200}
      height={100}
      data={data}
      margin={{
        top: 30,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <Tooltip />

      <Bar
        dataKey="value"
        fill="#0d6efd"
        label={renderCustomBarLabel}
        barSize={30}
      />
    </BarChart>
  );
};

export default Chart;
