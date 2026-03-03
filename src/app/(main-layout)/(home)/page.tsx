import HomePage from "@/components/home";
import { apiFetch } from "@/lib/api/api-fech";
import { IPackage } from "@/types";

export default async function Home() {
  const pricing = await apiFetch("/plan-package", {
    method: "GET",
  },"server") as { data: IPackage[] };

  console.log("pricing", pricing);
  return <HomePage pricing={pricing?.data} />;
}
