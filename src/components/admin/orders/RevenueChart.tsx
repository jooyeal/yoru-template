import { Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { OutputGetMonthlyOrders } from "../../../schema/order.schema";

type Props = {
  monthlyOrders: OutputGetMonthlyOrders | undefined;
};

const RevenueChart: React.FC<Props> = ({ monthlyOrders }) => {
  const [data, setData] = useState<{ name: string; Total: number }[]>();
  useEffect(() => {
    if (monthlyOrders) {
      const chartKeyArray = Object.keys(monthlyOrders) as Array<
        keyof typeof monthlyOrders
      >;
      const chartData = chartKeyArray.map((name) => ({
        name,
        Total: monthlyOrders[name].reduce(
          (prev, curr) => prev + curr.totalPrice,
          0
        ),
      }));
      setData(chartData);
    }
  }, [monthlyOrders]);

  return (
    <div className="p-4 border rounded-lg">
      <Text className="font-bold text-2xl">Monthly revenue</Text>
      <Spacer h={6} />
      <AreaChart
        width={870}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
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
          dataKey="Total"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        {/* <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        /> */}
      </AreaChart>
    </div>
  );
};

export default RevenueChart;
