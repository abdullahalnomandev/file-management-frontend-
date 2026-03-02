"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Input,
  Row,
  Col,
  Dropdown,
  Upload,
  Modal,
  message,
  Image,
  Tooltip,
} from "antd";
import {
  FolderOutlined,
  FileOutlined,
  PlusOutlined,
  UploadOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

export default function FileManager() {
  const router = useRouter();

  const [folders, setFolders] = useState<any[]>([
    {
      id: 1,
      name: "Projects",
      user_id: 8,
      parent_folder_id: null,
      nesting_level: 0,
      total_files: 0,
    },
  ]);

  const [files, setFiles] = useState<any[]>([
    {
      id: 1,
      folder_id: null,
      name: "sample-image.jpeg",
      user_id: 8,
      path_name:
        "https://noman1.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAbdullah_Al_Noman.c5d6012f.jpg&w=384&q=75",
      file_type: "image/jpeg",
      size: 193974,
    },
  ]);

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

    setFolders((prev) => [...prev, newFolder]);
    setFolderName("");
    setIsFolderModalOpen(false);
    message.success("Folder created successfully");
  };

  /* ================= DELETE ================= */
  const handleDeleteFolder = (id: number) => {
    confirm({
      title: "Delete this folder?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setFolders((prev) => prev.filter((f) => f.id !== id));
      },
    });
  };

  const handleDeleteFile = (id: number) => {
    confirm({
      title: "Delete this file?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setFiles((prev) => prev.filter((f) => f.id !== id));
      },
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

    if (editingItem.type === "folder") {
      setFolders((prev) =>
        prev.map((f) =>
          f.id === editingItem.id ? { ...f, name: folderName } : f
        )
      );
    } else {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === editingItem.id ? { ...f, name: folderName } : f
        )
      );
    }

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

      setFiles((prev) => [...prev, newFile]);
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
        {folders.map((folder) => (
          <Col xs={12} sm={8} md={6} lg={4} key={folder.id}>
            <Card
              hoverable
              onClick={() => router.push(`/folder/${folder.id}`)}
              style={{ textAlign: "center", position: "relative" }}
            >
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "edit",
                      icon: <EditOutlined />,
                      label: "Edit",
                      onClick: (e:any) => {
                        handleEdit(folder, "folder")
                        e.stopPropagation();
                      },
                    },
                    {
                      key: "delete",
                      label: "Delete",
                      onClick: (e:any) => {
                        handleDeleteFolder(folder.id)
                        e.stopPropagation();
                      },
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <MoreOutlined
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    fontSize: 18,
                  }}
                />
              </Dropdown>

              <FolderOutlined style={{ fontSize: 40, marginBottom: 10 }} />
              <div
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Tooltip title={folder.name}>{folder.name}</Tooltip>
              </div>
            </Card>
          </Col>
        ))}

        {/* Files */}
        {files.map((file) => (
          <Col xs={12} sm={8} md={6} lg={4} key={file.id}>
            <Card
              hoverable
              style={{
                borderRadius: 10,
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              bodyStyle={{ padding: 12 }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "80%",
                  }}
                >
                  <Tooltip title={file.name}>{file.name}</Tooltip>
                </div>

                <Dropdown
                  trigger={["click"]}
                  menu={{
                    items: [
                      {
                        key: "edit",
                        icon: <EditOutlined />,
                        label: "Edit",
                        onClick: (e:any) => {
                          handleEdit(file, "file")
                          e.stopPropagation();
                        },
                      },
                      {
                        key: "delete",
                        danger: true,
                        icon: <DeleteOutlined />,
                        label: "Delete",
                        onClick: (e:any) => {
                          handleDeleteFile(file.id)
                          e.stopPropagation();
                        },
                      },
                    ],
                  }}
                >
                  <MoreOutlined
                    style={{
                      fontSize: 18,
                      cursor: "pointer",
                      color: "#555",
                    }}
                  />
                </Dropdown>
              </div>

              {/* File Preview / Icon */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 90,
                  marginBottom: 10,
                  background: "#fafafa",
                  borderRadius: 8,
                }}
              >
                {file.file_type.startsWith("image") ? (
                  <Image
                    src={file.path_name}
                    width={140}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: 6 }}
                    preview
                  />
                ) : file.file_type.includes("pdf") ? (
                  <FilePdfOutlined style={{ fontSize: 42, color: "#ff4d4f" }} />
                ) : file.file_type.includes("word") ? (
                  <FileWordOutlined
                    style={{ fontSize: 42, color: "#1677ff" }}
                  />
                ) : file.file_type.includes("excel") ? (
                  <FileExcelOutlined
                    style={{ fontSize: 42, color: "#52c41a" }}
                  />
                ) : (
                  <FileOutlined style={{ fontSize: 40, color: "#888" }} />
                )}
              </div>

              {/* File Size */}
              <div
                style={{
                  fontSize: 12,
                  color: "#888",
                  textAlign: "center",
                }}
              >
                {(file.size / 1024).toFixed(1)} KB
              </div>
            </Card>
          </Col>
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
