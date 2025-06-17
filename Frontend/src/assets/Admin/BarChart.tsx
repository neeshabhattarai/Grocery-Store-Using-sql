import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import useOrderList from "./OrderList";

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
`;

export default function MonthlyOrderBarChart() {
  const [monthlyData, setMonthlyData] = useState([]);
  const { data } = useOrderList();
  console.log(data);

  useEffect(() => {
    const counts = {};
    if (data) {
      data.message.forEach((order) => {
        const month = format(new Date(order.createdAt), "MMM");
        counts[month] = (counts[month] || 0) + 1;
      });

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const formatted = months.map((month) => ({
        month,
        orders: counts[month] || 0,
      }));

      setMonthlyData(formatted);
    }
  }, [data]);
  if (!data) {
    return <h2>loading...</h2>;
  }

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="orders" fill="#4CAF50" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
