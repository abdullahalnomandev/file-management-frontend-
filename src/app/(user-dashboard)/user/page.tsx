// app/partner-dashboard/page.tsx
import UserDashbaord from "@/components/dashboard/user";

export default async function userDashboardPage() {
  // const offersQuery = new URLSearchParams({ page: "1", limit: "150" });

  // const [exclusiveOffer] = await Promise.all([
  //   apiFetch<{ data: { data: Offer[] } | null }>(
  //     `/exclusive-offer/my-offers?${offersQuery.toString()}`,
  //     { method: "GET", cache: "force-cache" },
  //     "server"
  //   ),
  // ]);

  //   const offers: Offer[] = exclusiveOffer?.data?.data || [];

  return (
    <>
      <UserDashbaord />
    </>
  );
}
