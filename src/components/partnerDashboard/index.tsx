"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { LayoutDashboard, Gift, Users, CalendarCheck } from "lucide-react";
import { Offer } from "./ManageOffer/ManageOffersTab";

type Tab = "dashboard" | "offers" | "validation" | "attendance";

const tabs = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "offers", label: "Manage Offers", icon: Gift },
  { key: "validation", label: "Member Validation", icon: Users },
  { key: "attendance", label: "Daily Attendance", icon: CalendarCheck },
];

// Dynamic imports
const DashboardTab = dynamic(() => import("./DashboardTab"), { ssr: false });
const ManageOffersTab = dynamic(() => import("./ManageOffer/ManageOffersTab"), { ssr: false });
const MemberValidationTab = dynamic(() => import("./MemberValidationTab"), { ssr: false });
const DailyAttendanceTab = dynamic(() => import("./DailyAttendanceTab"), { ssr: false });

export default function PartnerDashboard({ offers, getCategories, attendance,redemptionOverview }: { offers?: Offer[], getCategories?: any, attendance?: any ,redemptionOverview?: any}) {
  const router = useRouter();

  // ✅ Single source of truth for tab
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Initialize from URL query param once
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryTab = searchParams.get("tab") as Tab | null;
    if (queryTab && tabs.some((t) => t.key === queryTab)) {
      setActiveTab(queryTab);
    }
  }, []);

  // Sliding pill
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const index = tabs.findIndex((t) => t.key === activeTab);
    const activeBtn = buttonRefs.current[index];
    if (activeBtn) {
      setPillStyle({ width: activeBtn.offsetWidth, left: activeBtn.offsetLeft });
    }
  }, [activeTab]);

  // ✅ Handle tab click
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);

    // Update URL query without waiting for re-render
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
  };

  // Render active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab offers={offers as Offer[]} redemptionOverview={redemptionOverview} />;
      case "offers":
        return <ManageOffersTab offers={offers as Offer[]} getCategories={getCategories} />;
      case "validation":
        return <MemberValidationTab />;
      case "attendance":
        return <DailyAttendanceTab attendance={attendance} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-285 mx-auto px-4 py-6">
      {/* Tabs */}
      <div
        ref={containerRef}
        className="relative mb-8 bg-white rounded-lg border border-gray-200 p-1 inline-flex shadow-sm"
      >
        <div
          className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out"
          style={{
            width: pillStyle.width,
            left: pillStyle.left,
            background: "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)",
          }}
        />
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            onClick={() => handleTabClick(tab.key as Tab)}
            className={`relative z-10 cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeTab === tab.key ? "text-black" : "text-gray-500 hover:text-gray-900"
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="min-h-75">{renderTabContent()}</div>
    </div>
  );
}