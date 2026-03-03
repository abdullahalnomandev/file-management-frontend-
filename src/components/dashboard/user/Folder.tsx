import { Card, Col, Dropdown, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import {
  FolderOutlined,
  MoreOutlined,
  EditOutlined,

} from "@ant-design/icons";

const Folder = ({ folder, handleEdit, handleDeleteFolder }: any) => {


    const router = useRouter();

    return (<Col xs={12} sm={8} md={6} lg={4} key={folder.id}>
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
                            onClick: (e: any) => {
                                handleEdit(folder, "folder")
                                e.stopPropagation();
                            },
                        },
                        {
                            key: "delete",
                            label: "Delete",
                            onClick: (e: any) => {
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
    </Col>)
}

export default Folder