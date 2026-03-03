import { Card, Col, Dropdown, Image, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import {
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    FileExcelOutlined,
    FileOutlined,

} from "@ant-design/icons";
import { getImage } from "@/lib/api/api-fech";

const File = ({ file, handleEdit, handleDeleteFile }: any) => {


    const router = useRouter();

    return (<Col xs={12} sm={8} md={6} lg={4} key={file.id}>
        <Card
            hoverable
            style={{
                borderRadius: 10,
                overflow: "hidden",
                transition: "all 0.3s ease",
            }}
            styles={{
                body: {
                    padding: 12,
                }
            }}
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
                                onClick: (e: any) => {
                                    handleEdit(file, "file")
                                    e.stopPropagation();
                                },
                            },
                            {
                                key: "delete",
                                danger: true,
                                icon: <DeleteOutlined />,
                                label: "Delete",
                                onClick: (e: any) => {
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
                        src={getImage(file.path_name)}
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
    </Col>)
}

export default File;