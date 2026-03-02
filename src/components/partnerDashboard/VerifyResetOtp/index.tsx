import VerifyOtpProfessional from "./VerifyOtp";

export default function Page({ searchParams }: { searchParams: { email?: string } }) {
  return <VerifyOtpProfessional email={searchParams.email || ""} />;
}