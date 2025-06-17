import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useCategory from "./CategorywithProducts";
import { PieChart, Pie, Cell } from "recharts";

// Styled Components
const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

const CategoryName = styled.span`
  font-size: 16px;
`;

export default function CategoryPieChartMaker() {
  const { category } = useCategory();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (category) {
      const colors = [
        "#4CAF50",
        "#F44336",
        "#2196F3",
        "#333",
        "#FF5722",
        "#FF9800",
        "#9C27B0",
        "#00BCD4",
        "#CDDC39",
        "#3F51B5",
        "#795548",
      ];
      const chartData = category.map((cat, index) => ({
        name: cat.name,
        value: cat.products.length,
        color: colors[index % colors.length],
      }));
      setData(chartData);
    }
  }, [category]);

  return (
    <ChartContainer>
      <LegendContainer>
        {data.map((entry, index) => (
          <LegendItem key={index}>
            <ColorBox color={entry.color} />
            <CategoryName>{entry.name}</CategoryName>
          </LegendItem>
        ))}
      </LegendContainer>
      {data.length > 0 && (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      )}
    </ChartContainer>
  );
}
