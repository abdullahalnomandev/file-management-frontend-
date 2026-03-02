import VerifyOtpProfessional from "@/components/partnerDashboard/VerifyResetOtp/VerifyOtp";

export default function Page({ searchParams }: { searchParams?: any }) {
  const email = searchParams?.email || "";
  return <VerifyOtpProfessional email={email} />;
}