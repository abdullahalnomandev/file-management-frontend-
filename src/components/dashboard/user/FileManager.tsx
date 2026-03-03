"use client";
import React, { useState, useRef } from "react";
import {
  Button,
  Input,
  Row,
  Dropdown,
  Modal,
  message,
  Empty,
  Breadcrumb,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Folder from "./Folder/Folder";
import File from "./File/Files";
import { IFile, IFolder } from "@/types";
import { apiFetch } from "@/lib/api/api-fech";
import CreateFolderModel from "./Folder/CreateFolderModel";
import { revalidateTagType } from "@/lib/revalidateTag";
import Link from "next/link";

const { confirm } = Modal;

export default function FileManager({
  folders,
  files,
  parentId,
  breadcrumb,
}: {
  folders: IFolder[];
  files: IFile[];
  parentId?: string;
  breadcrumb?: IFolder[];
}) {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [folderName, setFolderName] = useState("");
  const [isFolderCreating, setIsFolderCreating] = useState(false);

  // Ref for hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ================= CREATE FOLDER ================= */
  const handleOpenCreateFolder = () => {
    setFolderName("");
    setIsFolderModalOpen(true);
  };

  const handleCreateFolder = async () => {
    setIsFolderCreating(true);
    if (!folderName.trim()) {
      message.warning("Please enter folder name");
      setIsFolderCreating(false);
      return;
    }

    try {
      await apiFetch(
        "/folder",
        {
          method: "POST",
          body: JSON.stringify({
            name: folderName,
            parent_folder_id: parentId || null,
          }),
        },
        "client"
      );
      revalidateTagType("folders");
      message.success("Folder created successfully");
      setFolderName("");
      setIsFolderModalOpen(false);
      setIsFolderCreating(false);
    } catch (error) {
      setIsFolderCreating(false);
      message.error((error as Error)?.message || "Failed to create folder");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item: any, type: "folder" | "file") => {
    setEditingItem({ ...item, type });
    setFolderName(item.name);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingItem) return;

    if (editingItem.type === "folder") {
      try {
        await apiFetch(
          `/folder/${editingItem.id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              name: folderName,
              parent_folder_id: parentId || null,
            }),
          },
          "client"
        );
        revalidateTagType("folders");
        message.success("Folder updated successfully");
      } catch (error) {
        message.error((error as Error)?.message || "Failed to update folder");
      }
    }

    setIsEditModalOpen(false);
    setEditingItem(null);
    setFolderName("");
  };

  /* ================= DELETE ================= */
  const handleDeleteFolder = async (e: any, id: number) => {
    confirm({
      title: "Delete this folder?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await apiFetch(`/folder/${id}`, { method: "DELETE" }, "client");
          revalidateTagType("folders");
          message.success("Folder deleted successfully");
        } catch (error) {
          message.error((error as Error)?.message || "Failed to delete folder");
        }
      },
    });
  };

  const handleDeleteFile = async (e: any, id: number) => {
    confirm({
      title: "Delete this file?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await apiFetch(`/file/${id}`, { method: "DELETE" }, "client");
          revalidateTagType("files");
          message.success("File deleted successfully");
        } catch (error) {
          message.error((error as Error)?.message || "Failed to delete file");
        }
      },
    });
  };

  /* ================= FILE UPLOAD ================= */
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (parentId) {
        formData.append("folder_id", parentId);
      }

      await apiFetch(
        "/file/upload",
        { method: "POST", body: formData },
        "client"
      );
      revalidateTagType("files");
      message.success("File uploaded successfully");

      // Reset input for next upload
      e.target.value = "";
    } catch (error) {
      message.error((error as Error)?.message || "Failed to upload file");
    }
  };

  /* ================= DROPDOWN MENU ================= */
  const newMenu = {
    items: [
      {
        key: "folder",
        icon: <PlusOutlined />,
        label: "Create Folder",
        onClick: (e: any) => {
          e.domEvent.stopPropagation();
          handleOpenCreateFolder();
        },
      },
      {
        key: "upload",
        icon: <UploadOutlined />,
        label: "Upload File",
        onClick: (e: any) => {
          e.domEvent.stopPropagation();
          handleSelectFile();
        },
      },
    ],
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleUploadFile}
      />

      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Breadcrumb
          className="custom-breadcrumb"
          items={[
            {
              title: <Link href="/user" className="text-base">My Files</Link>,
            },
            ...(breadcrumb || []).map((folder) => ({
              title: (
                <Link href={`/user?parentId=${folder.id}`} className="text-base">
                  {folder.name}
                </Link>
              ),
            })),
          ]}
        />
        {(!!folders.length || !!files.length) && (
          <Dropdown menu={newMenu} trigger={["click"]}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={(e) => e.stopPropagation()}
            >
              New
            </Button>
          </Dropdown>
        )}
      </Row>

      {!folders.length && !files.length && (
        <div style={{ width: "100%", textAlign: "center", marginTop: 60 }}>
          <Empty description="No files or folders yet">
            <Dropdown menu={newMenu} trigger={["click"]}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={(e) => e.stopPropagation()}
              >
                New
              </Button>
            </Dropdown>
          </Empty>
        </div>
      )}

      {/* Grid */}
      <Row gutter={[16, 16]}>
        {folders.map((folder) => (
          <Folder
            key={folder.id}
            folder={folder}
            handleEdit={(item: any) => handleEdit(item, "folder")}
            handleDeleteFolder={(e: any) => handleDeleteFolder(e, folder.id)}
          />
        ))}

        {files.map((file) => (
          <File
            key={file.id}
            file={file}
            handleEdit={(item: any) => handleEdit(item, "file")}
            handleDeleteFile={(e: any) => handleDeleteFile(e, file.id)}
          />
        ))}
      </Row>

      {/* Create Folder Modal */}
      <CreateFolderModel
        visible={isFolderModalOpen}
        onCancel={() => setIsFolderModalOpen(false)}
        onOk={handleCreateFolder}
        loading={isFolderCreating}
        folderName={folderName}
        setFolderName={setFolderName}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit"
        open={isEditModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Input
          placeholder="Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </Modal>
    </div>
  );
}
