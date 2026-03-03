import UserDashbaord from "@/components/dashboard/user";
import { apiFetch } from "@/lib/api/api-fech";
import { IFolder } from "@/types";

export default async function UserDashboardPage() {
  const [folder, file] = await Promise.all([
    apiFetch<{ data: { data: IFolder[] } | null }>(
      `/folder`,
      {
        method: "GET",
        next: { tags: ["folders"] }, // ✅ validated cache key
      },
      "server"
    ),

    apiFetch<{ data: { data: IFolder[] } | null }>(
      `/file`,
      {
        method: "GET",
        next: { tags: ["file"] }, // ✅ validated cache key
      },
      "server"
    ),
  ]) as [{ data: { data: IFolder[] } | null }, { data: { data: IFolder[] } | null }];

   console.log("file", file);
  return (
    <UserDashbaord
      folders={folder?.data ?? []}
      files={file?.data ?? []}
    />
  );
}