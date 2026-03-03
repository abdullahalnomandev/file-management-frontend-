"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Row,
  Dropdown,
  Upload,
  Modal,
  message
} from "antd";
import {

  PlusOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Folder from "./Folder";
import File from "./Files";
import { IFile, IFolder } from "@/types";

const { confirm } = Modal;

export default function FileManager( { folders, files } :{ folders: IFolder[], files: IFile[]}) {
  const router = useRouter();

  // const [folders, setFolders] = useState<any[]>([
  //   {
  //     id: 1,
  //     name: "Projects",
  //     user_id: 8,
  //     parent_folder_id: null,
  //     nesting_level: 0,
  //     total_files: 0,
  //   },
  // ]);

  // const [files, setFiles] = useState<any[]>([
  //   {
  //     id: 1,
  //     folder_id: null,
  //     name: "sample-image.jpeg",
  //     user_id: 8,
  //     path_name:
  //       "https://noman1.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAbdullah_Al_Noman.c5d6012f.jpg&w=384&q=75",
  //     file_type: "image/jpeg",
  //     size: 193974,
  //   },
  // ]);

  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [folderName, setFolderName] = useState("");

  /* ================= CREATE FOLDER ================= */
  const handleCreateFolder = () => {
    if (!folderName.trim()) {
      message.warning("Please enter folder name");
      return;
    }

    const newFolder = {
      id: Date.now(),
      name: folderName,
      user_id: 8,
      parent_folder_id: null,
      nesting_level: 0,
      total_files: 0,
    };

    // setFolders((prev) => [...prev, newFolder]);
    setFolderName("");
    setIsFolderModalOpen(false);
    message.success("Folder created successfully");
  };

  /* ================= DELETE ================= */
  const handleDeleteFolder = (id: number) => {
    confirm({
      title: "Delete this folder?",
      icon: <ExclamationCircleOutlined />,
      // onOk() {
      //   setFolders((prev) => prev.filter((f) => f.id !== id));
      // },
    });
  };

  const handleDeleteFile = (id: number) => {
    confirm({
      title: "Delete this file?",
      icon: <ExclamationCircleOutlined />,
      // onOk() {
      //   setFiles((prev) => prev.filter((f) => f.id !== id));
      // },
    });
  };

  /* ================= EDIT ================= */
  const handleEdit = (item: any, type: "folder" | "file") => {
    setEditingItem({ ...item, type });
    setFolderName(item.name);
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editingItem) return;

    // if (editingItem.type === "folder") {
    //   setFolders((prev) =>
    //     prev.map((f) =>
    //       f.id === editingItem.id ? { ...f, name: folderName } : f
    //     )
    //   );
    // } else {
    //   setFiles((prev) =>
    //     prev.map((f) =>
    //       f.id === editingItem.id ? { ...f, name: folderName } : f
    //     )
    //   );
    // }

    setIsEditModalOpen(false);
    setFolderName("");
    message.success("Updated successfully");
  };

  /* ================= UPLOAD ================= */
  const uploadProps = {
    showUploadList: false,
    beforeUpload: (file: any) => {
      const newFile = {
        id: Date.now(),
        folder_id: null,
        name: file.name,
        user_id: 8,
        path_name: URL.createObjectURL(file),
        file_type: file.type,
        size: file.size,
      };

      // setFiles((prev) => [...prev, newFile]);
      message.success("File uploaded");
      return false;
    },
  };

  /* ================= DROPDOWN NEW ================= */
  const newMenu = {
    items: [
      {
        key: "folder",
        icon: <PlusOutlined />,
        label: "Create Folder",
        onClick: () => setIsFolderModalOpen(true),
      },
      {
        key: "upload",
        icon: <UploadOutlined />,
        label: (
          <Upload {...uploadProps}>
            <span>Upload File</span>
          </Upload>
        ),
      },
    ],
  };

  return (
    <div>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>File Manager</h2>
        <Dropdown menu={newMenu} trigger={["click"]}>
          <Button type="primary" icon={<PlusOutlined />}>
            New
          </Button>
        </Dropdown>
      </Row>

      {/* Grid */}
      <Row gutter={[16, 16]}>
        {/* Folders */}
        {(folders ?? []).map((folder) => (
          <Folder folder={folder} handleEdit={handleEdit} handleDeleteFolder={handleDeleteFolder} />
        ))}

        {/* Files */}
        {(  files ?? []).map((file) => (
          <File file={file} handleEdit={handleEdit} handleDeleteFile={handleDeleteFile} />
        ))}
      </Row>

      {/* Create Folder Modal */}
      <Modal
        title="Create Folder"
        open={isFolderModalOpen}
        onOk={handleCreateFolder}
        onCancel={() => setIsFolderModalOpen(false)}
      >
        <Input
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </Modal>

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
