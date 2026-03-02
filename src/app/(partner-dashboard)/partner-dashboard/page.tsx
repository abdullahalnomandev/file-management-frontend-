// app/partner-dashboard/page.tsx
import PartnerDashboard from "@/components/partnerDashboard";
import { Offer } from "@/components/partnerDashboard/ManageOffer/ManageOffersTab";
import { apiFetch } from "@/lib/api/api-fech";

export default async function PartnerDashboardHomePage() {
  const offersQuery = new URLSearchParams({ page: "1", limit: "150" });
  const categoriesQuery = new URLSearchParams({ page: "1", limit: "60" });

  const [
    exclusiveOffer,
    getCategories,
    attendanceOverview,
    redemptionOverview,
  ] = await Promise.all([
    apiFetch<{ data: { data: Offer[] } | null }>(
      `/exclusive-offer/my-offers?${offersQuery.toString()}`,
      { method: "GET", cache:"force-cache" },
      "server"
    ),

    apiFetch<{ data: any }>(
      `/category?${categoriesQuery.toString()}`,
      { method: "GET", cache:"force-cache" },
      "server"
    ),

    apiFetch<{ data: { remaining: number; checkIn: number } }>(
      `/attendance/overview`,
      { method: "GET" , cache:"force-cache"},
      "server"
    ),

    apiFetch<{ data: { total_redemption: number; redemption_this_month: number; active_offer: number } }>(
      `/redemption/overview`,
      { method: "GET", cache:"force-cache" },
      "server"
    ),
  ]);

  const offers: Offer[] = exclusiveOffer?.data?.data || [];
  const categories = getCategories?.data || [];
  const attendance = attendanceOverview?.data;
  const redemption =
    redemptionOverview?.data || {
      total_redemption: 0,
      redemption_this_month: 0,
      active_offer: 0,
    };

  return (
    <PartnerDashboard
      offers={offers}
      getCategories={categories}
      attendance={attendance}
      redemptionOverview={redemption}
    />
  );
}