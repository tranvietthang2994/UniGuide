"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { AdmissionScore } from "./universityDataReview";

interface TrainingChartProps {
  admissionScores: AdmissionScore[];
}

const TrainingChart: React.FC<TrainingChartProps> = ({ admissionScores }) => {
  if (!admissionScores.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Chưa có dữ liệu điểm chuẩn</p>
      </div>
    );
  }

  // Group data by year for better visualization
  const chartData = admissionScores.reduce((acc, score) => {
    const existingYear = acc.find((item) => item.year === score.year);
    if (existingYear) {
      existingYear[score.major] = score.score;
    } else {
      acc.push({
        year: score.year,
        [score.major]: score.score,
      });
    }
    return acc;
  }, [] as any[]);

  // Get unique majors for colors
  const majors = Array.from(
    new Set(admissionScores.map((score) => score.major))
  );

  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // amber
    "#EF4444", // red
    "#8B5CF6", // purple
    "#F97316", // orange
    "#06B6D4", // cyan
    "#84CC16", // lime
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">Năm {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}:{" "}
              <span className="font-medium">{entry.value} điểm</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Line Chart */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-800 mb-4">
          Xu hướng điểm chuẩn theo năm
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="year" stroke="#6B7280" fontSize={12} />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              domain={["dataMin - 1", "dataMax + 1"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {majors.map((major, index) => (
              <Line
                key={major}
                type="monotone"
                dataKey={major}
                stroke={colors[index % colors.length]}
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-800 mb-4">
          So sánh điểm chuẩn các ngành
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="year" stroke="#6B7280" fontSize={12} />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              domain={["dataMin - 1", "dataMax + 1"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {majors.map((major, index) => (
              <Bar
                key={major}
                dataKey={major}
                fill={colors[index % colors.length]}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h4 className="text-md font-medium text-gray-800">
            Bảng điểm chuẩn chi tiết
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngành học
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Năm
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm chuẩn
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admissionScores.map((score, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {score.major}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {score.year}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {score.score} điểm
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainingChart;
