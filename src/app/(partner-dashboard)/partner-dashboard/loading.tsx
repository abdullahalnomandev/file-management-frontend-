"use client";
import { Skeleton } from "antd";

export default function DashboardTabLoading() {
  return (
    <div className="space-y-6 max-w-285 mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm"
          >
            <Skeleton.Input style={{ width: 120, height: 24, marginBottom: 8 }} active />
            <Skeleton.Input style={{ width: 60, height: 32, marginBottom: 4 }} active />
            <Skeleton.Input style={{ width: 100, height: 12 }} active />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-yellow-200 p-6 shadow-sm">
        <Skeleton.Input style={{ width: 160, height: 20, marginBottom: 8 }} active />
        <Skeleton.Input style={{ width: 220, height: 14, marginBottom: 16 }} active />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100 mb-2"
          >
            <div>
              <Skeleton.Input style={{ width: 120, height: 16, marginBottom: 4 }} active />
              <Skeleton.Input style={{ width: 100, height: 12 }} active />
            </div>
            <Skeleton.Input style={{ width: 40, height: 20 }} active />
          </div>
        ))}
      </div>
    </div>
  );
}