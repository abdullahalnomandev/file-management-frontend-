"use client";

import { useState } from "react";
import { Search, CalendarCheck } from "lucide-react";
import { message, Form, Input, Button } from "antd";
import { apiFetch, getImage } from "@/lib/api/api-fech";
import { revalidateTagType } from "./exclusiveOffer/exclusiveOfferActions";
import Image from "next/image";

interface Member {
  profileImage: string;
  name: string;
  id: string;
  userId: string;
}

interface Attendance {
  checkIn: number;
  remaining: number;
}

const DailyAttendanceTab = ({ attendance }: { attendance: Attendance }) => {
  const [search, setSearch] = useState("");
  const [found, setFound] = useState<Member | null>(null);
  const [searching, setSearching] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [attendanceStats, setAttendanceStats] = useState(attendance);

  // 🔹 Search member by membership number
  const handleSearch = async () => {
    if (!search.trim()) {
      message.error("Please enter membership number");
      return;
    }

    setSearching(true);
    try {
      const user = await apiFetch(
        `/membership-application?page=1&limit=1&searchTerm=${search}&membershipStatus=active`,
        { method: "GET", cache: "no-store" },
        "client"
      ) as { data: any };

      if (user.data.length) {
        setFound({
          profileImage: user.data[0]?.profileImage,
          name: user.data[0]?.name,
          id: user.data[0]?.memberShipId,
          userId: user.data[0]?._id
        });
      } else {
        message.error("No active member found with this number");
        setFound(null);
      }
    } catch (error: any) {
      message.error(error.message || "Failed to search member");
    } finally {
      setSearching(false);
    }
  };

  // 🔹 Confirm attendance
  const handleConfirm = async () => {
    if (!found) return;

    setConfirming(true);
    try {
      await apiFetch(
        `/attendance`,
        {
          method: "POST",
          body: JSON.stringify({ user: found.userId }),
        },
        "client"
      );

      message.success("Attendance confirmed!");

      // 🔹 Immediately refetch attendance overview (client-side)
      const updated = await apiFetch(
        `/attendance/overview`,
        { method: "GET", cache: "no-store" },
        "client"
      );

      setAttendanceStats((updated as any).data);
      revalidateTagType("attendance");
      setFound(null);
      setSearch("");
    } catch (error: any) {
      message.error(error.message || "Failed to confirm attendance");
    } finally {
      setConfirming(false);
    }
  };

  const stats = [
    {
      label: "Today's Check-ins",
      value: attendanceStats?.checkIn || 0,
      sub: "Resets automatically at midnight",
      color: "text-yellow-400",
    },
    {
      label: "Daily Limit",
      value: "50",
      sub: "As per partnership agreement",
      color: "text-blue-400",
    },
    {
      label: "Remaining",
      value: attendanceStats?.remaining || 0,
      sub: "Available slots today",
      color: "text-green-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-5 hover:scale-105 transition-transform">
            <p className="text-sm text-gray-600">{s.label}</p>
            <p className={`text-3xl font-bold mt-3 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Attendance System */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-base font-bold text-gray-900">
          Attendance Validation System
        </h3>
        <p className="text-sm text-gray-600 mb-5">
          Search members, confirm attendance, and track daily usage in real-time
        </p>

        <Form layout="vertical" onFinish={handleSearch} className="mb-6">
          <div className="flex gap-3 items-end">
            <Form.Item label="Membership Number" className="flex-1 mb-0">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter membership number e.g. 00016"
                size="large"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                icon={<Search size={16} />}
                loading={searching}
              >
                Search
              </Button>
            </Form.Item>
          </div>
        </Form>

        {!found ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <CalendarCheck className="w-12 h-12 mb-3 opacity-60" />
            <p className="text-sm">Enter a membership number to validate attendance</p>
          </div>
        ) : (
          <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              {/* <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <CalendarCheck className="w-6 h-6 text-yellow-600" />
              </div> */}
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={getImage(found?.profileImage)}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{found.name}</p>
                <p className="text-xs text-gray-500">{found.id}</p>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              block
              onClick={handleConfirm}
              loading={confirming}
            >
              Confirm Attendance
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyAttendanceTab;