"use client";
import { Card, Col, Dropdown, Tooltip, MenuProps } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FolderOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const Folder = ({ folder, handleEdit, handleDeleteFolder }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClickCard = () => {
    // query will be : parent_folder_id
    const params = new URLSearchParams(searchParams.toString());
    params.set("parent_folder_id", folder.id.toString());
    router.push(`?${params.toString()}`);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit",
      onClick: (e) => {
        e.domEvent.stopPropagation(); // ✅ works now
        handleEdit(folder, "folder");
        setDropdownOpen(false);
      },
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete",
      onClick: (e) => {
        e.domEvent.stopPropagation();
        handleDeleteFolder(folder.id);
        setDropdownOpen(false);
      },
    },
  ];

  return (
    <Col xs={12} sm={8} md={6} lg={4} key={folder.id}>
      <Card
        hoverable
        onClick={handleClickCard}
        style={{
          textAlign: "center",
          position: "relative",
          boxShadow: "#ddd 0 0 10px",
        }}
      >
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          open={dropdownOpen}
          onOpenChange={(open) => setDropdownOpen(open)}
        >
          {/* Stop click from bubbling here too */}
          <span onClick={(e) => e.stopPropagation()}>
            <MoreOutlined
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 18,
                cursor: "pointer",
              }}
            />
          </span>
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
  );
};

export default Folder;
