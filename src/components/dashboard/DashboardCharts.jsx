import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./DashboardCharts.css";

const gastosMensais = [
  { mes: "Jan", valor: 1200 },
  { mes: "Fev", valor: 800 },
  { mes: "Mar", valor: 950 },
  { mes: "Abr", valor: 1300 },
  { mes: "Mai", valor: 1100 },
  { mes: "Jun", valor: 1700 },
];

const categorias = [
  { name: "Alimentação", value: 400 },
  { name: "Transporte", value: 300 },
  { name: "Lazer", value: 300 },
  { name: "Moradia", value: 200 },
  { name: "Outros", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9b59b6"];

const DashboardCharts = () => {
  return (
    <div className="charts-container">
      <div className="chart-box" style={{ background: "transparent" }}>
        <h3>Gastos Mensais</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={gastosMensais}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="valor" stroke="#1890ff" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box" style={{ background: "transparent" }}>
        <h3>Distribuição por Categoria</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categorias}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {categorias.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
