"use client";

import { useState } from "react";
import { Search, Users, CheckCircle } from "lucide-react";
import { message, Form, Input, Button } from "antd";
import { apiFetch, getImage } from "@/lib/api/api-fech";
import { revalidateTagType } from "./exclusiveOffer/exclusiveOfferActions";
import Image from "next/image";

interface Member {
  profileImage: string;
  name: string;
  id: string;
  userId: string;
  eligible: boolean;
}

const MemberValidationTab = () => {
  const [search, setSearch] = useState("");
  const [found, setFound] = useState<Member | null>(null);
  const [searching, setSearching] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // 🔹 Search member via API
  const handleSearch = async () => {
    if (!search.trim()) {
      message.error("Please enter membership number");
      return;
    }

    setSearching(true);
    try {
      const res = await apiFetch(
        `/membership-application?page=1&limit=1&searchTerm=${search}&membershipStatus=active`,
        { method: "GET", cache: "no-store" },
        "client"
      ) as { data: any };
      console.log("res", res.data);

      if (res.data.length) {
        setFound({
          profileImage: res.data[0].profileImage,
          name: res.data[0].name,
          id: res.data[0].memberShipId,
          userId: res.data[0]._id,
          eligible: true, // can be adjusted based on API eligibility field
        });
        message.success("Member found!");
      } else {
        setFound(null);
        message.error("No active member found with this number");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to search member");
    } finally {
      setSearching(false);
    }
  };

  // 🔹 Confirm redemption via API
  const handleConfirm = async () => {
    if (!found) return;

    setConfirming(true);
    try {
      await apiFetch(
        `/redemption`,
        {
          method: "POST",
          body: JSON.stringify({ user: found.userId }),
        },
        "client"
      );

      message.success("Redemption confirmed successfully!");

      await apiFetch(
        `/attendance/overview`,
        { method: "GET", cache: "no-store" },
        "client"
      );

      setFound(null);
      setSearch("");

      // Optional: refetch stats or revalidate cache
      revalidateTagType("redemption");
    } catch (error: any) {
      message.error(error.message || "Failed to confirm redemption");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-base font-bold text-gray-900">
        Validate Member & Confirm Redemption
      </h3>

      <p className="text-sm text-gray-500 mb-5">
        Search for members using their unique membership number and confirm
        privilege redemptions
      </p>

      {/* 🔎 Search Section */}
      <Form layout="vertical" onFinish={handleSearch} className="mb-6">
        <div className="flex gap-3 items-end">
          <Form.Item label="Membership Number" className="flex-1 mb-0">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter membership number (e.g. 03016)"
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

      {/* Empty State */}
      {!found ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Users className="w-12 h-12 mb-3 opacity-40" />
          <p className="text-sm">
            Enter a membership number to search for a member
          </p>
        </div>
      ) : (
        /* Found Member */
        <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
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

            {found.eligible && (
              <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded bg-green-100 text-green-600">
                <CheckCircle className="w-3 h-3" />
                Eligible
              </span>
            )}
          </div>

          <Button
            type="primary"
            size="large"
            block
            onClick={handleConfirm}
            loading={confirming}
          >
            Confirm Redemption
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemberValidationTab;