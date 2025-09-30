"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Totals = {
  universities: number;
  users: number;
  reviews: number;
  interests: number;
};

type TrafficPoint = { date: string; visits: number };
type RegionPoint = { region: string; visits: number };
type PathPoint = { path: string; visits: number };

export default function AdminDashboardPage() {
  const [totals, setTotals] = useState<Totals | null>(null);
  const [traffic, setTraffic] = useState<TrafficPoint[]>([]);
  const [regions, setRegions] = useState<RegionPoint[]>([]);
  const [paths, setPaths] = useState<PathPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const resp = await fetch("/api/admin/metrics");
        const data = await resp.json();
        if (resp.ok) {
          setTotals(data.totals);
          setTraffic(data.trafficDaily || []);
          setRegions(data.topRegions || []);
          setPaths(data.topPaths || []);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <Breadcrumb pageTitle="Admin Dashboard" />
      <section className="pb-20">
        <div className="container mx-auto w-full max-w-[1170px] px-4">
          {loading ? (
            <div className="text-center text-gray-600">Đang tải dữ liệu...</div>
          ) : (
            <div className="space-y-8">
              {/* Stat cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Trường đại học"
                  value={totals?.universities ?? 0}
                />
                <StatCard title="Người dùng" value={totals?.users ?? 0} />
                <StatCard title="Đánh giá" value={totals?.reviews ?? 0} />
                <StatCard title="Quan tâm" value={totals?.interests ?? 0} />
              </div>

              {/* Traffic chart - line chart */}
              <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-dark">
                <h3 className="mb-4 text-xl font-bold text-dark dark:text-white">
                  Lưu lượng 30 ngày gần đây
                </h3>
                {traffic.length === 0 ? (
                  <p className="text-gray-600">Chưa có dữ liệu.</p>
                ) : (
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={traffic}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 12, fill: "#6B7280" }}
                          tickMargin={8}
                          minTickGap={16}
                        />
                        <YAxis
                          allowDecimals={false}
                          tick={{ fontSize: 12, fill: "#6B7280" }}
                        />
                        <Tooltip
                          formatter={(v: any) => [v, "Lượt truy cập"]}
                          labelFormatter={(l) => `Ngày ${l}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="visits"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Regions and paths */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-dark">
                  <h3 className="mb-4 text-xl font-bold text-dark dark:text-white">
                    Khu vực truy cập nhiều
                  </h3>
                  {regions.length === 0 ? (
                    <p className="text-gray-600">Chưa có dữ liệu.</p>
                  ) : (
                    <ul className="space-y-2">
                      {regions.map((r) => (
                        <li
                          key={r.region}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700 dark:text-gray-300">
                            {r.region}
                          </span>
                          <span className="font-semibold text-dark dark:text-white">
                            {r.visits}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-dark">
                  <h3 className="mb-4 text-xl font-bold text-dark dark:text-white">
                    Trang được truy cập nhiều
                  </h3>
                  {paths.length === 0 ? (
                    <p className="text-gray-600">Chưa có dữ liệu.</p>
                  ) : (
                    <ul className="space-y-2">
                      {paths.map((p) => (
                        <li
                          key={p.path}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700 dark:text-gray-300">
                            {p.path}
                          </span>
                          <span className="font-semibold text-dark dark:text-white">
                            {p.visits}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-dark">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-dark dark:text-white">
        {value}
      </p>
    </div>
  );
}
