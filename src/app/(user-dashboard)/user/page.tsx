import UserDashbaord from "@/components/dashboard/user";
import { apiFetch } from "@/lib/api/api-fech";
import { IFolder } from "@/types";

export default async function UserDashboardPage({
  searchParams,
}: {
  searchParams: { parent_folder_id?: string };
}) {
  const parentId = searchParams?.parent_folder_id;

  // ✅ Build URL dynamically
  const folderUrl = parentId
    ? `/folder?parent_folder_id=${parentId}`
    : `/folder`;

  const fileUrl = parentId
    ? `/file?parent_folder_id=${parentId}`
    : `/file`;

  const [folder, file, breadcrumb] = await Promise.all([
    apiFetch<{ data: { data: IFolder[] } | null }>(
      folderUrl,
      {
        method: "GET",
        next: { tags: ["folders"] },
      },
      "server"
    ),
    apiFetch<{ data: { data: IFolder[] } | null }>(
      fileUrl,
      {
        method: "GET",
        next: { tags: ["files"] },
      },
      "server"
    ),
    apiFetch<{ data: { data: IFolder[] } | null }>(
      `/folder/breadcrumb/${parentId ?? 0}`,
      {
        method: "GET",
        next: { tags: ["folders"] },
      },
      "server"
    ),
  ]);


  return (
    <UserDashbaord
      folders={folder?.data ?? []}
      files={file?.data ?? []}
      parentId={parentId}
      breadcrumb={breadcrumb?.data ?? []}
    />
  );
}