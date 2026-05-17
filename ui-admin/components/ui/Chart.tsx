"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { ReactNode } from "react";

interface AreaChartCardProps<T extends object> {
  data: T[];
  xKey: Extract<keyof T, string>;
  yKey: Extract<keyof T, string>;
  color?: string;
  height?: number;
  valuePrefix?: string;
}

export function AreaChartCard<T extends object>({ data, xKey, yKey, color = "#4F46E5", height = 280, valuePrefix = "" }: AreaChartCardProps<T>) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${yKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#eee9de" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#6b6760" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#6b6760" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${valuePrefix}${typeof v === "number" ? v.toLocaleString() : v}`} />
        <Tooltip
          contentStyle={{ background: "#1B1B1B", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }}
          labelStyle={{ color: "#4F46E5", fontWeight: 600 }}
          formatter={(v: number) => [`${valuePrefix}${v.toLocaleString()}`, ""]}
        />
        <Area type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} fill={`url(#grad-${yKey})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface BarChartCardProps<T extends object> {
  data: T[];
  xKey: Extract<keyof T, string>;
  yKey: Extract<keyof T, string>;
  color?: string;
  height?: number;
}

export function BarChartCard<T extends object>({ data, xKey, yKey, color = "#1B1B1B", height = 240 }: BarChartCardProps<T>) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#eee9de" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#6b6760" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#6b6760" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "#1B1B1B", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} />
        <Bar dataKey={yKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface LineChartCardProps<T extends object> {
  data: T[];
  xKey: Extract<keyof T, string>;
  yKey: Extract<keyof T, string>;
  color?: string;
  height?: number;
}

export function LineChartCard<T extends object>({ data, xKey, yKey, color = "#2BC4A8", height = 240 }: LineChartCardProps<T>) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#eee9de" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#6b6760" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#6b6760" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "#1B1B1B", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} />
        <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2.5} dot={{ r: 3, fill: color }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface DonutChartProps {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  height?: number;
}

const defaultColors = ["#4F46E5", "#2BC4A8", "#8B7CF6", "#FF7A59", "#6FA8FF", "#1B1B1B"];

export function DonutChart({ data, colors = defaultColors, height = 240 }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={56} outerRadius={88} paddingAngle={2} dataKey="value" stroke="none">
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: "#1B1B1B", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ChartCard({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="bg-white border border-[#e8e5df] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
